import {
  pathOr,
  propOr,
  curry,
  ap,
  ifElse,
  any,
  pipe,
  equals,
  chain,
  map,
  reduce,
  mergeRight,
  identity as I
} from "ramda"
import { trace, sideEffect } from "xtrace"
import { prompt } from "inquirer"
import { box, futurizeWithCancel } from "ensorcel"
import { Future, resolve } from "fluture"
import { UNSET } from "./constants"
import { ERROR } from "./errors"
import { bypass } from "./bypass"

const getName = propOr(UNSET, "name")
const getPrompts = propOr(UNSET, "prompts")
const getActions = propOr(UNSET, "actions")

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
export const pattern = curry((ligature, raw) => {
  const cancel = propOr(I, "cancel", ligature)
  const unpromptedAnswers = pathOr([], ["config", "_"], ligature)
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
      map(x => {
        const [newPrompts, answers] = bypass(raw.prompts, unpromptedAnswers)
        return mergeRight(x, {
          prompts: newPrompts,
          preAnswered: answers
        })
      }),
      chain(given => {
        return pipe(
          xx => {
            return xx
          },
          propOr([], "prompts"),
          map(willPrompt),
          reduce(
            (left, right) => chain(ll => map(mergeRight(ll), right), left),
            resolve({})
          ),
          map(answers =>
            mergeRight(given, {
              answers: mergeRight(
                given.preAnswered ? given.preAnswered : {},
                answers
              )
            })
          )
        )(given)
      })
    )(raw)
  ]
})
