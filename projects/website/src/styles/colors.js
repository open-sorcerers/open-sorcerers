export const transparent = 'transparent'
export const red = `#c00`
export const white = `aliceblue`
export const offBlack = `#292828`
export const purple = `#409`
export const darkGray = `#222`
export const darkerGray = `#205`
export const yellow = '#fc0'
export const lime = 'lime'

export const primary = purple
export const secondary = white
export const tertiary = yellow
export const quaternary = darkGray

// debug

export const debug = lime
export const placeholder = white

export const THEME = Object.freeze({
  primary,
  secondary,
  tertiary,
  quaternary
})

// elements
export const EL = Object.freeze({
  CODE: secondary,
  CODE_BG: darkerGray,
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
