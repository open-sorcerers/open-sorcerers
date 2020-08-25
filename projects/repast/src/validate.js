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
  anyPass,
  __,
  any,
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

const typeToValue = (type) => {
  if (type === "String") {
    return "stringValue";
  } else if (isUnionType(type)) {
    const types = parseUnionType(type);
    return pipe(map(typeToValue), reject(isNil), nth(0))(types);
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

// Type should be parsed before that function so that it always expect the same thing
// in case of recursion.
export const typeMatch = curry(({ type, typeClass }, value) => {
  if (type === PRIMITIVE_TYPES.Boolean) {
    return typeof value === "boolean";
  } else if (type === PRIMITIVE_TYPES.String) {
    return typeof value === "string";
  } else if (typeClass === "UNION") {
    const types = map(typeWithContext)(type);
    return any(typeMatch(__, value), types);
  } else if (typeClass === "COMPOSITE") {
    return matchCompositeType({ type, typeClass }, value);
  }
  return false;
});

const typeWithContext = (type) => {
  if (type === PRIMITIVE_TYPES.Boolean || type === PRIMITIVE_TYPES.String) {
    return { typeClass: "PRIMITIVE", type };
  } else if (isUnionType(type)) {
    return { typeClass: "UNION", type: parseUnionType(type) };
  } else if (isCompositeType(type)) {
    return { typeClass: "COMPOSITE", type: parseCompositeType(type) };
  }

  return { typeClass: "NOT_SUPPORTED", type };
};

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

      const output = reduce(
        (returned, param) => returned(typeToValue(param)),
        fn
      )(signature.params);

      const returnType = typeWithContext(signature.returnType);

      if (typeMatch(returnType, output)) {
        return { error: false };
      } else {
        return { error: true, context: { functionName: param.name } };
      }
    }),
    reject(propEq("error", false)),
    ifElse(length, F.reject, always(F.resolve(true)))
  )(params);
