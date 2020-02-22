import {
  map,
  any,
  filter,
  addIndex,
  prop,
  find,
  curry,
  pipe,
  includes,
  __ as $,
  toLower,
  is
} from "ramda"

const ifind = addIndex(find)
const ifilter = addIndex(find)

const getChoiceValue = choice => {
  const isObject = typeof choice === "object"
  if (isObject) {
    const { value, name, key } = choice
    if (value) {
      return value
    }
    if (name) {
      return name
    }
    if (key) {
      return key
    }
  }
  return choice
}

const choiceMatchesValue = curry((value, choice, choiceIdx) => {
  const choiceValue = getChoiceValue(choice)
  const lowValue = toLower(value)
  const matchesChoice = choiceValue && toLower(choiceValue) === lowValue
  const { key, name } = choice
  const matchesKey = is(String, key) && toLower(key) === lowValue
  const matchesName = is(String, name) && toLower(name) === lowValue
  const matchesIndex = choiceIdx.toString() === value
  return matchesChoice || matchesKey || matchesName || matchesIndex
})

const isFlag = curry((list, v) => pipe(toLower, includes($, list))(v))
const flag = {
  isTrue: isFlag(["yes", "y", "true", "t"]),
  isFalse: isFlag(["no", "n", "false", "f"]),
  isPrompt: v => /^_+$/.test(v)
}

const getMatchingChoices = curry((v, pr) =>
  pipe(prop("choices"), ifind(choiceMatchesValue(v)))(pr)
)
const listTypeBypass = (v, prompt) => {
  const choice = getMatchingChoices(prompt)
  if (choice) return getChoiceValue(choice)
  throw Error("invalid choice")
}

const filterMatches = curry((choices, xxx) =>
  filter(val => !any(choiceMatchesValue(val), choices))(xxx)
)

// list of prompt bypass functions by prompt type
const typeBypass = {
  confirm: v => {
    if (flag.isTrue(v)) return true
    if (flag.isFalse(v)) return false
    throw Error("invalid input")
  },
  checkbox: (v, prompt) => {
    const valList = v.split(",")
    const valuesNoMatch = filterMatches(valList)
    if (valuesNoMatch.length) {
      throw Error(`no match for "${valuesNoMatch.join('", "')}"`)
    }
    return pipe(map(val => getChoiceValue(getMatchingChoices(val, prompt))))(
      valList
    )
  },
  list: listTypeBypass,
  rawlist: listTypeBypass,
  expand: listTypeBypass
}

const bypassSpecificPrompts = curry(
  (failures, bypassables, inqPrompts, answers, prompts) =>
    ifilter((pp, idx) => {
      const {
        type,
        validate,
        bypass: _bypass,
        filter: promptFilter,
        name,
        when
      } = pp
      if (idx >= bypassables.length) return false
      const val = bypassables[idx].toString()
      if (flag.isPrompt(val)) return false

      if (is(Function, when)) {
        failures.push(`You can not bypass conditional prompts: ${name}`)
        return false
      }

      try {
        const inqPrompt = inqPrompts[type] || {}
        const bypass = _bypass || inqPrompt.bypass || typeBypass[type] || null
        const bypassIsFunc = is(Function, bypass)
        const value = bypassIsFunc ? bypass(val, pp) : val

        const answer = promptFilter ? promptFilter(value) : value

        if (validate) {
          const valid = validate(value)
          if (!valid) {
            failures.push(valid)
            return false
          }
        }

        answers[name] = answer
      } catch (err) {
        failures.push(
          `The "${name}" prompt did not recognize "${val}" as a valid ${type} value (ERROR: ${err.message})`
        )
        return false
      }

      return true
    })(prompts)
)

export const bypasser = (prompts, bypassArr, skeletal) => {
  const noop = [prompts, {}, []]
  if (!Array.isArray(prompts) || bypassArr.length === 0) return noop

  const { prompts: inqPrompts } = skeletal.inquirer.prompt

  const answers = {}
  const bypassFailures = []

  const bypassedPrompts = bypassSpecificPrompts(
    bypassFailures,
    bypassArr,
    inqPrompts,
    answers,
    prompts
  )

  const promptsAfterBypass = [
    { when: data => Object.assign({}, data, answers) }
  ].concat(filter(p => !bypassedPrompts.includes(p))(prompts))
  if (bypassFailures.length > 0) {
    throw Error(bypassFailures[0])
  } else {
    return [promptsAfterBypass, answers]
  }
}
export default bypasser
