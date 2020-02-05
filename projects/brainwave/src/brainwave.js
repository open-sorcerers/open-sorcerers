import {
  reduce,
  unless,
  mergeRight,
  when,
  fromPairs,
  toPairs,
  chain,
  ifElse,
  pipe,
  propOr,
  curry,
  map
} from "ramda"
import { Future } from "fluture"
import { trace } from "xtrace"
import { cosmiconfig as cosmic } from "cosmiconfig"
import { j2, smooth, futurizeWithCancel } from "ensorcel"

import { fork, globWithCancel } from "./utils"

import { DR, CC, CF, FT, MC, NS, RT, TK } from "./constants"
import { consumeData } from "./consumers"

const joint = curry((xx, aa, bb) => aa + xx + bb)

export const findBrainsRelativeTo = curry((cancel, basePath, fileTypes) =>
  pipe(
    joint("/**/*.", basePath),
    globWithCancel(cancel),
    chain(consumeData)
  )(fileTypes)
)

const ERRORS = Object.freeze({
  RETURN_A_FUNCTION: "Expected to have brainwave config return a function!",
  TELEPATHY_OR_MIND_CONTROL: `Expected brainwave config to have one or more keys in: [${MC}, ${TK}]`
})

// ;)
const generateNeuralNetwork = curry((bad, xxx) => {
  const cnf = propOr(false, CC, xxx)
  if (!cnf) return bad(new Error(ERRORS.RETURN_A_FUNCTION))
  const memoryPalace = cnf()
  const control = propOr(false, MC, memoryPalace)
  const telepathy = propOr(false, TK, memoryPalace)
  if (!control && !telepathy) {
    return bad(new Error(ERRORS.TELEPATHY_OR_MIND_CONTROL))
  }
  return memoryPalace
})

const runTelepathy = curry(
  ({ isCancelled, cancel }, { control: ct, brains, telepathy: tk }) =>
    new Future((bad, good) => {
      try {
        /* istanbul ignore next */
        if (isCancelled) {
          /* istanbul ignore next */
          bad("Is cancelled!")
          return
        }
        pipe(
          // each telepathy config entry
          toPairs,
          map(([kk, vv]) => {
            // each brain
            return [
              kk,
              pipe(map(pipe(propOr({}, "brain"), vv)), smooth)(brains)
            ]
          }),
          fromPairs,
          telepathy => ({ brains, control: ct, telepathy }),
          good
        )(tk)
      } catch (e) {
        /* istanbul ignore next */
        bad(e)
      }
      return cancel
    })
)

const brainMapper = curry((conditions, brain) =>
  reduce(
    (agg, [kk, [pred, trans]]) => {
      const changed = when(pred, trans, brain)
      if (changed === brain) return agg
      const keys = agg.keys.concat(kk)
      return {
        transformed: mergeRight(agg.transformed, changed),
        keys
      }
    },
    { transformed: brain, keys: [] },
    conditions
  )
)

const runMindControl = curry(
  ({ isCancelled, cancel }, { control: ct, brains, telepathy: tk }) =>
    new Future((bad, good) => {
      try {
        /* istanbul ignore next */
        if (isCancelled) {
          /* istanbul ignore next */
          bad("Is cancelled!")
          return
        }
        pipe(
          toPairs,
          // cond short-circuits, so we are gonna use when + reduce instead
          conditions => map(brainMapper(conditions), brains),
          control => ({ control, brains, telepathy: tk }),
          good
        )(ct)
      } catch (e) {
        /* istanbul ignore next */
        bad(e)
      }
      return cancel
    })
)

const search = curry((cancellationPolicy, config, network) => {
  const control = propOr(null, MC, network)
  const telepathy = propOr(null, TK, network)
  const basePath = propOr(process.cwd(), RT, config)
  const getFileTypes = propOr("{md,mdx}", FT)
  return pipe(
    getFileTypes,
    findBrainsRelativeTo(cancellationPolicy.cancel, basePath),
    map(brains => ({ brains, control, telepathy })),
    chain(runTelepathy(cancellationPolicy)),
    chain(runMindControl(cancellationPolicy))
  )(config)
})

export const psychic = curry(
  ({ isCancelled, cancel, loadOrSearch }, bad, config) =>
    pipe(
      propOr(false, CF),
      loadOrSearch,
      map(generateNeuralNetwork(bad)),
      chain(search({ isCancelled, cancel }, config))
    )(config)
)

export const telepath = curry((cancellationPolicy, bad, config) =>
  ifElse(
    () => cancellationPolicy.isCancelled,
    () => bad(new Error("Is cancelled!")),
    psychic(cancellationPolicy, bad)
  )(config)
)

export const alter = map(
  pipe(
    trace("this would alter, if you were less lazy")
    /* z => console.log("zzz", j2(z)) || z */
    /* ({ brains, control, telepathy }) => pipe() */
  )
)

export const brainwave = config => {
  const ccf = propOr("brainwave", NS, config)
  const cc = cosmic(ccf)
  let isCancelled = false
  const cancel = () => {
    isCancelled = true
  }
  const futurize = futurizeWithCancel(cancel)
  const cosmicLoad = futurize(1, cc.load)
  const cosmicSearch = futurize(0, cc.search)
  const loadOrSearch = c => (c ? cosmicLoad(c) : cosmicSearch())
  const mindControl = telepath({ cancel, isCancelled, loadOrSearch })
  const dryRun = propOr(false, DR, config)
  return new Future((bad, good) => {
    pipe(
      mindControl(bad),
      unless(() => dryRun, alter),
      fork(bad, good)
    )(config)
    return cancel
  })
}
