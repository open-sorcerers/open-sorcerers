import { append, curry, dropLast, last, pipe, reduce } from "ramda";
import { print } from "recast";
import vm from "vm";

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

const valueToType = (value) => {
  if (type === "String") {
    return "stringValue";
  }

  return undefined;
};

export const validate = (params) => {
  console.log(params);
  const code = print(params[0].ast).code;
  const signature = parseSignature(params[0].signature);

  const withCall = `
        ${code}
        ${params[0].name}
    `;

  const script = new vm.Script(withCall);
  const fn = curry(script.runInThisContext());

  const result = reduce(
    (returned, param) => returned(typeToValue(param)),
    fn
  )(signature.params);

  const type = pipe(
    (x) => typeof x,
    ([h, ...t]) => h.toUpperCase() + t.join("").toLowerCase()
  )(result);

  if (type === signature.returnType) {
    return "THAT IS CORRECT !";
  } else {
    return "OUPS, YOU MESSED UP !";
  }
};
