import { map, pipe, reduce, mergeRight } from "ramda"
/* eslint-disable string-literal/no-string-literal */

export const CHARACTERS = Object.freeze({
  __of__: `∋`,
  newline: "\n",
  comment: "//",
  space: " "
})
export const C = CHARACTERS

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
  "utf8"
])

export const L = LITERALS
