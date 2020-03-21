import { isFuture, fork as rawFork } from "fluture"
import {
  prop,
  __ as $,
  reject,
  assoc,
  curry,
  replace,
  split,
  map,
  when,
  includes,
  join,
  reduce,
  pipe
} from "ramda"
export { pipe } from "ramda"
import { tacit } from "ensorcel"
import cleanStack from "clean-stack"
import { trace } from "xtrace"
const freeze = Object.freeze
const own = z => Object.getOwnPropertyNames(z)

export const deepfreeze = o => {
  if (o === Object(o)) {
    if (!Object.isFrozen(o)) freeze(o)
    own(o).forEach(pp => {
      if (pp !== "constructor") deepfreeze(o[pp])
    })
  }
  return o
}

const NM = "node_modules"

export const cutAfterStringAdjust = curry((alter, aa, bb) =>
  bb.slice(bb.indexOf(aa) + aa.length + alter)
)

/*
export function neupipe() {
  let args = [].slice.call(arguments)

  const magicHelp = f => f && typeof f === "string" && f.includes("help")
  const logStuff = args.find(magicHelp)
  if (logStuff) {
    const name = logStuff.split(":")[1] || "x "

    args = reduce(
      (agg, next) => ({
        count: agg.count + 1,
        args: agg.args.concat([
          z =>
            isFuture(z)
              ? map(trace(name + agg.count), z)
              : trace(name + agg.count, z),
          next
        ])
      }),
      { count: 0, args: [] },
      reject(magicHelp, args)
    )
    args = args.args
  }
  const notAFunction = args.find(f => typeof f !== "function")
  if (notAFunction) {
    throw new TypeError(
      "pipe: " + toString(notAFunction) + " is not a function."
    )
  }
  return rawPipe(...args)
}
*/

const unwrap = replace(")", "")

export const austereStack = when(
  e => e && e.stack,
  e =>
    pipe(
      prop("stack"),
      ST => cleanStack(ST, { pretty: true }),
      split("\n"),
      map(
        pipe(
          when(
            includes(NM),
            z => "    at " + pipe(cutAfterStringAdjust(1, NM), unwrap)(z)
          ),
          when(includes(","), z => z.slice(0, z.indexOf(",")))
        )
      ),
      join("\n"),
      stack => {
        e.stack = stack
        return e
      }
    )(e)
)
export const fork = tacit(2, rawFork)
