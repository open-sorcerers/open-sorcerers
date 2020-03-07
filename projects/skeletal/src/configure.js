import { curry, propOr, pipe, map, identity as I, ifElse, pathOr } from "ramda"
import { futurizeWithCancel } from "ensorcel"
import { austereStack } from "./utils"
/* import { trace } from "xtrace" */
import { STRINGS } from "./constants"

const { NO_CONFIG } = STRINGS

export const configure = curry((state, ligament, xxx) =>
  pipe(
    propOr(() => ({ [NO_CONFIG]: true }), "config"),
    z => {
      try {
        z(ligament)
        return state.patterns
      } catch (err) {
        throw austereStack(err)
      }
    }
  )(xxx)
)

export const cosmicConfigurate = curry((state, boneUI, ligament, cosmic) => {
  const cancel = propOr(I, "cancel", ligament)
  const futurize = futurizeWithCancel(cancel)
  const cosmicLoad = futurize(1, cosmic.load)
  const cosmicSearch = futurize(0, cosmic.search)
  return pipe(
    ifElse(pathOr(false, ["config", "configFile"]), cosmicLoad, () =>
      cosmicSearch()
    ),
    map(configure(state, ligament))
  )(ligament)
})
