import { curryN, allPass } from "ramda"
import F from "fluture"
import { expectType, yellUnless, expectWhat } from "./utils"
/*
const {
  after,
  attempt,
  attemptP,
  bimap,
  chain,
  chainRej,
  coalesce,
  encase,
  encaseP,
  mapRej,
  node,
  reject,
  rejectAfter,
  resolve,
  swap
} = F
const UNARY = { attempt, attemptP, resolve, reject, swap }
const BINARY = map(curryN(2), {
  after,
  chain,
  chainRej,
  encase,
  encaseP,
  mapRej,
  node,
  rejectAfter
})
const TERNARY = map(curryN(3), { bimap, coalesce })
export const BACK_TO_THE_OLD_FLUTURE = {
  UNARY,
  BINARY,
  TERNARY
}
*/

export const futurizeWithCancel = curryN(3, (arity, fn, cancel) =>
  curryN(arity, function promise2Future(...args) {
    return new F((bad, good) => {
      fn.apply(this, [...args])
        .catch(bad)
        .then(good)
      return cancel
    })
  })
)

export const unfuturize = curryN(2, (arity, fn) =>
  curryN(arity, function future2Promise(...args) {
    return new Promise((resolve, reject) =>
      F.fork(reject)(resolve)(fn.apply(this, args))
    )
  })
)
