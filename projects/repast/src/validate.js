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
  } else if (typeClass === "UNION") {
      console.log(type);
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
    return { typeClass: "UNION", type: map(typeWithContext)(parseUnionType(type)) };
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
        (returned, param) => returned(typeToValue(typeWithContext(param))),
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
