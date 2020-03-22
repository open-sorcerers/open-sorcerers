import { fork as rawFork } from "fluture"
import {
  prop,
  __ as $,
  assoc,
  curry,
  replace,
  pipe,
  split,
  map,
  when,
  includes,
  join
} from "ramda"
import { tacit } from "ensorcel"
import cleanStack from "clean-stack"
/* import { trace } from "xtrace" */
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
