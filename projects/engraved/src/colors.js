import {
  map,
  length,
  pipe,
  curry,
  path,
  filter,
  toPairs,
  nth,
  memoizeWith,
  identity as I
} from "ramda"
import helloColor from "hello-color"
import palx from "palx"
import colorable from "colorable"

const pair = curry(
  memoizeWith(I, (ff, bb) => colorable({ foreground: ff, background: bb }))
)

const over = curry((de, nu) => nu / de)

const getAccessibility = pipe(
  path([0, "combinations", 0, "accessibility"]),
  toPairs,
  filter(nth(1)),
  length,
  over(4)
)

export const compare = curry((ff, bb) => {
  const compared = pair(ff, bb)
  const readability = getAccessibility(compared)
  const raw = { foreground: ff, background: bb }
  const options = map(palx, raw)
  const best = map(helloColor, raw)
  const suggested =
    readability < 1 / 2
      ? best.foreground.dark
        ? {
            foreground: best.foreground.base,
            background: best.foreground.color
          }
        : {
            foreground: best.foreground.color,
            background: best.foreground.base
          }
      : raw

  return { best, options, compared, readability, suggested }
})
