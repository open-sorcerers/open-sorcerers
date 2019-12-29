import React from 'react'
import { css, Global } from '@emotion/core'
import { primary, secondary } from '@styles/colors'

const styles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-family: obviously-narrow, sans-serif;
    text-rendering: optimizeLegibility;
    font-smooth: antialiased;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: antialiased;
    font-weight: 500;
    font-size: 16px;
    line-height: 1.5rem;
  }

  a {
    text-decoration: none;
    text-transform: uppercase;
    font-family: obviously;
    font-size: 1.5rem;
    font-weight: 900;
    font-style: italic;
    color: ${primary};
    display: inline-block;
    padding: 0 0.1em;
    vertical-align: baseline;
    transition: color 0.1s ease-out, text-shadow 0.3s ease-out;
    &:hover {
      color: #f06;
      text-shadow: 0 0 10px yellow;
    }
  }
  em {
    font-variant: italic;
    font-size: 1.5rem;
  }
  code,
  pre {
    font-size: 1.2rem;
    font-family: 'Fira Code', mono;
    font-weight: 400;
    margin: 0 0.25rem;
  }
  pre {
    background-color: ${primary};
    color: ${secondary};
    padding: 0.75rem 0.5rem;
    position: relative;
    code {
      position: relative;
      &.language-js {
        &:before {
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
          background-color: #205;
          color: ${secondary};
        }
      }
    }
  }

  ul,
  ol {
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
    font-family: obviously, sans-serif;
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
