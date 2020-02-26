import { bold } from "kleur"
import {
  join,
  __ as $,
  includes,
  prop,
  keys,
  cond,
  mergeRight,
  chain,
  ap,
  any,
  equals,
  curry,
  pipe,
  ifElse,
  split,
  identity as I,
  unless,
  map,
  reduce,
  propOr,
  pathOr
} from "ramda"
import { writeFile, readFile } from "torpor"
import { sideEffect, trace } from "xtrace"
import { reject, resolve, parallel, Future, fork as rawFork } from "fluture"
import { j2, box, tacit, futurizeWithCancel } from "ensorcel"
import { compile } from "handlebars"
import { cosmiconfig } from "cosmiconfig"
import { prompt } from "inquirer"
import cleanStack from "clean-stack"

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
    )
  )(ligament)
})

const UNSET = `%UNSET%`

const error = curry((ns, message, data) => {
  const name = `${bold(pkg.name + pkg.version)}::${ns}`
  const e = new Error(message)
  e.name = name
  e.data = data
  e.stack = cleanStack(e.stack, { pretty: true })
  return e
})

const getName = propOr(UNSET, "name")
const getPrompts = propOr(UNSET, "prompts")
const getActions = propOr(UNSET, "actions")
const ERROR = deepfreeze({
  EXPECTED_NAME_AND_MORE: error(
    `pattern`,
    `Expected pattern to have {name, prompts, actions} properties.`
  ),
  INCOMPLETE_ACTION: error(
    `render`,
    `Expected action to have {type, path, template} properties.`
  )
})

const validatePatternAndSubmit = curry((bad, good, raw) =>
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
)

export const pattern = curry((config, raw) => {
  const cancel = propOr(I, "cancel", config)
  const willPrompt = futurizeWithCancel(cancel, 1, prompt)
  return [
    raw.name,
    pipe(
      chain(futurePattern =>
        pipe(
          propOr([], "prompts"),
          map(willPrompt),
          reduce(
            (left, right) => chain(ll => map(mergeRight(ll), right), left),
            resolve({})
          ),
          map(answers => mergeRight(futurePattern, { answers }))
        )(futurePattern)
      )
    )(
      new Future((bad, good) => {
        validatePatternAndSubmit(bad, good, raw)
        return cancel
      })
    )
  ]
})

const render = curry((config, filled) => {
  const parallelThreadMax = propOr(10, "threads", config)
  const { answers, actions } = filled
  return pipe(
    map(
      pipe(
        box,
        ap([propOr(UNSET, "template"), propOr(UNSET, "path")]),
        ifElse(
          any(equals(UNSET)),
          pipe(ERROR.INCOMPLETE_ACTION, reject),
          ([templateFile, outputFile]) =>
            pipe(
              readFile(templateFile),
              map(compile),
              map(fn => fn(answers)),
              chain(writeFile(outputFile, $, { format: "utf8", flag: "wx" }))
            )("utf8")
        )
      )
    ),
    parallel(parallelThreadMax)
  )(actions)
})

export const pushInto = curry((into, fn) =>
  pipe(
    fn,
    sideEffect(x => into.push(x))
  )
)

export const saveKeyed = curry((struct, fn, input) => {
  const [key, ff] = fn(input)
  struct[key] = ff
  return ff
})

export const skeletal = config => {
  const parallelThreadMax = propOr(10, "threads", config)
  const which = propOr(false, "pattern", config)
  let isCancelled = false
  /* const patterns = [] */
  const patterns = {}
  const cancel = () => {
    isCancelled = true
    process.exit(1)
  }
  // closured, for your safety
  const checkCancelled = () => isCancelled
  // wrap our composition steps with this so we can barf early
  const cancellable = unless(checkCancelled)
  // this is what the consumer sees as "bones" in the config file
  const ligament = {
    parallelThreadMax,
    cancel,
    checkCancelled,
    config: deepfreeze(config)
  }
  /* ligament.pattern = pushInto(patterns, pattern(ligament)) */
  ligament.pattern = saveKeyed(patterns, pattern(ligament))
  return pipe(
    propOr("skeletal", "namespace"),
    cosmiconfig,
    cancellable(cosmicConfigurate(ligament)),
    chain(
      cond([
        [checkCancelled, () => reject(new Error("CANCELLED"))],
        [
          () => which,
          () => pipe(prop(which), chain(render(ligament)))(patterns)
        ],
        [() => true, () => resolve({ patterns: keys(patterns) })]
      ])
    )
  )(config)
}
