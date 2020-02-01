import { curry, toPairs, map, is, pipe } from "ramda"
import { fork, Future as F } from "fluture"
import { convert } from "./format"
import { engrave } from "./engraved"
import { renderJS } from "./render"

export const custom = curry((config, xx) => {
  let isCancelled = false
  const cancel = () => {
    isCancelled = true
  }
  const consumption = initialThing =>
    new F((bad, good) => {
      const known = []
      const routes = []
      const consume = (thing, pathing) =>
        pipe(
          toPairs,
          map(([w, x]) => {
            /* istanbul ignore next */
            if (isCancelled) return
            const y = convert(x)
            const toHere = pathing.concat(w)
            if (is(String, x)) {
              if (y !== "" && w !== "name") {
                known.push(y)
                routes.push([toHere, "$" + y])
              }
            } else {
              consume(x, toHere)
            }
          })
        )(thing)
      try {
        pipe(
          () => consume(initialThing, []),
          () => {
            setTimeout(() => good({ initial: initialThing, known, routes }), 1)
          }
        )()
        return cancel
      } catch (e) {
        bad(e)
        return cancel
      }
    })

  return new F((bad, good) => {
    try {
      if (!xx || typeof xx !== "object") {
        bad(new Error("engraved - expected to be given an object as an input"))
      } else {
        pipe(consumption, renderJS(engrave, config), yy => fork(bad)(good)(yy))(
          xx
        )
      }
      return cancel
    } catch (e) {
      /* istanbul ignore next */
      bad(e)
      /* istanbul ignore next */
      return cancel
    }
  })
})
export const engraved = custom({ flatten: true })
