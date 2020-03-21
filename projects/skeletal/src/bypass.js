import {
  curryN,
  forEach,
  addIndex,
  find,
  cond,
  curry,
  mergeRight,
  filter,
  ifElse,
  includes,
  is,
  length,
  map,
  prop,
  propOr,
  propSatisfies,
  split,
  toLower,
  when
} from "ramda"
import { prompt as inquirerPrompt } from "inquirer"
import { trace } from "xtrace"
import { pipe } from "./utils"

export const getChoiceValue = when(
  is(Object),
  cond([
    [propOr(false, "value"), prop("value")],
    [propOr(false, "name"), prop("name")],
    [propOr(false, "key"), prop("key")]
  ])
)

export const propIsString = propSatisfies(is(String))
export const casedEqual = curry((a, b) => toLower(a) === toLower(b))

export const choiceMatchesValue = curry((cx, ix, val) => {
  const cv = getChoiceValue(cx)
  const matchesChoice = cv && casedEqual(cv, val)
  /* const matchesKey = is(String, cx.key) && casedEqual(cx.key, val) */
  /* const matchesName = is(String, cx.name) && casedEqual(cx.name, val) */
  const matchesIndex = casedEqual(ix.toString(), val)
  return matchesChoice || matchesIndex
})

export const isFlag = curry((list, v) => pipe(includes(toLower(v)))(list))

export const flag = {
  isTrue: isFlag(["yes", "y", "true", "t"]),
  isFalse: isFlag(["no", "n", "false", "f"]),
  isPrompt: vv => /^_+$/.test(vv)
}

export const listTypeBypass = curry((val, prompt) => {
  const choice = prompt.choices.find((cx, ix) =>
    choiceMatchesValue(cx, ix, val)
  )
  if (!choice) return getChoiceValue(choice)
  return new Error("Invalid choice")
})
const ifind = addIndex(find)

export const typeBypass = {
  confirm: v =>
    flag.isTrue(v)
      ? true
      : flag.isFalse(v)
      ? false
      : new Error("Invalid input"),
  checkbox: (v, prompt) =>
    pipe(
      split(","),
      ifElse(
        pipe(
          filter(
            vv =>
              !prompt.choices.some((cx, ix) => choiceMatchesValue(cx, ix, vv))
          ),
          found => found.length !== 0
        ),
        xx => new Error(`No match for "${xx.join('", "')}"`),
        map(vv =>
          pipe(
            ifind((cx, ix) => choiceMatchesValue(cx, ix, vv)),
            getChoiceValue
          )(prompt.choices)
        )
      )
    )(v),
  list: listTypeBypass,
  rawlist: listTypeBypass,
  expand: listTypeBypass
}

const iforEach = addIndex(forEach)

export const bypass = curryN(2, (prompts, arr) => {
  const noop = [prompts, {}]
  const arrLength = length(arr)
  if (!Array.isArray(prompts) || !Array.isArray(arr) || arrLength === 0) {
    return noop
  }
  const { prompts: inqPrompts } = inquirerPrompt
  const answers = {}
  const failures = []

  iforEach((pr, ix) => {
    if (ix >= arrLength) return false
    const val = arr[ix].toString()
    if (flag.isPrompt(val)) return false
    if (is(Function, pr.when)) {
      failures.push("You cannot bypass conditional prompts.")
      return false
    }
    try {
      const iq = propOr({}, pr.type, inqPrompts)
      const bypassFn = pr.bypass || iq.bypass || typeBypass[pr.type]
      const value = is(Function, bypassFn) ? bypassFn(val, pr) : val
      const answer = pr.filter ? pr.filter(value) : value
      if (pr.validate) {
        const valid = pr.validate(value)
        if (!valid) {
          failures.push(new Error(`"${pr.name}" did not pass validation.`))
          return false
        }
      }
      answers[pr.name] = answer
    } catch (err) {
      failures.push(
        `The "${pr.name}" prompt didn't recognize "${val}" as a valid ${pr.type} value. (ERROR: ${err.message})`
      )
      return false
    }
  })(prompts)
  const postBypassPrompts = map(
    when(
      x => !!answers[x.name],
      x => mergeRight(x, { default: answers[x.name], when: false })
    )
  )(prompts)
  if (failures.length > 0) {
    throw new Error(failures[0])
  } else {
    return [postBypassPrompts, answers]
  }
})
