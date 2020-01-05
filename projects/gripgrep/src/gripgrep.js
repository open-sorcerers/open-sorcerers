import execa from "execa"
import F from "fluture"
import {
  prop,
  map,
  split,
  either,
  propEq,
  ap,
  curry,
  ifElse,
  pipe,
  propOr,
  reduce,
  always as K
} from "ramda"

import { box, orNil, quote } from "./utils"
import { futurizeWithCancel } from "./future"
import { KEYS } from "./constants"

import { regexFlag, stringFlag, globFlag } from "./cli"
const { reject } = F

export const CALLS = Object.freeze({
  raw: K([`rg`, [`--column`, `--line-number`, `--color`, `never`]]),
  regex: regexFlag,
  string: stringFlag,
  globs: curry((globs, flags) =>
    reduce((agg, c) => agg.concat(pipe(quote, globFlag)(c)), flags, globs)
  )
})

export const prepFlags = curry((regex, string, globs) => {
  const [cmd, flags] = CALLS.raw()
  const otherFlags = regex ? CALLS.regex(regex) : CALLS.string(string)
  const globbed = CALLS.globs(globs, [])
  const allFlags = flags.concat(otherFlags, globbed)
  return [cmd, allFlags]
})

/* istanbul ignore next */
const hardOut = () => console.log("quitting...") || process.exit(1)

// execa fxeca -- (fxeca might be a module on its own someday)
export const fxeca = futurizeWithCancel(2, execa, hardOut)

export const hasErrorOrIsCancelled = either(
  propEq("stderr", ""),
  propEq("isCancelled", true)
)

export const formatResults = map(
  pipe(split(":"), ([file, line, column, match]) => ({
    file,
    line: parseInt(line),
    column: parseInt(column),
    match
  }))
)

export const handleCancelledCaseOr = ifElse(propEq("isCancelled", true), () =>
  reject("Process was killed!")
)
export const handleGoodCase = pipe(prop("stdout"), split("\n"), formatResults)
export const handleError = pipe(prop("stderr"), reject)

export const futureCall = curry((search, [cwd, rx, globs]) => {
  const [cmd, args] = prepFlags(rx, search, globs)
  return fxeca(cmd, args, { cwd })
})

export const manipulate = ifElse(
  hasErrorOrIsCancelled,
  handleCancelledCaseOr(handleGoodCase),
  handleError
)

export const gripgrep = curry((opts, search) =>
  pipe(
    // force object
    x => x || {},
    // force array
    box,
    // grab keys safely
    ap([
      propOr(process.cwd(), KEYS.CWD),
      // TODO: Right now since we're basing our API on ripgrep-js, this is set up as a boolean | regex
      // but we could make this boolean only, and then have the search term be potentially a regex
      propOr(false, KEYS.REGEX),
      propOr([], KEYS.GLOBS)
    ]),
    // do stuff with the options now that we have them
    pipe(
      // search => Future(execa)
      futureCall(search),
      // use map b/c we're changing a monad now
      map(manipulate)
    )
  )(opts)
)
