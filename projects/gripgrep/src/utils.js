import { once, propOr, equals, curryN, length } from "ramda"
import { NIL } from "./constants"

export const box = x => [x]
export const orNil = propOr(NIL)
export const isNil = equals(NIL)
export const KΩ = once(x => () => x)
export const wrap = curryN(2, (ab, x) =>
  length(ab) === 2 ? ab[0] + x + ab[1] : ab + x + ab
)
export const quote = wrap(`'`)
// eslint-disable-next-line valid-typeof
export const expectType = curryN(2, (type, xx) => typeof xx === type)
export const expectWhat = curryN(
  2,
  (expected, what) =>
    `Expected to be given ${expected} but instead received (${typeof what})`
)
export const yellUnless = curryN(3, (yell, expected, what) => {
  if (!expectType(expected, what)) {
    yell(expectWhat(expected, what))
    return false
  }
  return true
})
