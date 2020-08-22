import { map, pipe, reduce, mergeRight } from "ramda"
/* eslint-disable string-literal/no-string-literal */

export const REGEXES = {
  startsWithParens: /^\(/,
  endsWithParens: /\)$/
}

export const TYPES = {
  HM_TYPE: "HMType",
  HM_SIGNATURE: "HMSignature"
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
  doubleColon: "::"
})
export const C = CHARACTERS

export const KEYWORDS = Object.freeze({
  HM: "@hm",
  HM_TYPE: "@hm-type"
})
export const K = KEYWORDS

const makeObjectFromStrings = pipe(
  reduce((xx, yy) => mergeRight(xx, { [yy]: yy }), {}),
  Object.freeze
)

export const FLAGS = makeObjectFromStrings(["input", "output"])
export const nf = map(z => "--" + z)

// read !cat file.js | grep 'L\..'
export const LITERALS = makeObjectFromStrings([
  "Boolean",
  "Global",
  "String",
  "nil",
  "object",
  "string",
  "undefined",
  "utf8",
  "value",
  "name",
  "type",
  "program",
  "body",
  "signature"
])

export const L = LITERALS
