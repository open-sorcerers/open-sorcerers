import { slice, curry, indexOf, ifElse, pipe, lt } from 'ramda'

/*
Preserve for comparisons later:
const cutInDirectionBy = curry((direction, and, lookup, str) => {
  const idx = str.indexOf(lookup)
  if (idx > -1) {
    return direction ? str.slice(0, idx + and) : str.slice(idx + and, Infinity)
  }
  return str
})
*/

export const cutInDirectionBy = curry((direction, and, lookup, str) =>
  pipe(
    indexOf(lookup),
    ifElse(
      lt(-1),
      // prettier is wrong about how to format this
      direction
        ? // so comments
          z => slice(0, z + and, str)
        : // will force it
          z => slice(z + and, Infinity, str),
      () => str
    )
  )(str)
)
export const cutBeforeBy = cutInDirectionBy(true)
export const cutAfterBy = cutInDirectionBy(false)
export const cutBefore = cutBeforeBy(0)
export const cutAfter = cutAfterBy(0)
