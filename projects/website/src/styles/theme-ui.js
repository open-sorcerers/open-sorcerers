import { pipe, map } from 'ramda'
/* import { trace } from 'xtrace' */
import { lighten } from 'polished'
import { activeColor } from '@styles/utils'
import { $, transparent, cardinalRed } from '@styles/colors'

export const ui = ({ primary, secondary, tertiary, quaternary }) =>
  pipe(
    map(activeColor),
    Object.freeze
  )({
    picker: [primary, transparent, secondary, primary],
    anchor: [transparent, $, tertiary, $],
    brand: [secondary, $, tertiary, $],
    button: [secondary, tertiary, primary, secondary],
    cog: [quaternary],
    cogOverMidTablet: [secondary, $, tertiary],
    cog2: [tertiary, $, primary],
    cog2Stroke: [tertiary, $, primary],
    colophon: [tertiary, transparent, primary, transparent],
    contributor: [lighten(1 / 10, tertiary), $, lighten(2 / 10, tertiary)],
    footer: [tertiary, $, lighten(1 / 10, tertiary)],
    link: [tertiary, $, primary, $],
    logout: [primary, cardinalRed, cardinalRed, primary],
    menu: [primary, $, tertiary, $],
    menuButton: [tertiary, $, 'black'],
    navInactiveAboveTabletPortrait: [primary],
    navButton: [secondary, $, tertiary],
    postGlossary: [secondary, tertiary, tertiary, transparent],
    postHeader: [quaternary, $, tertiary],
    postModule: [secondary, tertiary, primary, transparent],
    reveal: [secondary, tertiary, tertiary, secondary],
    series: [primary, secondary, tertiary, primary]
  })

export default ui
