import {
  mergeRight,
  chain,
  __ as $,
  ap,
  any,
  equals,
  apply,
  curry,
  pipe,
  ifElse,
  identity as I,
  always as K,
  unless,
  map,
  filter,
  join,
  split,
  reduce,
  is,
  propOr,
  pathOr
} from "ramda"
import { sideEffect, trace } from "xtrace"
import { parallel, Future, fork as rawFork } from "fluture"
import { j2, box, tacit, futurizeWithCancel } from "ensorcel"
import { compile } from "handlebars"
import { cosmiconfig } from "cosmiconfig"
import { prompt } from "inquirer"

import pkg from "../package.json"

import { deepfreeze } from "./utils"

export const fork = tacit(2, rawFork)

export const cosmicConfigurate = curry((ligament, cosmic) => {
  const cancel = propOr(I, "cancel", ligament)
  const futurize = futurizeWithCancel(cancel)
  const cosmicLoad = futurize(1, cosmic.load)
  const cosmicSearch = futurize(0, cosmic.search)
  return pipe(
    ifElse(pathOr(false, ["config", "configFile"]), cosmicLoad, () =>
      cosmicSearch()
    ),
    map(
      pipe(
        propOr(I, "config"),
        // ligasure ^^
        z => z(ligament)
      )
    ),
    chain(ligament.done)
  )(ligament)
})

const UNSET = `%UNSET%`

const error = curry((ns, message, data) => {
  const name = `${pkg.name}@${pkg.version}-${ns}`
  const e = new Error(message)
  e.name = name
  e.data = data
  throw e
})

const getName = propOr(UNSET, "name")
const getPrompts = propOr(UNSET, "prompts")
const getActions = propOr(UNSET, "actions")
const ERROR = deepfreeze({
  EXPECTED_NAME_AND_MORE: error(
    `pattern__badinputs`,
    `Expected name, prompts and actions properties to be given.`
  )
})

export const pattern = curry((config, raw) => {
  const cancel = propOr(I, "cancel", config)
  const parallelThreadMax = propOr(10, "parallelThreadMax", config)
  const willPrompt = futurizeWithCancel(cancel, 1, prompt)
  return pipe(
    chain(futurePattern =>
      pipe(
        propOr([], "prompts"),
        map(willPrompt),
        parallel(parallelThreadMax),
        map(reduce(mergeRight, {})),
        map(prompts => mergeRight(futurePattern, { prompts }))
      )(futurePattern)
    )
  )(
    new Future((bad, good) => {
      pipe(
        box,
        ap([getName, getPrompts, getActions]),
        ifElse(
          any(equals(UNSET)),
          pipe(ERROR.EXPECTED_NAME_AND_MORE, bad),
          ([name, prompts, actions]) => ({ name, prompts, actions })
        ),
        good
      )(raw)
      return cancel
    })
  )
})

export const pushInto = curry((into, fn) =>
  pipe(
    fn,
    sideEffect(x => into.push(x))
  )
)

export const skeletal = config => {
  const parallelThreadMax = propOr(10, "parallelThreadMax", config)
  let isCancelled = false
  const patterns = []
  const cancel = () => {
    isCancelled = true
  }
  // closured, for your safety
  const checkCancelled = () => isCancelled
  // wrap our composition steps with this so we can barf early
  const cancellable = unless(checkCancelled)
  // this is what the consumer sees as "bones" in the config file
  const ligament = {
    parallelThreadMax,
    done: cancellable(() => {
      const allPatterns = parallel(parallelThreadMax)(patterns)
      return allPatterns
    }),
    cancel,
    checkCancelled,
    config: deepfreeze(config)
  }
  ligament.pattern = pushInto(patterns, pattern(ligament))
  return pipe(
    propOr("skeletal", "namespace"),
    cosmiconfig,
    cancellable(cosmicConfigurate(ligament)),
    map(sideEffect(x => console.log("what dis?", j2(x))))
  )(config)
}
