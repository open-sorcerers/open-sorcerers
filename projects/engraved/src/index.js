import { curry, toPairs, map, is, pipe } from "ramda"
import F from "fluture"
import { convert, render } from "./engraved"

export const custom = curry((config, xx) => {
  const { flatten = true } = config
  const known = []
  const routes = []
  let isCancelled = false
  const consume = (thing, pathing = []) =>
    pipe(
      toPairs,
      map(([w, x]) => {
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

  const cancel = () => {
    isCancelled = true
  }

  return new F((bad, good) => {
    try {
      if (!xx || typeof xx !== "object") {
        bad(new Error("engraved - expected to be given an object as an input"))
      } else {
        consume(xx)
        render(flatten, xx, known, routes, good)
      }
      return cancel
    } catch (e) {
      bad(e)
      return cancel
    }
  })
})
export const engraved = custom({})
