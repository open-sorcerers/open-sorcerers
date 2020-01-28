import { css } from '@emotion/core'
import { newui, el, cs, named } from './colors'

const theme = {
  colors: { ui: newui, el, cs, named },
  fonts: {
    firaCode: css`
      font-family: 'Fira Code', Courier, monospace;
      font-weight: 400;
    `,
    firaSans: css`
      font-family: 'Fira Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    `,
    obviously: css`
      font-family: obviously, 'Obviously', sans-serif;
      text-transform: uppercase;
      font-weight: 900;
    `,
    obviouslyNarrow: css`
      font-family: obviously-narrow, 'Obviously', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      text-transform: uppercase;
      font-weight: 500;
    `
  }
}

export default theme
