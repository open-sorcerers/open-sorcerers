import {
  pathOr,
  propOr,
  curry,
  ap,
  ifElse,
  any,
  equals,
  chain,
  map,
  reduce,
  mergeRight,
  identity as I
} from "ramda"
/* import { trace, sideEffect } from "xtrace" */
import { prompt } from "inquirer"
import { box, futurizeWithCancel } from "ensorcel"
import { Future, resolve } from "fluture"
import { pipe } from "./utils"
import { UNSET } from "./constants"
import { ERROR } from "./errors"
import { bypass } from "./bypass"

export const getName = propOr(UNSET, "name")
export const getPrompts = propOr(UNSET, "prompts")
export const getActions = propOr(UNSET, "actions")

export const validatePatternAndSubmit = curry((bad, good, raw) =>
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

export const reduceFutures = curry((fn, list) =>
  reduce(
    (left, right) => chain(ll => map(fn(ll), right), left),
    resolve({})
  )(list)
)
export const sequentialResolve = reduceFutures(mergeRight)

export const handleUnpromptedAnswers = curry((ligature, rawF) => {
  const answers = pathOr([], ["config", "_"], ligature)
  return map(x => {
    const givenPrompts = propOr([], "prompts", x)
    const [prompts, preAnswered] = bypass(givenPrompts, answers)
    return mergeRight(x, {
      prompts,
      preAnswered
    })
  })(rawF)
})

export const mergePreAnswers = curry((given, answers) =>
  mergeRight(given, {
    answers: mergeRight(given.preAnswered ? given.preAnswered : {}, answers)
  })
)
export const pattern = curry((ligature, raw) => {
  const cancel = propOr(I, "cancel", ligature)
  const willPrompt = futurizeWithCancel(cancel, 1, prompt)
  const build = xxx =>
    new Future((bad, good) => {
      validatePatternAndSubmit(bad, good, xxx)
      return cancel
    })

  return [
    raw.name,
    pipe(
      build,
      handleUnpromptedAnswers(ligature),
      chain(given =>
        pipe(
          propOr([], "prompts"),
          map(willPrompt),
          sequentialResolve,
          map(mergePreAnswers(given))
        )(given)
      )
    )(raw)
  ]
})
