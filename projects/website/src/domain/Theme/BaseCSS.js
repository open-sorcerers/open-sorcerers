import React from 'react'
import { css, Global } from '@emotion/core'
import * as ℂ from '@styles/colors'
import { easeOut } from '@styles/animation'
import 'typeface-fira-sans'
import 'typeface-fira-code'

const styles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-family: 'Fira Sans', sans-serif;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: antialiased;
    font-weight: 400;
    /* stylelint-disable-next-line */
    font-size: 16px;
    line-height: 1.5rem;
  }
  .listing-page {
    font-size: 3em;
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      list-style: none;
      padding: 0;
      a {
        font-family: obviously, sans-serif;
        font-weight: 900;
        text-transform: uppercase;
        font-size: 3rem;
        line-height: 3rem;
      }
      a.strikethrough {
        text-decoration: 16px line-through solid black;
        cursor: not-allowed;
        text-shadow: 0 0 0 transparent;
        :hover {
          color: ${ℂ.UI.link};
        }
      }
    }
  }

  a {
    text-decoration: none;
    font-family: 'Obviously Narrow', obviously-narrow, 'Helvetica Neue', Helvetica, sans-serif;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 1.1rem;
    color: ${ℂ.UI.link};
    display: inline-block;
    padding: 0 0.1em;
    vertical-align: baseline;
    transition: ${easeOut('0.3s', ['color', 'text-shadow'])};
    &:hover {
      color: ${ℂ.UI.linkActive};
      text-shadow: 0 0 0.75rem ${ℂ.UI.active};
    }
  }
  em {
    font-variant: italic;
  }
  code,
  pre {
    font-family: 'Fira Code', Courier, monospace;
    font-weight: 400;
  }
  pre {
    font-size: 1.2rem;
    background-color: ${ℂ.EL.PRE_BG};
    color: ${ℂ.EL.PRE};
    padding: 0.75rem 0.5rem;
    position: relative;
    code {
      position: relative;
      &.language-js {
        &::before {
          font-size: 0.8rem;
          width: 1.6rem;
          height: 1.6rem;
          text-align: right;
          content: 'JS';
          position: absolute;
          left: -2.75rem;
          top: -0.65rem;
          padding-top: 0.3rem;
          padding-left: 0.2rem;
          padding-right: 0.2rem;
          vertical-align: bottom;
          background-color: ${ℂ.EL.CODE_BG};
          color: ${ℂ.EL.CODE};
        }
      }
    }
  }

  ul,
  ol {
    padding-left: 1rem;
    li {
      display: list-item;
      margin: 1rem auto;
    }
  }

  p {
    margin: 1.5rem auto;
    font-size: 1.1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0.5rem auto;
    line-height: 2rem;
    margin-top: 1rem;
    font-family: 'Obviously Narrow', obviously-narrow, sans-serif;
    font-weight: 500;
    text-transform: uppercase;
    font-style: italic;
  }
  h1 {
    font-family: 'Obviously', obviously, sans-serif;
    font-size: 3rem;
    line-height: 3rem;
  }
  h2 {
    font-size: 2em;
  }
  h3 {
    font-size: 1.8em;
  }
  h4 {
    font-size: 1.6em;
  }
  h5 {
    font-size: 1.4em;
  }
  h6 {
    font-size: 1.2em;
  }

  body {
    background-color: ${ℂ.AREA.CONTENT_BG};
    color: ${ℂ.AREA.CONTENT};
  }
`
export const BaseCSS = () => <Global styles={styles} />
