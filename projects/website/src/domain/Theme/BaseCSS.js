import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'emotion-theming'
import { css, Global } from '@emotion/core'
import { aboveCalc, above } from '@styles/media'
import { easeOut } from '@styles/animation'
import 'typeface-fira-sans'
import 'typeface-fira-code'

import { h3D } from '@styles/mixins'
import { pathOr } from 'ramda'
const grab = pathOr('lime')

const stylesWithTheme = theme => {
  const series = grab(['colors', 'ui', 'series', 'f'], theme)
  const seriesBack = grab(['colors', 'ui', 'series', 'b'], theme)
  const activeSeries = grab(['colors', 'ui', 'series', 'a', 'f'], theme)
  const activeSeriesBack = grab(['colors', 'ui', 'series', 'a', 'b'], theme)
  const comingSoon = grab(['colors', 'cs', 'comingSoon', 'f'], theme)
  const activeAnchor = grab(['colors', 'ui', 'anchor', 'a', 'f'], theme)
  const link = grab(['colors', 'ui', 'link', 'f'], theme)
  const activeLink = grab(['colors', 'ui', 'link', 'a', 'f'], theme)
  const pre = grab(['colors', 'el', 'pre', 'f'], theme)
  const preBack = grab(['colors', 'el', 'pre', 'b'], theme)
  const code = grab(['colors', 'el', 'code', 'f'], theme)
  const codeBack = grab(['colors', 'el', 'code', 'b'], theme)
  const codeBeforeBack = grab(['colors', 'el', 'codeBefore', 'b'], theme)
  const codeBefore = grab(['colors', 'el', 'codeBefore', 'f'], theme)
  const codeComment = grab(['colors', 'el', 'codeJSComment', 'f'], theme)
  const codeConstant = grab(['colors', 'el', 'codeJSConstant', 'f'], theme)
  const codeOperator = grab(['colors', 'el', 'codeJSOperator', 'f'], theme)
  const codeProperty = grab(['colors', 'el', 'codeJSProperty', 'f'], theme)
  const codeString = grab(['colors', 'el', 'codeJSString', 'f'], theme)
  const codeLineNumber = grab(['colors', 'el', 'codeJSLineNumber', 'f'], theme)
  const codeParameter = grab(['colors', 'el', 'codeJSParameter', 'f'], theme)
  const codeEntity = grab(['colors', 'el', 'codeJSEntity', 'f'], theme)
  const blockquote = grab(['colors', 'el', 'blockquote', 'f'], theme)
  const body = grab(['colors', 'el', 'body', 'f'], theme)
  const bodyBack = grab(['colors', 'el', 'body', 'b'], theme)
  const footerBack = grab(['colors', 'cs', 'footer', 'b'], theme)
  return css`
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
  .coming-soon {
    cursor: not-allowed;
    position: relative;
    &::after {
      display: none;
      position: absolute;
      width: 2rem;
      top: 0.75rem;
      right: 1rem;
      content: 'Coming Soon!';
      font-size: 0.5rem;
      line-height: 0.8rem;
      font-weight: 500;
      font-family: obviously-narrow, 'Obviously', sans-serif;
      ${above.SMALL_PHONE(`
         display: inline-block;
      `)}
      ${above.TABLET_PORTRAIT(`
        font-size: 0.75rem;
        right: 2rem;
        top: 0.75rem;
      `)}
    }
  }
  .series-page,
  .verb-page {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
      text-align: center;
    }
    ol li p,
    ul li p {
      text-align: left;
    }
  }
  #core-tenets-block {
    ol,
    p,
    ul {
      max-width: 50rem;
      margin: 0 auto;
    }
    ol {
      margin: 2rem auto;
    }
  }
  #series-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  #cta-series-fp,
  #cta-series-oss {
    width: calc(50% - 1rem);
    max-width: 20rem;
    height: 4rem;
    font-size: 3rem;
    font-family: obviously, 'Obviously', sans-serif;
    font-weight: 900;
    line-height: 3rem;
    margin: 0.5rem;
    margin-bottom: 2rem;
    display: inline-block;
    border: 2px solid ${series};
    color: ${series}; 
    background: ${seriesBack};
    text-align: center;
    &:hover {
      border: 2px solid ${activeSeries};
      color: ${activeSeries};
      background-color: ${activeSeriesBack};
    }
    &.coming-soon {
      color: ${comingSoon};
      border: 2px solid ${comingSoon}
      &::after {
        display: none;
        ${above.TABLET_PORTRAIT(`
          display: inline-block;
          top: 1rem;
          right: 2rem;
        `)}
        ${above.SUB_TABLET(`
          right: 3rem;
        `)}
      }
    }
  }
  #open-sorcerers {
    ${aboveCalc.TINY_PHONE(
      '4rem',
      `
      font-size: 3rem;
      margin-bottom: 2rem;
      `
    )}
    ${aboveCalc.SMALL_PHONE(
      '4rem',
      `
      font-size: 4em;
      line-height: 4.35rem;
      margin-bottom: 3rem;
      `
    )}
  }
  #learn,
  #build,
  #talk {
    font-size: 4em;
    line-height: 4.35rem;
  }

  a.anchor.before {
    svg {
      fill: ${activeAnchor};
    }
  }
  .listing-page {
    text-align: center;
    a {
      font-family: obviously, 'Obviously', sans-serif;
      font-weight: 900;
      text-transform: uppercase;
      font-size: 2rem;
      line-height: 2rem;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      list-style: none;
      padding: 0;
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
    color: ${link};
    display: inline-block;
    padding: 0 0.1em;
    vertical-align: baseline;
    transition: ${easeOut('0.3s', ['color'])};
    &:hover {
      color: ${activeLink};
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
    background-color: ${preBack};
    color: ${pre};
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
      background-color: ${codeBeforeBack};
      color: ${codeBefore};
    }
    .line-numbers-rows {
      top: 0.75rem;
      width: 1.5rem !important;
      left: 1rem !important;
    }
  }
  pre[class*='language-'].line-numbers {
    position: relative;
    padding-left: 3rem;
  }
  .language-js {
    .token {
      &.keyword {
        color: ${codeProperty};
      }
      &.function {
        color: ${codeEntity};
      }
      &.string {
        color: ${codeString};
      }
      &.comment {
        color: ${codeComment};
      }
      &.operator {
        color: ${codeOperator};
      }
      &.punctuation {
        color: ${codeConstant};
      }
      &.parameter {
        color: ${codeParameter};
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
        background-color: ${codeConstant};
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
      background-color: ${codeBack};
      color: ${code};
      padding: 0.5rem;
    }
    td.js-line-number::before {
      content: attr(data-line-number);
      padding: 0 0.5rem;
      color: ${codeLineNumber};
    }
  }
  .pl-smi {
    color: ${codeProperty};
  }
  .pl-en {
    color: ${codeEntity};
  }
  .pl-s {
    color: ${codeString};
  }
  .pl-c {
    color: ${codeComment};
  }
  .pl-k {
    color: ${codeOperator};
  }
  .pl-c1 {
    color: ${codeConstant};
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
    code {
      font-family: 'Fira Code', monospace;
      text-transform: initial;
    }
    a {
      font-family: obviously, 'Obviously', sans-serif;
      font-weight: 900;
    }
    &.three-d {
      font-family: obviously, 'Obviously', sans-serif;
      font-weight: 900;
      ${h3D({})}
    }
  }
  h1 {
    font-family: obviously, 'Obviously', sans-serif;
    font-size: 2.3rem;
    line-height: 2.3rem;
    font-weight: 900;
    &:first-of-type {
      ${h3D({})}
      margin-bottom: 2rem;
      ${above.TABLET_PORTRAIT(`
        margin-top: 2rem;
      `)}
    }
  }
  h1 {
    ${above.TABLET_PORTRAIT(`
      font-size: 3rem;
      line-height: 3.3rem;
    `)}
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
    border-left: 0.25rem solid ${blockquote};
  }
  blockquote.one-liner {
    padding: 0.5rem;
    background-color: ${codeBack};
    color: ${code};
    &::before {
      vertical-align: text-top;
      content: '';
      display: inline-block;
      width: 0;
      height: 0;
      border: 0.6rem solid transparent;
      border-left-color: ${blockquote};
    }
    p {
      margin: 0;
      display: inline-block;
    }
  }

  body {
    background: ${bodyBack};
    border-bottom: 1px solid ${footerBack};
    color: ${body};
  }
`
}
export const BaseCSS = ({ theme }) => <Global styles={stylesWithTheme(theme)} />
BaseCSS.propTypes = { theme: PropTypes.object }
