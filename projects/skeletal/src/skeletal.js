import {
  __ as $,
  apply,
  curry,
  pipe,
  ifElse,
  identity as I,
  always as K,
  unless,
  map,
  filter,
  join,
  split,
  reduce,
  is,
  propOr,
  pathOr
} from "ramda"
import { trace } from "xtrace"
import { Future as F, fork as rawFork } from "fluture"
import { tacit, futurizeWithCancel } from "ensorcel"
import { compile } from "handlebars"
import { cosmiconfig } from "cosmiconfig"

export const fork = tacit(2, rawFork)

export const cosmicConfigurate = curry((ligament, cancel, conf) => {
  const futurize = futurizeWithCancel(cancel)
  const cosmicLoad = futurize(1, conf.load)
  const cosmicSearch = futurize(0, conf.search)

  return pipe(
    z => z || {},
    ifElse(propOr(false, "configFile"), cosmicLoad, () => cosmicSearch()),
    map(pipe(propOr(I, "config"), z => z(ligament)))
  )(conf)
})

export const skeletal = config => {
  let isCancelled = false
  const cancel = () => {
    isCancelled = true
  }
  const ligament = { cancel, isCancelled, pattern: config.pattern || I }
  const run = unless(() => isCancelled)
  return pipe(
    propOr("skeletal", "namespace"),
    cosmiconfig,
    run(cosmicConfigurate(ligament, cancel))
  )(config)
}
