import React from 'react'
import { css, Global } from '@emotion/core'

const styles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-family: 'Helvetica Neue', Helvetica, sans-serif;
    font-size: 16px;
    line-height: 24px;
  }

  body {
    background-color: #eff1f3;
    color: #292828;
  }
`
export const BaseCSS = () => <Global styles={styles} />
