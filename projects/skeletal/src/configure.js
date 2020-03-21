import { chain, curry, propOr, map, identity as I, ifElse, pathOr } from "ramda"
import { Future } from "fluture"
import { futurizeWithCancel } from "ensorcel"
import { trace } from "xtrace"
import { pipe, austereStack } from "./utils"
import { STRINGS } from "./constants"

const { NO_CONFIG } = STRINGS

export const configure = curry((state, ligament, xxx) => {
  const cancel = propOr(I, "cancel", ligament || {})
  const pass = curry((bad, good, input) =>
    pipe(
      propOr(() => ({ [NO_CONFIG]: true }), "config"),
      fn => lig => {
        try {
          return fn(lig)
        } catch (e) {
          pipe(austereStack, bad)(e)
        }
      },
      z => {
        try {
          const out = z(ligament)
          const result = out && out[NO_CONFIG] ? out : state.patterns
          return result
        } catch (e) {
          pipe(austereStack, bad)(e)
        }
      },
      good
    )(input)
  )
  return chain(
    yyy =>
      new Future((bad, good) => {
        pass(bad, good, yyy)
        return cancel
      }),
    xxx
  )
})

export const cosmicConfigurate = curry((state, boneUI, ligament, cosmic) => {
  const cancel = propOr(I, "cancel", ligament)
  console.log("COSMISISISISIS", cosmic)
  const futurize = futurizeWithCancel(cancel)
  const cosmicLoad = futurize(1, cosmic.load)
  const cosmicSearch = futurize(0, cosmic.search)
  return pipe(
    trace("inputtttt"),
    ifElse(
      pathOr(false, ["config", "configFile"]),
      cosmicLoad,
      () => console.log("searching...") || cosmicSearch()
    ),
    configure(state, ligament),
    trace("out...")
  )(ligament)
})
