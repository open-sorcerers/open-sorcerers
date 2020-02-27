import { curry, ifElse, propEq } from 'ramda'

export const vary = curry(([aa, bb], props) =>
  ifElse(
    propEq('variant', 'left'),
    () => bb,
    () => aa
  )(props)
)

const $ = 'initial'

// Let's make our colors follow patterns!
export const colorable = ([f = $, b = $]) => ({ f, b })

export const activeColor = ([f = $, b = $, aF = f, aB = b]) => ({
  f,
  b,
  a: { f: aF, b: aB }
})
