export const transparent = 'transparent'
export const red = `#c00`
export const white = `aliceblue`
export const offBlack = `#292828`
export const purple = `#409`
export const darkGray = `#222`
export const yellow = '#ff0'
export const lime = 'lime'
export const bondiBlue = `#0ff`

export const primary = `#204`
export const secondary = white
export const tertiary = '#f06'
export const quaternary = darkGray

// debug

export const debug = lime
export const placeholder = white

export const PALETTE = Object.freeze({
  primary,
  secondary,
  tertiary,
  quaternary
})

const codeBackground = '#444'

// elements
export const EL = Object.freeze({
  CODE: secondary,
  CODE_BG: '#409',
  PRE: secondary,
  PRE_BG: primary
})

// state
export const UI = Object.freeze({
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
