import {
  pipe,
  prop,
  findIndex,
  memoizeWith,
  identity as I,
  includes,
  curryN,
  reduce
} from "ramda"
/* import { Future, fork } from "fluture" */
import * as FF from "fluture"
import { freeze } from "./utils"

const memo = memoizeWith(I)

const { Future, fork } = FF

/**
Takes a Promise-returning function and gives back a Future-returning function.

@function futurizeWithCancel
@param {Function} cancel - a unary function to call and manage async cancellation
@param {String} arity - the number of parameters the given function takes
@param {Function} fn - a Promise-returning function
@returns {Future}
*/
export const futurizeWithCancel = curryN(3, (cancel, arity, fn) =>
  curryN(arity, function promise2Future(...args) {
    return new Future((bad, good) => {
      fn.apply(this, [...args])
        .catch(bad)
        .then(good)
      return cancel
    })
  })
)

// for the lazy seeking to use the lazy
export const futurize = futurizeWithCancel(() => {})

/**
Takes a Future-returning function and gives back a Promise-returning function.

@function unfuturize
@param {String} arity - the number of parameters the given function takes
@param {Function} fn - a Promise-returning function
@returns {Function} cancellation function
*/
export const unfuturize = curryN(2, (arity, fn) =>
  curryN(arity, function future2Promise(...args) {
    return new Promise((resolve, reject) =>
      fork(reject)(resolve)(fn.apply(this, args))
    )
  })
)

// to add insult to eagerness
export const downgrade = unfuturize

// not a fan of simple currying at some other library's whims
// especially given that uncurryN doesn't fucking work with it
// and we're not using sanctuary
export const tacit = curryN(2, (arity, raw) => {
  return curryN(arity, (...args) => reduce((fn, x) => fn(x), raw, args))
})

const hotLookup = memo(x => findIndex(includes(x)))

// use semiauto if you wanna do tree-shaking
export const semiauto = curryN(2, (lookup, fn) =>
  pipe(hotLookup(lookup), arity => tacit(arity, fn))(FLUTURE_METHOD_ARITIES)
)

// use auto if you dgaf
export const auto = lookup => pipe(prop(lookup), fn => semiauto(lookup, fn))(FF)

export const FLUTURE_METHOD_ARITIES = freeze([
  ["swap", "promise"],
  [
    "ap",
    "attempt",
    "attemptP",
    "chain",
    "chainRej",
    "go",
    "isFuture",
    "isNever",
    "map",
    "mapRej",
    "node",
    "pap",
    "reject",
    "resolve"
  ],
  [
    "after",
    "alt",
    "and",
    "both",
    "done",
    "encase",
    "encaseP",
    "lastly",
    "parallel",
    "rejectAfter",
    "value"
  ],
  ["bimap", "coalesce", "fork", "hook"],
  ["forkCatch"]
])
