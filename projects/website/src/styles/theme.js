import { memoizeWith, identity as I } from 'ramda'

import ui from './theme-ui'
import cs from './theme-cs'
import el from './theme-el'
/*
const hex3 = /[a-f0-9]{3}/
const hex6 = /[a-f0-9]{6}/

const testHex = z => ((z.length === 3 || z.length === 6) && hex3.test(z)) || hex6.test(z)
const constantColor = z => {
  const isHex = testHex(z)
  const v = isHex ? `'#${z}'` : `'${z}'`
  return `const $${z} = ${v}`
}
const makeThemeWalker = () => {
  let known = []
  let routes = []
  let consumed = {}
  const convert = x =>
    x && x[0] !== '#' ? (x && x.includes && !x.includes('(') ? x : '') : x.slice(1)
  const consume = (thing, pathing = []) =>
    pipe(
      toPairs,
      map(([w, x]) => {
        if (pathing.length === 0) consumed = thing
        const y = convert(x)
        const skip = y === '' || known.includes(y)
        if (is(String, x)) {
          if (y !== '' && w !== 'name') {
            known.push(y)
            routes.push([pathing.concat(w), '$' + y])
          }
        } else {
          consume(x, pathing.concat(w))
        }
      })
    )(thing)
  const wipe = x => {
    known = []
    routes = []
    consumed = {}
    return x
  }
  const sliceify = zzz => {
    const lookup = zzz.indexOf('"$')
    if (lookup === -1) return zzz
    const yyy = zzz.substr(0, lookup) + zzz.substr(lookup + 1)
    return yyy.replace(/"/g, '')
  }
  return {
    consume,
    get: () =>
      uniq(known.filter(I))
        .sort()
        .map(constantColor)
        .join('\n') +
      '\n\nexport default Object.freeze(' +
      pipe(
        reduce((prev, [route, val]) => assocPath(route, val, prev), consumed),
        z =>
          JSON.stringify(z, null, 2)
            .split('\n')
            .map(sliceify)
            .join('\n')
      )(routes.sort()) +
      ')'
  }
}
*/

const makeTheme = memoizeWith(I, (name, c1, c2, c3, c4) => {
  const palette = { name, primary: c1, secondary: c2, tertiary: c3, quaternary: c4 }
  const colors = {
    name: palette.name,
    ui: ui(c1, c2, c3, c4),
    el: el(c1, c2, c3, c4),
    cs: cs(c1, c2, c3, c4)
  }
  // TODO: stop doing this shortly
  /* const { consume, get, themify } = makeThemeWalker() */
  /* consume(colors) */
  /* setTimeout(() => console.log('get!', get()), 5e3) */
  /* const trace = colorTrace('color: #c00') */
  /* trace(name, JSON.stringify(colors, null, 2)) */
  /* const engravedF = engraved(colors) */
  /* setTimeout(() => fork(console.warn)(console.log)(engravedF), 1) */
  return {
    colors,
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
})

export default makeTheme
