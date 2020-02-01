import { filter, identity as I, uniq, join, curry, map, pipe } from "ramda"
import { testHex } from "./predicates"
import { memo } from "./utils"
import { C } from "./constants"

export const constantColor = memo(z => {
  const v = testHex(z) ? `'#${z}'` : `'${z}'`
  return `const $${z} = ${v}`
})

export const namedColors = pipe(filter(I), uniq, map(constantColor), join(C.n))

export const renderJS = curry((engraver, flatten, futureValue) =>
  pipe(
    map(
      ({ known, routes, initial }) =>
        namedColors(known) +
        "\n\nexport default Object.freeze(" +
        engraver(flatten, initial, routes) +
        ")"
    )
  )(futureValue)
)

export const unstringJS = memo(zzz => {
  const lookup = zzz.indexOf('"$')
  if (lookup === -1) return zzz
  const yyy = zzz.substr(0, lookup) + zzz.substr(lookup + 1)
  return yyy.replace(/"/g, "")
})
