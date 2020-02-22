import chalk from "chalk"
import {
  keys,
  length,
  lt,
  propOr,
  __ as $,
  curry,
  range,
  addIndex,
  is,
  prop,
  pipe,
  map
} from "ramda"
import PKG from "../package.json"

import {getHelpMessage } from "./console-out"

const imap = addIndex(map)

const getPromptNames = pipe(prop("prompts"), map(prop("name")))
const nonEmptyObject = pipe(keys, length, lt(0))
const checkArgs = curry((generator, skeletalArgV) => {
  const promptNames = getPromptNames(generator)
  if (nonEmptyObject(skeletalArgV)) {
    let errors = false
    Object.keys(skeletalArgV).forEach(arg => {
      if (!promptNames.find(name => name === arg) && arg !== "_") {
        console.error(
          chalk.red(`[${PKG.name}] `) +
            '"' +
            arg +
            '"' +
            ' is an invalid argument for "' +
            generator.name +
            '"'
        )
        errors = true
      }
    })
    if (errors) {
      getHelpMessage(generator)
      process.exit(1)
    }
    return map(propOr(undefined, $, skeletalArgV), promptNames)
  }
})

const failOnInvalidBypass = curry((generator, bypassArr) => {
  const promptNames = getPromptNames(generator)
  if (bypassArr.length > promptNames.length) {
    console.error(
      chalk.red(`[${PKG.name}] `) +
        'Too many bypass arguments passed for "' +
        generator.name +
        '"'
    )
    getHelpMessage(generator)
    process.exit(1)
  }
})

const biggest = curry((x, y) => Math.max(x.length, y.length))
const mergeArrays = curry((aa, bb) =>
  pipe(
    biggest(aa),
    range(0),
    imap((_, i) => (typeof bb[i] !== "undefined" ? bb[i] : aa[i]))
  )(bb)
)

export const combineBypassData = (generator, bypassArr, skeletalArgV) => {
  if (is(Function)(generator.prompts)) return []
  failOnInvalidBypass(generator, bypassArr)
  return pipe(
    checkArgs(generator),
    mergeArrays(bypassArr),
    map(z => z || "_")
  )(skeletalArgV)
}
