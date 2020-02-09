import {
  values,
  identity as I,
  when,
  range,
  keys,
  reduce,
  last,
  pipe,
  curry,
  map
} from "ramda"
import facepaint from "facepaint"
/* import { trace } from "xtrace" */

export const DEFAULT_BREAKPOINTS = {
  XT: 320,
  T: 480,
  XXXS: 600,
  XXS: 736,
  XS: 864,
  S: 900,
  XXM: 1088,
  XM: 1200,
  M: 1300,
  L: 1800,
  XL: 2048,
  XXL: 2560,
  XXXL: 4000
}
export const withUnit = curry((suffix, o) => map(z => z + suffix, o))

export const asRelativeUnit = curry((ratio, name, points) =>
  pipe(map(ratio), withUnit(name), Object.freeze)(points)
)
export const asPx = asRelativeUnit(I, "px")
export const asRem = curry((base, points) =>
  asRelativeUnit(z => z / base, "rem")(points)
)

export const minMedia = z => `@media(min-width: ${z})`
export const maxMedia = z => `@media(max-width: ${z})`
export const GAP = "%GAP%"
export const __ = GAP

export const fillGaps = curry((points, xxx) =>
  when(
    Array.isArray,
    pipe(
      z => {
        const zLength = z.length
        const totalPoints = keys(points).length
        if (zLength >= totalPoints) return z
        return pipe(
          range(0),
          map(() => GAP),
          aa => z.concat(aa)
        )(Math.abs(zLength - totalPoints))
      },
      reduce((aa, bb) => {
        const cc = bb === GAP ? last(aa) : bb
        return aa.concat(cc)
      }, [])
    )
  )(xxx)
)

export const bodypaint = curry((useMin, baseFontSize, xxx) =>
  pipe(
    asRem(baseFontSize),
    map(useMin ? minMedia : maxMedia),
    values,
    facepaint
  )(xxx)
)

export const makePainter = ({ useMin, baseFontSize, points }) => {
  const rawPoints = Object.freeze(points)
  const bodypainter = bodypaint(useMin, baseFontSize, rawPoints)
  return pipe(map(fillGaps(rawPoints)), bodypainter)
}

export const useDefaultPainter = makePainter({
  useMin: true,
  baseFontSize: 16,
  points: DEFAULT_BREAKPOINTS
})
