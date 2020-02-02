import { readFile } from "torpor"
import { pipe, prop, curry, uncurryN } from "ramda"
import { chain } from "fluture"

export const brainwave = curry((config, file) =>
  pipe(
    prop("config"),
    readFile
    // map(data)
  )
)
