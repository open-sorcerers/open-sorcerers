import { curry, ifElse, propEq } from 'ramda'

export const vary = curry(([aa, bb], props) =>
  ifElse(
    propEq('variant', 'left'),
    () => bb,
    () => aa
  )(props)
)
