import { map, pipe, reduce, mergeRight } from "ramda"
/* eslint-disable string-literal/no-string-literal */

export const REGEXES = {
  startsWithParens: /^\(/,
  endsWithParens: /\)$/
}

export const TYPES = {
  HM_TYPE: "RepastData",
  HM_SIGNATURE: "RepastSignature"
}

export const CHARACTERS = Object.freeze({
  __of__: `∋`,
  newline: "\n",
  comment: "//",
  space: " ",
  openParens: "(",
  closeParens: ")",
  asterisk: "*",
  empty: "",
  space: " ",
  doubleColon: "::",
  equal: "="
})
export const C = CHARACTERS

export const KEYWORDS = Object.freeze({
  REPAST: "@repast"
})
export const K = KEYWORDS

const makeObjectFromStrings = pipe(
  reduce((xx, yy) => mergeRight(xx, { [yy]: yy }), {}),
  Object.freeze
)

// read !cat file.js | grep 'L\..'
export const LITERALS = makeObjectFromStrings([
  "Boolean",
  "Global",
  "Identifier",
  "String",
  "ast",
  "arity",
  "body",
  "globals",
  "input",
  "json",
  "loc",
  "name",
  "nil",
  "object",
  "output",
  "params",
  "program",
  "signature",
  "string",
  "type",
  "undefined",
  "utf8",
  "value"
])

export const L = LITERALS

export const FLAGS = makeObjectFromStrings([L.input, L.output, L.json])
export const nf = map(z => "--" + z)

export const PRIMITIVE_TYPES = makeObjectFromStrings([
  "Boolean",
  "String",
  "Number",
  "Void",
  "Object",
  "Array",
]);

export const GLOBALS = pipe(
  reduce((agg, thing) => mergeRight(agg, { [thing.name]: thing }), {})
)([
  Array,
  Boolean,
  Date,
  Error,
  Function,
  Number,
  Object,
  Promise,
  Proxy,
  RegExp,
  String,
  Symbol
])
