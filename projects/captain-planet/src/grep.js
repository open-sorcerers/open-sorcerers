import rg from "ripgrep-js"
import F from "fluture"
import { pipe, map, prop } from "ramda"
/* import { trace } from "xtrace" */

export const testTheEnvironment = pipe(
  F.encaseP(() => rg(".", "process.env")),
  map(prop("match"))
)
