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

const matchCompositeType = curry((type, value) =>
  pipe(
    keys,
    reduce((r, k) => typeMatch(type[k], value[k]) && r, true)
  )(type)
);

export const typeMatch = curry((type, value) => {
  if (type === PRIMITIVE_TYPES.Boolean) {
    return typeof value === "boolean";
  } else if (type === PRIMITIVE_TYPES.String) {
    return typeof value === "string";
  } else if (isUnionType(type)) {
    const types = parseUnionType(type);
    return any(typeMatch(__, value), types);
  } else if (isCompositeType(type)) {
    return matchCompositeType(parseCompositeType(type), value);
  }
  return false;
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

      const output = reduce(
        (returned, param) => returned(typeToValue(param)),
        fn
      )(signature.params);

      if (typeMatch(signature.returnType, output)) {
        return { error: false };
      } else {
        return { error: true, context: {} };
      }
    }),
    reject(propEq("error", false)),
    ifElse(length, F.reject, always(F.resolve(true)))
  )(params);
