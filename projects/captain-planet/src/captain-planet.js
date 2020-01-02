import { nth, uniq, reduce, map, split, pipe } from "ramda"
import { smooth, merge } from "./utils"

const C = {
  n: "\n"
}

export const captainPlanet = pipe(
  // split ripgrep input by newlines
  split(C.n),
  // cut apart the [filename, process.env.?] match
  map(z => z && [z.slice(0, z.indexOf(":")), /process\.env\.(\w+)/.exec(z)]),
  smooth,
  // grab only the pertinent info from the resulting regex
  map(([f, e]) => (f && e ? [f, nth(1, e)] : false)),
  smooth,
  // make an object whose keys are files and whose values are arrays of matching ENV vars
  reduce(
    (a, [k, v]) => merge(a, { [k]: a[k] ? uniq(a[k].concat(v).sort()) : [v] }),
    {}
  )
)
