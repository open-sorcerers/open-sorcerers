import {
  always,
  append,
  curry,
  dropLast,
  ifElse,
  last,
  length,
  map,
  pipe,
  propEq,
  reduce,
  reject,
} from "ramda";
import { print } from "recast";
import F from "fluture";
import vm from "vm";

import { PRIMITIVE_TYPES } from "./constants";

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
  }

  return undefined;
};

export const typeMatch = (type, value) => {
  if (type === PRIMITIVE_TYPES.Boolean) {
    return typeof value === "boolean";
  } else if (type === PRIMITIVE_TYPES.String) {
    return typeof value === "string";
  }
  return false;
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

      if (typeMatch(signature.returnType, output)) {
        return { error: false };
      } else {
        return { error: true, context: {} };
      }
    }),
    reject(propEq("error", false)),
    ifElse(length, F.reject, always(F.resolve(true)))
  )(params);
