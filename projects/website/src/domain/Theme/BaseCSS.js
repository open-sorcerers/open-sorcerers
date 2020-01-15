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
    a {
      font-family: obviously, 'Obviously', sans-serif;
      font-weight: 900;
      text-transform: uppercase;
      font-size: 2rem;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      list-style: none;
      padding: 0;

      a.strikethrough {
        text-decoration: line-through solid rgba(0, 0, 0, 0.6);
        cursor: not-allowed;
        :hover {
          color: ${ℂ.UI.link};
        }
      }
    }
  }
  #glossary {
    h2 {
      margin-top: 2rem;
    }
  }

  a {
    text-decoration: none;
    font-family: obviously-narrow, 'Obviously', 'Helvetica Neue', Helvetica, sans-serif;
    text-transform: uppercase;
    font-weight: 500;
    color: ${ℂ.UI.link};
    display: inline-block;
    padding: 0 0.1em;
    vertical-align: baseline;
    transition: ${easeOut('0.3s', ['color'])};
    &:hover {
      color: ${ℂ.UI.linkActive};
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
    overflow: hidden;
    overflow-x: auto;
    code {
      position: relative;
    }
  }
  .gatsby-highlight {
    position: relative;
    &::before {
      font-size: 0.8rem;
      width: 1.6rem;
      height: 1.6rem;
      text-align: right;
      content: attr(data-language);
      text-transform: uppercase;
      position: absolute;
      left: -2rem;
      padding-top: 0.3rem;
      padding-left: 0.2rem;
      padding-right: 0.2rem;
      vertical-align: bottom;
      background-color: ${ℂ.EL.CODE_BG};
      color: ${ℂ.EL.CODE};
    }
  }
  pre[class*='language-'].line-numbers {
    position: relative;
    padding-left: 3rem;
  }
  .language-js {
    .line-numbers-rows {
      top: 0.75rem;
      width: 1.5rem !important;
      left: 1rem !important;
    }
    .token {
      &.keyword {
        color: ${ℂ.GIST.property};
      }
      &.function {
        color: ${ℂ.GIST.entity};
      }
      &.string {
        color: ${ℂ.GIST.string};
      }
      &.comment {
        color: ${ℂ.GIST.comment};
      }
      &.operator {
        color: ${ℂ.GIST.operator};
      }
      &.punctuation {
        color: ${ℂ.GIST.constant};
      }
      &.parameter {
        color: white;
      }
    }
  }
  .gist-file {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 5rem;
    margin-bottom: 1rem;
    .gist-meta {
      a:first-of-type {
        padding: 0.2rem 0.5rem 0.5rem;
        background-color: ${ℂ.GIST.constant};
        color: black;
        transform: background 0.7s ease-out, color 0.7s ease-out;
        &:hover {
          color: white;
          background-color: black;
        }
      }
    }
    .js-gist-file-update-container {
      display: flex;
      flex-direction: column;
      background-color: ${ℂ.EL.PRE_BG};
      color: ${ℂ.EL.PRE};
      padding: 0.5rem;
    }
    td.js-line-number::before {
      content: attr(data-line-number);
      padding: 0 0.5rem;
      color: ${ℂ.GIST.lineNumber};
    }
    .pl-smi {
      color: ${ℂ.GIST.property};
    }
    .pl-en {
      color: ${ℂ.GIST.entity};
    }
    .pl-s {
      color: ${ℂ.GIST.string};
    }
    .pl-c {
      color: ${ℂ.GIST.comment};
    }
    .pl-k {
      color: ${ℂ.GIST.operator};
    }
    .pl-c1 {
      color: ${ℂ.GIST.constant};
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
    font-family: obviously-narrow, 'Obviously', sans-serif;
    font-weight: 500;
    text-transform: uppercase;
    font-style: italic;
  }
  h1 {
    font-family: obviously, 'Obviously', sans-serif;
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
  blockquote {
    padding-left: 1rem;
    border-left: 0.25rem solid ${ℂ.primary};
  }
  blockquote.one-liner {
    padding: 0.5rem;
    background-color: ${ℂ.quaternary};
    color: ${ℂ.secondary};
    &::before {
      vertical-align: text-top;
      content: '';
      display: inline-block;
      width: 0;
      height: 0;
      border: 0.6rem solid transparent;
      border-left-color: ${ℂ.tertiary};
    }
    p {
      margin: 0;
      display: inline-block;
    }
  }

  body {
    background-color: ${ℂ.AREA.CONTENT_BG};
    color: ${ℂ.AREA.CONTENT};
  }
`
export const BaseCSS = () => <Global styles={styles} />
