import { mergeRight, map } from 'ramda'
import { darken, lighten, mix } from 'polished'

const evenMix = mix(5 / 10)
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
    primary: bone,
    secondary: muscle,
    tertiary: resilientGray,
    quaternary: chemicalSpill
  },
  {
    primary: berlinWinter,
    secondary: darken(3 / 10, laserPink), // composedBlue, // armyGreen,
    tertiary: evenMix(hotMustard, armyGreen),
    quaternary: '#1b202b' // winterMud
  }
]

/* const PALETTE = Object.freeze(WORKING_PALETTE) */
const ref = PALETTES[3]
const PALETTE = Object.freeze(ref)
const { primary, secondary, tertiary, quaternary } = PALETTE

export const debug = lime

const $ = `inherit`

// Let's make our colors follow patterns!
const colorable = ([f = $, b = $]) => ({ f, b })

const activeColor = ([f = $, b = $, aF = f, aB = b]) => ({
  f,
  b,
  a: { f: aF, b: aB }
})

// elements
const el = Object.freeze({
  /* body: colorable([primary, secondary]), */
  body: colorable([primary, `linear-gradient(35deg, ${darken(0.05, secondary)}, ${secondary})`]),
  blockquote: colorable([secondary]),
  code: mergeRight(colorable([secondary, tertiary]), {
    /*
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
    */
    js: map(evenMix(secondary))({
      // js: {
      constant: '#fc0',
      comment: '#328e93',
      operator: '#c00',
      property: '#0ff',
      string: '#01ec7e',
      entity: '#ba55d3',
      lineNumber: '#a699b4',
      parameter: c29x3
    })
  }),
  pre: colorable([secondary, primary])
})

// interactive elements
const ui = Object.freeze({
  link: activeColor([tertiary, $, primary, $]),
  menuButton: activeColor([tertiary]),
  cog: mergeRight(activeColor([quaternary]), {
    above: { midTablet: activeColor([secondary, $, quaternary]) }
  }),
  cog2: mergeRight(activeColor([tertiary, $, primary]), { stroke: { a: { f: primary } } }),
  reveal: activeColor([secondary, tertiary, tertiary, secondary]),
  navItem: activeColor([secondary, $, tertiary]),
  post: {
    header: {
      link: activeColor([quaternary, $, tertiary])
    },
    glossary: {
      link: activeColor([secondary, mix(7 / 10, tertiary, secondary), tertiary, transparent])
    }
  },
  contributor: {
    link: activeColor([evenMix(tertiary, secondary), $, lighten(1 / 10, tertiary)])
  },
  footer: {
    link: activeColor([tertiary, $, lighten(1 / 10, tertiary)])
  },
  brand: activeColor([secondary, $, tertiary, $]),
  anchor: activeColor([transparent, $, tertiary, $])
})

// custom elements
const area = Object.freeze({
  // top nav
  nav: mergeRight(colorable([secondary, primary]), {
    inactive: { above: { tabletPortrait: colorable([primary]) } }
  }),
  menu: colorable([$, quaternary]),

  h3d: {
    f: lighten(1 / 12, primary),
    b: $,
    s: [tertiary, mix(6 / 10, secondary, '#000')]
  },

  // middle content
  /* content: colorable([primary, `linear-gradient(35deg, ${secondary}, ${darken(0.1, secondary)}`]), */

  // footer
  footer: mergeRight(colorable([primary, quaternary]), {
    hidden: {
      date: colorable([hotMustard]),
      environment: colorable([cyan]),
      brain: { textShadow: ['magenta', 'yellow', 'white'] }
    }
  }),

  // everything else
  badge: colorable([secondary, evenMix(tertiary, secondary)]),
  post: {
    footer: colorable([primary, secondary])
  },
  writing: {
    post: colorable([secondary, primary])
  },
  breakpoint: colorable([offBlack, debug]),
  contributor: mergeRight(colorable([evenMix(tertiary, secondary), '#3c053a']), {
    img: colorable([tertiary, transparent])
  }),
  pkg: colorable([evenMix(hotMustard, secondary), el.code.b])
})

const named = Object.freeze({
  debug,
  transparent
})

export { ui, el, area, named }
