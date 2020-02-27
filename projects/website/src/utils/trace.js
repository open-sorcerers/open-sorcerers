import { curry } from 'ramda'

export const colorTrace = curry((color, a, b) => {
  console.log(`%s${color}`, a, b)
  return b
})
