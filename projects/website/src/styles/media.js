import { pipe, map, curry, multiply } from 'ramda'

export const REM = 16

export const RAW_BREAKPOINTS = Object.freeze({
  XS: 40,
  S: 50,
  M: 80,
  L: 90,
  XL: 128,
  XXL: 160
})

const addUnit = curry((suffix, o) => map(z => z + suffix, o))

export const BREAKPOINTS_AS_REM = pipe(addUnit('rem'), Object.freeze)(RAW_BREAKPOINTS)

export const BREAKPOINTS_AS_PIXELS = pipe(
  map(multiply(REM)),
  addUnit('px'),
  Object.freeze
)(RAW_BREAKPOINTS)

export const mq = curry(
  (cond, qq, def) =>
    `
  @media (${cond}: ${qq}) {
    ${def}
  }
`
)
export const mqCalc = curry(
  (cond, qq, cc, def) =>
    `
  @media (${cond}: calc(${qq} + ${cc})) {
    ${def}
  }
`
)

export const mqMin = mq('min-width')
export const mqMax = mq('max-width')

export const minBreak = map(mqMin, BREAKPOINTS_AS_REM)
export const maxBreak = map(mqMax, BREAKPOINTS_AS_REM)

export const alteredMinBreak = map(mqCalc('min-width'), BREAKPOINTS_AS_REM)
export const alteredMaxBreak = map(mqCalc('max-width'), BREAKPOINTS_AS_REM)
