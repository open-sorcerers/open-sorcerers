import {
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
import { trace } from "xtrace"
import { Future as F, fork as rawFork } from "fluture"
import { box, tacit, futurizeWithCancel } from "ensorcel"
import { compile } from "handlebars"
import { cosmiconfig } from "cosmiconfig"

import pkg from "../package.json"

import { deepfreeze } from "./utils"

export const fork = tacit(2, rawFork)

export const cosmicConfigurate = curry((ligament, cosmic) => {
  console.log("COSMIC KNIFE", cosmic)
  const cancel = propOr(I, "cancel", ligament)
  const futurize = futurizeWithCancel(cancel)
  const cosmicLoad = futurize(1, cosmic.load)
  const cosmicSearch = futurize(0, cosmic.search)
  const configFile = pathOr(false, ["config", "configFile"], ligament)
  console.log("CONFIG FILE", configFile)

  return pipe(
    ifElse(pathOr(false, ["config", "configFile"]), cosmicLoad, () => {
      const cwd = process.cwd()
      const out = cosmicSearch(cwd)
      console.log("loading from search", cosmicSearch, ">>", cwd, out)
      return out
    }),
    map(trace("uhhhh")),
    map(
      pipe(
        trace("loaded?"),
        propOr(I, "config"),
        // ligasure ^^
        z => z(ligament)
      )
    )
  )(ligament)
})

const UNSET = `%UNSET%`

const error = curry((ns, message, data) => {
  throw new Error({ name: `${pkg.name}@${pkg.version}-${ns}`, message, data })
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

export const pattern = pipe(
  trace("pattern input?"),
  box,
  ap([getName, getPrompts, getActions]),
  trace("ap-happy"),
  ifElse(
    any(equals(UNSET)),
    ERROR.EXPECTED_NAME_AND_MORE,
    ([name, prompts, actions]) => {
      console.log("N", name, "P", prompts, "hard", actions)
      return "so cool"
    }
  ),
  trace("cool?")
)

export const skeletal = config => {
  let isCancelled = false
  const cancel = () => {
    isCancelled = true
  }
  // closured, for your safety
  const checkCancelled = () => isCancelled
  // this is what the consumer sees as "bones" in the config file
  const ligament = {
    cancel,
    checkCancelled,
    config: deepfreeze(config),
    pattern
  }
  // wrap our composition steps with this so we can barf early
  const cancellable = unless(checkCancelled)
  return pipe(
    propOr("skeletal", "namespace"),
    trace("loading namespace"),
    cosmiconfig,
    cancellable(cosmicConfigurate(ligament)),
    map(trace("what dis?"))
  )(config)
}
