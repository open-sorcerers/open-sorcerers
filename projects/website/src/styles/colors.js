import { mergeRight } from 'ramda'
const transparent = 'transparent'
const offBlack = `#292828`
const darkGray = `#222`
const bondiBlue = `#0ff`
const lightGray = '#a0aba6'
const midGray = '#585255'
const c204 = '#204'
const hotpink = '#f06'
const hotMustard = `#fc0`

// 🥰 jxnblk
const forestgreen = `#277940`
const darkerGray = `#202020`

const seriousBlue = `#003690`
const offMauve = `#958378`

const purpGray = `#454a5b`
const mutedMustard = `#b4924c`

const berlinWinter = `#a2aeb3`
const winterMud = `#63534c`

const c31x3 = `#313131`
const somberRain = `#2d7ad9`

const chiquita = `#ceef54`
const royalPurp = `#3716ab`

const burntUmber = `#6b4016`
const lilac = `#96bce2`

const gatorSkin = `#4a7026`
const dankPurp = `#20005a`

const laserPink = `#ca10c3`
const c29x3 = `#292929`

const poshYellow = `#dfbb59`
const composedBlue = `#1b41a8`

const futurePink = `#e7c9d8`
const armyGreen = `#193225`

const chemicalSpill = `#8d8801`
const resilientGray = `#3b394f`

const muscle = `#c0e7e7`
const bone = `#421413`

// named color constants
const yellow = 'yellow'
const cyan = 'cyan'
const lime = 'lime'
const aliceblue = `aliceblue`
const goldenrod = 'goldenrod'
const cadetblue = 'cadetblue'
const lemonchiffon = 'lemonchiffon'

// relative colors
const white = `aliceblue`
const red = `#c00`
const purple = `#409`

/*
const primary = c204
const secondary = white
const tertiary = hotpink
const quaternary = darkGray
*/

const DEFAULT_PALETTE = {
  primary: c204,
  secondary: aliceblue,
  tertiary: hotpink,
  quaternary: darkGray
}
const PALETTES = [
  DEFAULT_PALETTE,
  {
    primary: resilientGray,
    secondary: chemicalSpill,
    tertiary: mutedMustard,
    quaternary: c29x3
  },
  {
    primary: burntUmber,
    secondary: lilac,
    tertiary: muscle,
    quaternary: bone
  }
]

/* const PALETTE = Object.freeze(WORKING_PALETTE) */
const ref = PALETTES[0]
const PALETTE = Object.freeze(ref)
const { primary, secondary, tertiary, quaternary } = PALETTE

export const debug = lime
const placeholder = white

const WORKING_PALETTE = {
  primary,
  secondary,
  tertiary,
  quaternary
}

// elements

const GIST = Object.freeze({
  constant: '#fc0',
  comment: '#328e93',
  operator: 'crimson',
  property: 'cyan',
  string: '#01ec7e',
  entity: 'mediumorchid',
  lineNumber: '#a699b4',
  parameter: lemonchiffon
})

// state

// Let's make our colors follow patterns!
// [fore, back, activeFore = fore, activeBack = back]

const colorable = ([
  foreground = `inherit`,
  background = `inherit`,
  activeForeground = foreground,
  activeBackground = background
]) => ({
  f: foreground,
  b: background,
  a: { f: activeForeground, b: activeBackground }
})

const $ = `inherit`

// interactive elements
const ui = Object.freeze({
  link: colorable([tertiary, $, primary, $]),
  active: tertiary,
  menuButton: colorable([tertiary]),
  cog: mergeRight(colorable([quaternary]), {
    above: { midTablet: colorable([secondary, $, quaternary]) }
  }),
  cog2: mergeRight(colorable([tertiary, $, primary]), { stroke: { a: { f: primary } } }),
  reveal: colorable([secondary, tertiary, tertiary, secondary])
})

// elements
const el = Object.freeze({
  body: colorable([offBlack, secondary]),
  blockquote: colorable([secondary]),
  code: mergeRight(colorable([secondary, '#409']), {
    js: {
      constant: '#fc0',
      comment: '#328e93',
      operator: 'crimson',
      property: 'cyan',
      string: '#01ec7e',
      entity: 'mediumorchid',
      lineNumber: '#a699b4',
      parameter: 'white'
    }
  }),
  pre: colorable([secondary, primary])
})

// custom elements
const area = Object.freeze({
  // top nav
  brand: colorable([secondary]),
  nav: mergeRight(colorable([secondary, primary]), {
    inactive: { above: { tabletPortrait: colorable([primary]) } }
  }),
  navItem: colorable([secondary, $, tertiary]),
  menu: colorable([$, quaternary]),

  // middle content
  content: colorable([offBlack, secondary]),

  // footer
  footer: mergeRight(colorable([secondary, quaternary]), {
    link: colorable([secondary]),
    hidden: {
      date: colorable([hotMustard]),
      environment: colorable([cyan]),
      brain: { textShadow: ['magenta', 'yellow', 'white'] }
    }
  }),

  // everything else
  badge: colorable([secondary, primary]),
  post: {
    header: {
      link: colorable([quaternary, $, tertiary])
    },
    footer: colorable([secondary, primary])
  },
  writing: {
    post: colorable([primary])
  },
  breakpoint: colorable([offBlack, debug]),
  contributor: mergeRight(colorable([`cyan`, offBlack]), {
    link: colorable([secondary, $, hotMustard]),
    img: colorable([hotMustard, transparent])
  }),
  pkg: colorable([hotMustard, el.code.b])
})

const named = Object.freeze({
  debug,
  transparent
})

export { ui, el, area, named }
