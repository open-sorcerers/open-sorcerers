import { curry, pipe } from "ramda"
import { sideEffect } from "xtrace"

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
