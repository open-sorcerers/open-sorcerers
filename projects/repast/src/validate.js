import {
  always,
  append,
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
} from "ramda";
import { print } from "recast";
import F from "fluture";
import vm from "vm";

import { PRIMITIVE_TYPES } from "./constants";
import {
  isUnionType,
  parseUnionType,
  isCompositeType,
  parseCompositeType,
} from "./types";

const parseSignature = pipe(
  reduce(
    (parsed, symbol) => (symbol === "->" ? parsed : append(symbol, parsed)),
    []
  ),
  (s) => ({ params: dropLast(1, s), returnType: last(s) })
);

const compositeTypeToValue = (type) =>
  pipe(
    keys,
    reduce(
      (r, k) =>
        assoc(k, typeToValue({ type: type[k], typeClass: "COMPOSITE" }), r),
      {}
    )
  )(type);

const typeToValue = ({ type, typeClass }) => {
  if (type === "String") {
    return "stringValue";
  } else if (type === "Object") {
    return undefined;
  } else if (typeClass === "UNION") {
    return pipe(map(typeToValue), reject(isNil), nth(0))(type);
  } else if (typeClass === "COMPOSITE") {
    return compositeTypeToValue(type);
  }

  return undefined;
};

const matchCompositeType = curry(({ type, typeClass }, value) =>
  pipe(
    keys,
    reduce(
      (r, k) => typeMatch({ type: type[k], typeClass }, value[k]) && r,
      true
    )
  )(type)
);

export const typeMatch = curry(({ type, typeClass }, value) => {
  if (type === PRIMITIVE_TYPES.Boolean) {
    return typeof value === "boolean";
  } else if (type === PRIMITIVE_TYPES.String) {
    return typeof value === "string";
  } else if (typeClass === "UNION") {
    return any(typeMatch(__, value), type);
  } else if (typeClass === "COMPOSITE") {
    return matchCompositeType({ type, typeClass }, value);
  }
  return false;
});

const typeWithContext = (type) => {
  if (type === PRIMITIVE_TYPES.Boolean || type === PRIMITIVE_TYPES.String) {
    return { typeClass: "PRIMITIVE", type };
  } else if (isUnionType(type)) {
    return {
      typeClass: "UNION",
      type: map(typeWithContext)(parseUnionType(type)),
    };
  } else if (isCompositeType(type)) {
    return { typeClass: "COMPOSITE", type: parseCompositeType(type) };
  }

  return { typeClass: "NOT_SUPPORTED", type };
};

// addPropLayer adds a prop with name propName at every level of the current object
// @repast addPropLayer :: Object -> String -> Object
const addPropLayer = curry((object, propName) => {
  const keysFromObj = keys(object);
  const newObj = assoc(propName, undefined, object);
  if (length(keysFromObj) > 0) {
    return reduce(
      (obj, k) => ({ ...obj, [k]: addPropLayer(obj[k], propName) }),
      newObj
    )(keysFromObj);
  }

  return newObj;
});

const populateObject = curry((object, value) => {
  const keysFromObj = keys(object);
  console.log(keysFromObj);
  return reduce((obj, k) => {
    console.log(obj[k]);
    if (obj[k] === undefined) {
      return { ...obj, [k]: value };
    } else {
      // If it's not undefined it must be another object
      return { ...obj, [k]: populateObject(obj[k], value) };
    }
  }, object)(keysFromObj);
});

const hasObjectParam = any((p) => p.type === "Object");

const generateParamValues = (params) =>
  map((type) =>
    pipe(typeWithContext, typeToValue, (value) => ({ type, value }))(type)
  )(params);

const computeOutput = curry((params, fn) =>
  reduce((returned, param) => returned(param.value), fn)(params)
);

const generateObjectParamStructure = curry((params, fn) => {
  const recurse = (currentParams) => {
    try {
      reduce((returned, param) => returned(param.value), fn)(currentParams);
      return currentParams;
    } catch (e) {
      const missingProp = e.message.replace(
        /Cannot\ read\ property\ '(\w+)'\ of\ undefined/,
        "$1"
      );

      const nextParams = map((p) =>
        p.type === "Object"
          ? { ...p, value: addPropLayer(p.value, missingProp) }
          : p
      )(currentParams);

      return recurse(nextParams);
    }
  };

  return recurse(params);
});

export const validate = (params) =>
  pipe(
    map((param) => {
      const code = print(param.ast).code;
      const signature = parseSignature(param.signature);

      const withCall = `
        ${code}
        ${param.name}
      `;

      const script = new vm.Script(withCall);
      const fn = curry(script.runInThisContext());

      const paramsWithValues = generateObjectParamStructure(
        generateParamValues(signature.params),
        fn
      );

      const maxTries = hasObjectParam(paramsWithValues) ? 30 : 1;
      let currentTries = 0;
      let match = false;

      while (currentTries < maxTries && !match) {
        const paramsWithPopulatedObjectParams = map((p) => {
          if (p.type === "Object") {
            return { ...p, value: populateObject(p.value, "stringValue") };
          }
          return p;
        })(paramsWithValues);
        const output = computeOutput(paramsWithPopulatedObjectParams, fn);

        const returnType = typeWithContext(signature.returnType);
        match = typeMatch(returnType, output);
        currentTries = currentTries + 1;
      }

      if (match) {
        return { error: false };
      } else {
        return { error: true, context: { functionName: param.name } };
      }
    }),
    reject(propEq("error", false)),
    ifElse(length, F.reject, always(F.resolve(true)))
  )(params);
