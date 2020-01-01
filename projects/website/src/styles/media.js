import React from 'react'
import styled from '@emotion/styled'
import { Box } from 'rebass'
import { __, replace, toPairs, propOr, pipe, map, curry } from 'ramda'
import { Z_INDEX } from '@styles/constants'
import * as ℂ from '@styles/colors'

export const REM = 16

export const RAW_POINTS = Object.freeze({
  XXXS: 320,
  XXS: 480,
  XS: 600,
  X5S: 864,
  S: 900,
  XM: 1088,
  M: 1200,
  M5: 1300,
  L: 1800,
  XL: 2048,
  XXL: 2560,
  XXXL: 4000
})

export const addUnit = curry((suffix, o) => map(z => z + suffix, o))

export const BREAKPOINTS_AS_REM = pipe(
  map(z => z / REM),
  addUnit('rem'),
  Object.freeze
)(RAW_POINTS)

export const BREAKPOINTS_AS_PIXELS = pipe(addUnit('px'), Object.freeze)(RAW_POINTS)

export const mq = curry(
  (cond, qq, def) => `
@media (${cond}: ${qq}) {
  ${def}
}
`
)

export const media = curry((cond, [qq, and = false], def) =>
  mq(cond, and ? `calc(${qq} + ${and})` : qq, def)
)

export const SIZES_UP_TO = Object.freeze({
  TINY_PHONE: BREAKPOINTS_AS_REM.XXXS,
  SMALL_PHONE: BREAKPOINTS_AS_REM.XXS,
  PHONE: BREAKPOINTS_AS_REM.XS,
  MID_TABLET: BREAKPOINTS_AS_REM.X5S,
  TABLET_LANDSCAPE: BREAKPOINTS_AS_REM.S,
  BIG_TABLET: BREAKPOINTS_AS_REM.M5,
  LARGE_TABLET: BREAKPOINTS_AS_REM.XM,
  DESKTOP: BREAKPOINTS_AS_REM.M,
  BIG_DESKTOP: BREAKPOINTS_AS_REM.L,
  REALLY_BIG_DESKTOP: BREAKPOINTS_AS_REM.XL
})

export const SIZES_ABOVE = Object.freeze({
  TINY_PHONE: BREAKPOINTS_AS_REM.XXXS,
  SMALL_PHONE: BREAKPOINTS_AS_REM.XXS,
  TABLET_PORTRAIT: BREAKPOINTS_AS_REM.XS,
  MID_TABLET: BREAKPOINTS_AS_REM.X5S,
  TABLET_LANDSCAPE: BREAKPOINTS_AS_REM.S,
  BIG_TABLET: BREAKPOINTS_AS_REM.M5,
  LARGE_TABLET: BREAKPOINTS_AS_REM.XM,
  DESKTOP: BREAKPOINTS_AS_REM.M,
  BIG_DESKTOP: BREAKPOINTS_AS_REM.L,
  REALLY_BIG_DESKTOP: BREAKPOINTS_AS_REM.XL,
  REALLY_REALLY_BIG_DESKTOP: BREAKPOINTS_AS_REM.XL
})

export const deltaCalcPoint = curry((query, point, and, content) =>
  media(query, [point, and], content)
)

const MAX = 'max-width'
const MIN = 'min-width'

export const aboveCalcPoint = deltaCalcPoint(MIN)
export const abovePoint = deltaCalcPoint(MIN, __, false, __)

export const upToCalcPoint = deltaCalcPoint(MAX)
export const upToPoint = deltaCalcPoint(MAX, __, false, __)
export const upToCalc = map(upToCalcPoint)(SIZES_UP_TO)
export const upTo = map(upToPoint)(SIZES_UP_TO)

export const aboveCalc = map(aboveCalcPoint)(SIZES_ABOVE)
export const above = map(abovePoint)(SIZES_ABOVE)

export const Breakpoint = styled(Box)`
  position: fixed;
  height: 100vh;
  width: 1rem;
  z-index: ${Z_INDEX.GUIDE};
  top: 0;
  left: ${pipe(
    propOr(0, 'size'),
    parseFloat,
    x => x * 16,
    x => x + 'px'
  )};
  border-left: 1px dashed ${ℂ.debug};
  opacity: 0.1;
  cursor: crosshair;
  &:hover {
    opacity: 1;
  }
  &::before {
    position: absolute;
    background-color: ${ℂ.debug};
    color: ${ℂ.offBlack};
    content: "${pipe(propOr(false, 'label'), replace(/_/g, ' '))}";
    transform: rotate(-90deg);
    padding: 0 3rem 0 1rem;
    width: 10rem;
    margin-left: -6.25rem;
    margin-top: 2rem;
  }
`

export const Breakpoints = pipe(
  toPairs,
  map(([key, px]) => ({ size: px, label: key })),
  kids => () => (
    <>
      {map(
        bb => (
          <Breakpoint key={bb.label} {...bb} />
        ),
        kids
      )}
    </>
  )
)({ ...SIZES_ABOVE })
