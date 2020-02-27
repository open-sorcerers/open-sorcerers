import {
  ifElse,
  difference,
  all,
  fromPairs,
  __ as $,
  mergeRight,
  toPairs,
  includes,
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
import { trace } from "xtrace"

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
  ifElse(
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
    ),
    map(fillGaps(points))
  )(xxx)
)

export const paint = curry((useMin, baseFontSize, xxx) =>
  pipe(
    asRem(baseFontSize),
    map(useMin ? minMedia : maxMedia),
    values,
    facepaint
  )(xxx)
)

const orderedKeyReduction = reduce(
  (agg, [kk, vv, doStuff]) =>
    mergeRight(agg, doStuff ? { [kk]: pipe(values)(vv) } : { [kk]: vv }),
  {}
)
const makeBaseFromPattern = pipe(
  toPairs,
  map(([k]) => [k, GAP]),
  fromPairs
)

const isPatternObject = curry((pattern, xxx) => {
  const points = keys(pattern)
  return pipe(
    keys,
    difference(keys(xxx)),
    map(includes($, points)),
    all(z => z)
  )(points)
})

const dropNeedlessGaps = curry((pattern, list) => {
  if (!Array.isArray(list)) return list
  const copy = [].concat(list)
  let chained = true
  let terminal = list.length
  let cur = null
  let prev = null
  for (let i = list.length; i > -1; i--) {
    if (!chained) break
    cur = list[i]
    prev = list[i + 1]
    if (cur && prev) {
      if ((prev === GAP && cur !== GAP) || prev !== GAP) {
        chained = false
        terminal = prev !== GAP ? i + 1 : i
      }
    }
  }
  return copy.slice(0, terminal + 1)
})

export const gaplessPlayback = curry((pattern, mqInput) => {
  const smashable = makeBaseFromPattern(pattern)
  return pipe(
    toPairs,
    map(([k, v]) => [
      k,
      isPatternObject(pattern, v)
        ? mergeRight(smashable, v)
        : gaplessPlayback(pattern, v),
      isPatternObject(pattern, v)
    ]),
    orderedKeyReduction,
    map(dropNeedlessGaps(pattern))
  )(mqInput)
})

export const makePainter = ({ useMin, baseFontSize, points, implicit }) => {
  const rawPoints = Object.freeze(points)
  const painter = paint(useMin, baseFontSize, rawPoints)
  return pipe(
    implicit ? gaplessPlayback(rawPoints) : I,
    map(fillGaps(rawPoints)),
    painter
  )
}

export const bodypaint = makePainter({
  useMin: true,
  baseFontSize: 16,
  points: DEFAULT_BREAKPOINTS,
  implicit: true
})
