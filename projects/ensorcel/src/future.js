import { curryN } from "ramda"
import { Future, fork } from "fluture"
import { freeze } from "./utils"

/**
Takes a Promise-returning function and gives back a Future-returning function.

@function futurizeWithCancel
@param {String} arity - the number of parameters the given function takes
@param {Function} cancel - a unary function to call and manage async cancellation
@param {Function} fn - a Promise-returning function
@returns {Future}
*/
export const futurizeWithCancel = curryN(3, (arity, cancel, fn) =>
  curryN(arity, function promise2Future(...args) {
    return new Future((bad, good) => {
      fn.apply(this, [...args])
        .catch(bad)
        .then(good)
      return cancel
    })
  })
)

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
