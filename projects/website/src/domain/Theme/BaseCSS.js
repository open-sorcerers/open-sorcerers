import React from 'react'
import { curry, pipe, range, map } from 'ramda'
import { css, Global } from '@emotion/core'
import * as ℂ from '@styles/colors'
import { easeOut } from '@styles/animation'
import { above, aboveCalc } from '@styles/media'
import 'typeface-fira-sans'
import 'typeface-fira-code'

const sh = curry((cl, xx, yy) => `${xx}px ${yy}px 0 ${cl}`)

const surface = curry((edge, start, end) => pipe(range(start), map(edge))(end))

const h3D = ({
  color = ℂ.area.h3d.f,
  edge = ℂ.area.h3d.s[0],
  shadow: dropShade = ℂ.area.h3d.s[1],
  shadowY: y = -2,
  size = 6,
  and = ''
}) => `
  text-align: center;
  transition: letter-spacing 0.1s ease-out, text-shadow 0.3s ease-out, font-size 0.3s ease-out;
  color: ${color};
  font-weight: 900;
  a {
    color: ${color};
  }
  ${aboveCalc.TINY_PHONE('2rem')(
    `
    letter-spacing: 0.38rem;

    text-shadow: ${[
      `0 0 0 ${color}`,
      ...surface(z => sh(edge, z, z), 0, size),
      ...surface(z => sh(dropShade, -z + (size + y), z + size), 0, size + y)
    ].join(', ')};
    line-height: 3.3rem;
    ${and}
  `
  )}
`

const h3DBig = () => h3D({ size: 5, and: `letter-spacing: 0.7rem` })

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
  /*
  #cta-learn,
  #cta-build,
  #cta-talk {
    ${h3DBig()}
    font-size: 4em;
    line-height: 4.35rem;
    margin-bottom: 3rem;
  }
  */
  a.anchor.before {
    svg {
      fill: ${ℂ.ui.anchor.a.f};
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

      a.strikethrough {
        text-decoration: line-through solid rgba(0, 0, 0, 0.6);
        cursor: not-allowed;
        :hover {
          color: ${ℂ.ui.link.f};
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
    color: ${ℂ.ui.link.f};
    display: inline-block;
    padding: 0 0.1em;
    vertical-align: baseline;
    transition: ${easeOut('0.3s', ['color'])};
    &:hover {
      color: ${ℂ.ui.link.a.f};
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
    background-color: ${ℂ.el.pre.b};
    color: ${ℂ.el.pre.f};
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
      background-color: ${ℂ.el.code.before.b};
      color: ${ℂ.el.code.before.f};
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
        color: ${ℂ.el.code.js.property};
      }
      &.function {
        color: ${ℂ.el.code.js.entity};
      }
      &.string {
        color: ${ℂ.el.code.js.string};
      }
      &.comment {
        color: ${ℂ.el.code.js.comment};
      }
      &.operator {
        color: ${ℂ.el.code.js.operator};
      }
      &.punctuation {
        color: ${ℂ.el.code.js.constant};
      }
      &.parameter {
        color: ${ℂ.el.code.js.parameter};
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
        background-color: ${ℂ.el.code.js.constant};
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
      background-color: ${ℂ.el.code.b};
      color: ${ℂ.el.code.f};
      padding: 0.5rem;
    }
    td.js-line-number::before {
      content: attr(data-line-number);
      padding: 0 0.5rem;
      color: ${ℂ.el.code.js.lineNumber};
    }
  }
  .pl-smi {
    color: ${ℂ.el.code.js.property};
  }
  .pl-en {
    color: ${ℂ.el.code.js.entity};
  }
  .pl-s {
    color: ${ℂ.el.code.js.string};
  }
  .pl-c {
    color: ${ℂ.el.code.js.comment};
  }
  .pl-k {
    color: ${ℂ.el.code.js.operator};
  }
  .pl-c1 {
    color: ${ℂ.el.code.js.constant};
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
    &.three-d {
      font-family: obviously, 'Obviously', sans-serif;
      font-weight: 900;
      ${h3D({})}
      a {
        font-family: obviously, 'Obviously', sans-serif;
        font-weight: 900;
      }
    }
  }
  h1 {
    font-family: obviously, 'Obviously', sans-serif;
    font-size: 2.3rem;
    line-height: 2.3rem;
    font-weight: 900;
    &:first-of-type {
      ${h3D({})}
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
    border-left: 0.25rem solid ${ℂ.el.blockquote.f};
  }
  blockquote.one-liner {
    padding: 0.5rem;
    background-color: ${ℂ.el.code.b};
    color: ${ℂ.el.code.f};
    &::before {
      vertical-align: text-top;
      content: '';
      display: inline-block;
      width: 0;
      height: 0;
      border: 0.6rem solid transparent;
      border-left-color: ${ℂ.el.blockquote.f};
    }
    p {
      margin: 0;
      display: inline-block;
    }
  }

  body {
    background: ${ℂ.el.body.b};
    color: ${ℂ.el.body.f};
  }
`
export const BaseCSS = () => <Global styles={styles} />
