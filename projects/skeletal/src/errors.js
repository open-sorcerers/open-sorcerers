import { curry, pipe } from "ramda"
import cleanStack from "clean-stack"
import { austereStack, deepfreeze } from "./utils"
import { nameVersion } from "./instance"

export const error = curry((ns, message, data) => {
  const name = `${nameVersion()}::${ns}`
  const e = new Error(message)
  e.name = name
  e.data = data
  e.stack = pipe(ST => cleanStack(ST, { pretty: true }), austereStack)(e.stack)
  return e
})
export const ERROR = deepfreeze({
  EXPECTED_NAME_AND_MORE: error(
    `pattern`,
    `Expected pattern to have {name, prompts, actions} properties.`
  ),
  INCOMPLETE_ACTION: error(
    `render`,
    `Expected action to have {type, path, template} properties.`
  )
})
