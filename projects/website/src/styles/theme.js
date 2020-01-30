import ui from './theme-ui'
import cs from './theme-cs'
import el from './theme-el'

const makeTheme = palette => {
  return {
    colors: { ui: ui(palette), el: el(palette), cs: cs(palette) },
    fonts: {
      firaCode: `
      font-family: 'Fira Code', Courier, monospace;
      font-weight: 400;
    `,
      firaSans: `
      font-family: 'Fira Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    `,
      obviously: `
      font-family: obviously, 'Obviously', sans-serif;
      text-transform: uppercase;
      font-weight: 900;
    `,
      obviouslyNarrow: `
      font-family: obviously-narrow, 'Obviously', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      text-transform: uppercase;
      font-weight: 500;
    `
    }
  }
}

export default makeTheme
