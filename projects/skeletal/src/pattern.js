import {
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
/* import { trace } from "xtrace" */
import { prompt } from "inquirer"
import { box, futurizeWithCancel } from "ensorcel"
import { Future, resolve } from "fluture"
import { UNSET } from "./constants"
import { ERROR } from "./errors"

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
