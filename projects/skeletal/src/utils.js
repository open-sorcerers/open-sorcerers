import {
  replace,
  curry,
  identity as I,
  pipe,
  split,
  map,
  when,
  includes,
  join
} from "ramda"
const freeze = Object.freeze
const own = z => Object.getOwnPropertyNames(z)

export const deepfreeze = o => {
  if (o === Object(o)) {
    if (!Object.isFrozen(o)) freeze(o)
    own(o).forEach(prop => {
      if (prop !== "constructor") deepfreeze(o[prop])
    })
  }
  return o
}

const NM = "node_modules"

export const cutAfterString = curry((aa, bb) =>
  bb.slice(bb.indexOf(aa) + aa.length)
)

const unwrap = replace(")", "")

export const austereStack = when(
  I,
  pipe(
    split("\n"),
    map(
      when(
        includes(NM),
        /* z => "    at " + z.slice(z.indexOf(NM) + NM_LENGTH).replace(")", "") */
        z => "    at " + pipe(cutAfterString(NM), unwrap)(z)
      )
    ),
    join("\n")
  )
)
