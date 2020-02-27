import { memoizeWith, identity as I, pipe, map } from 'ramda'
/* import { trace } from 'xtrace' */
import { lighten as ll } from 'polished'
import { activeColor } from '@styles/utils'
import { $, transparent, cardinalRed } from '@styles/colors'

const lighten = memoizeWith(I, ll)

export const ui = memoizeWith(I, (c1, c2, c3, c4) =>
  pipe(
    map(activeColor),
    Object.freeze
  )({
    picker: [c1, transparent, c2, c1],
    anchor: [transparent, $, c3, $],
    brand: [c2, $, c3, $],
    button: [c2, c3, c1, c2],
    cog: [c4],
    cogOverMidTablet: [c2, $, c3],
    cog2: [c3, $, c1],
    cog2Stroke: [c3, $, c1],
    colophon: [c3, transparent, c1, transparent],
    contributor: [lighten(1 / 10, c3), $, lighten(2 / 10, c3)],
    footer: [c3, $, lighten(1 / 10, c3)],
    link: [c3, $, c1, $],
    logout: [c1, cardinalRed, cardinalRed, c1],
    menu: [c1, $, c3, $],
    menuButton: [c3, $, 'black'],
    navInactiveAboveTabletPortrait: [c1],
    navButton: [c2, $, c3],
    postGlossary: [c2, c3, c3, transparent],
    postHeader: [c4, $, c3],
    postModule: [c2, c3, c1, transparent],
    reveal: [c2, c3, c3, c2],
    series: [c1, c2, c3, c1]
  })
)

export default ui
