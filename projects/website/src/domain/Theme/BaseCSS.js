import React from 'react'
import { css, Global } from '@emotion/core'

const styles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-family: 'Obviously', sans-serif;
    font-weight: 300;
    text-transform: uppercase;
    font-size: 16px;
    line-height: 24px;
  }

  code,
  pre {
    font-family: 'Fira Code';
    font-weight: 600;
  }

  p {
    margin: 0.5rem auto;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0.5rem auto;
    margin-top: 1rem;
    font-family: Obviously, sans-serif;
    font-weight: 900;
    text-transform: uppercase;
    font-style: italic;
  }

  body {
    background-color: #eff1f3;
    color: #292828;
  }
`
export const BaseCSS = () => <Global styles={styles} />
