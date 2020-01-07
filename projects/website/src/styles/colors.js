export const transparent = 'transparent'
export const offBlack = `#292828`
export const darkGray = `#222`
export const bondiBlue = `#0ff`
export const lightGray = '#a0aba6'
export const midGray = '#585255'
export const c204 = '#204'
export const hotpink = '#f06'

// named color constants
export const yellow = 'yellow'
export const lime = 'lime'
export const aliceblue = `aliceblue`
export const goldenrod = 'goldenrod'
export const cadetblue = 'cadetblue'
export const lemonchiffon = 'lemonchiffon'

// relative colors
export const white = `aliceblue`
export const red = `#c00`
export const purple = `#409`

/*
export const primary = c204
export const secondary = white
export const tertiary = hotpink
export const quaternary = darkGray
*/

export const DEFAULT_PALETTE = {
  primary: c204,
  secondary: aliceblue,
  tertiary: hotpink,
  quaternary: darkGray
}
export const PALETTES = [
  DEFAULT_PALETTE,
  {
    primary: lightGray,
    secondary: cadetblue,
    tertiary: goldenrod,
    quaternary: cadetblue
  }
]

/* export const PALETTE = Object.freeze(WORKING_PALETTE) */
const ref = PALETTES[0]
export const PALETTE = Object.freeze(ref)
export const { primary, secondary, tertiary, quaternary } = PALETTE

export const debug = lime
export const placeholder = white

export const WORKING_PALETTE = {
  primary,
  secondary,
  tertiary,
  quaternary
}

// elements
export const EL = Object.freeze({
  CODE: secondary,
  CODE_BG: '#409',
  PRE: secondary,
  PRE_BG: primary
})

export const GIST = Object.freeze({
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
export const UI = Object.freeze({
  link: tertiary,
  linkActive: primary,
  active: tertiary
})

export const state = UI

// page areas
export const AREA = Object.freeze({
  NAV: primary,
  MENU: quaternary,
  CONTENT_BG: secondary,
  CONTENT: offBlack,
  FOOTER: quaternary
})
