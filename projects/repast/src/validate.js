import {
  always,
  curry,
  dropLast,
  ifElse,
  keys,
  last,
  length,
  map,
  nth,
  pipe,
  propEq,
  reduce,
  reject,
  isNil,
  __,
  any,
  assoc,
  equals,
  prop,
  concat,
  inc,
} from "ramda";
import { print } from "recast";
import F from "fluture";
import vm from "vm";

import { PRIMITIVE_TYPES, TYPE_CATEGORIES } from "./constants";
import { isUnionType, parseUnionType, isCompositeType, parseCompositeType } from "./types";

const augmentType = type => {
  if (type === PRIMITIVE_TYPES.Boolean || type === PRIMITIVE_TYPES.String) {
    return { cat: TYPE_CATEGORIES.Primitive, type };
  } else if (isUnionType(type)) {
    return {
      cat: TYPE_CATEGORIES.Union,
      type: map(augmentType)(parseUnionType(type)),
    };
  } else if (isCompositeType(type)) {
    return { cat: TYPE_CATEGORIES.Composite, type: parseCompositeType(type) };
  }

  return { cat: TYPE_CATEGORIES.Unknown, type };
};

const parseSignature = pipe(reject(equals("->")), map(augmentType), s => ({
  params: dropLast(1, s),
  returnType: last(s),
}));

const compositeTypeToValue = type =>
  pipe(
    keys,
    reduce(
      (r, k) => assoc(k, typeToValue({ type: type[k], cat: TYPE_CATEGORIES.Composite }), r),
      {}
    )
  )(type);

const typeToValue = ({ type, cat }) => {
  if (type === PRIMITIVE_TYPES.String) {
    return "stringValue";
  } else if (type === PRIMITIVE_TYPES.Object) {
    return undefined;
  } else if (cat === TYPE_CATEGORIES.Union) {
    return pipe(map(typeToValue), reject(isNil), nth(0))(type);
  } else if (cat === TYPE_CATEGORIES.Composite) {
    return compositeTypeToValue(type);
  }

  return undefined;
};

const matchCompositeType = curry(({ type, cat }, value) =>
  pipe(
    keys,
    reduce((r, k) => typeMatch({ type: type[k], cat }, value[k]) && r, true)
  )(type)
);

export const typeMatch = curry(({ type, cat }, value) => {
  if (type === PRIMITIVE_TYPES.Boolean) {
    return typeof value === "boolean";
  } else if (type === PRIMITIVE_TYPES.String) {
    return typeof value === "string";
  } else if (cat === TYPE_CATEGORIES.Union) {
    return any(typeMatch(__, value), type);
  } else if (cat === TYPE_CATEGORIES.Composite) {
    return matchCompositeType({ type, cat }, value);
  }
  return false;
});

// addPropLayer adds a prop with name propName at every level of the current object
// @repast addPropLayer :: Object -> String -> Object
const addPropLayer = curry((object, propName) =>
  pipe(
    keys,
    ifElse(
      length,
      reduce(
        (o, k) => ({ ...o, [k]: addPropLayer(o[k], propName) }),
        assoc(propName, undefined, object)
      ),
      always(assoc(propName, undefined, object))
    )
  )(object)
);

const populateObject = curry((object, value) =>
  pipe(
    keys,
    reduce(
      (obj, k) =>
        obj[k] === undefined
          ? { ...obj, [k]: value }
          : { ...obj, [k]: populateObject(obj[k], value) },
      object
    )
  )(object)
);

const hasObjectParam = any(p => p.type === PRIMITIVE_TYPES.Object);

// @repast generateParamValues :: [AugmentedParam] -> [AugmentedParamWithValue]
const generateParamValues = map(d => ({ ...d, value: typeToValue(d) }));

const runFnWith = curry((fn, params) => reduce((r, p) => r(p.value), fn)(params));

// @repast generateObjectParamStructure :: [AugmentedParamWithValue] -> [AugmentedParamWithValue]
const guessObjectStructures = curry((params, fn) => {
  const recurse = currentParams => {
    try {
      runFnWith(fn, currentParams);
      return currentParams;
    } catch (e) {
      const missingProp = e.message.replace(/Cannot\ read\ property\ '(\w+)'\ of\ undefined/, "$1");

      const nextParams = map(p =>
        p.type === PRIMITIVE_TYPES.Object ? { ...p, value: addPropLayer(p.value, missingProp) } : p
      )(currentParams);

      return recurse(nextParams);
    }
  };

  return recurse(params);
});

// @repast makeFunctionFromAST :: String -> AST -> Function
const makeFunctionFromAST = curry((fnName, ast) =>
  pipe(
    print,
    prop("code"),
    concat(__, `; ${fnName}`),
    c => new vm.Script(c),
    s => s.runInThisContext(),
    curry
  )(ast)
);

export const validate = params =>
  pipe(
    map(param => {
      const signature = parseSignature(param.signature);
      const fn = makeFunctionFromAST(param.name, param.ast);

      const paramsWithValues = guessObjectStructures(generateParamValues(signature.params), fn);

      const maxTries = hasObjectParam(paramsWithValues) ? 30 : 1;
      let currentTries = 0;
      let match = false;

      while (currentTries < maxTries && !match) {
        const paramsWithPopulatedObjectParams = map(p =>
          p.type === "Object" ? { ...p, value: populateObject(p.value, "stringValue") } : p
        )(paramsWithValues);

        match = pipe(
          runFnWith(fn),
          typeMatch(signature.returnType)
        )(paramsWithPopulatedObjectParams);

        currentTries = inc(currentTries);
      }

      return match ? { error: false } : { error: true, context: { functionName: param.name } };
    }),
    reject(propEq("error", false)),
    ifElse(length, F.reject, always(F.resolve(true)))
  )(params);
