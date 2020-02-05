import {
  reduce,
  mergeRight,
  when,
  cond,
  fromPairs,
  toPairs,
  chain,
  ifElse,
  pipe,
  propOr,
  curryN,
  curry,
  map
} from "ramda"
import { Future } from "fluture"
import { trace } from "xtrace"
import { cosmiconfig as cosmic } from "cosmiconfig"
import { smooth, futurizeWithCancel } from "ensorcel"

import { fork, globWithCancel } from "./utils"

import { CC, CF, FT, MC, NS, RT, TK } from "./constants"
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
        if (isCancelled) {
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
        bad(e)
      }
      return cancel
    })
)

const runMindControl = curry(
  ({ isCancelled, cancel }, { control: ct, brains, telepathy: tk }) =>
    new Future((bad, good) => {
      try {
        if (isCancelled) {
          bad("Is cancelled!")
          return
        }
        pipe(
          toPairs,
          // each mindControl config entry
          /*
          map(([kk, [condition, mutation]]) => [
            condition,
            mutation
            // pipe(mutation, ww => [kk, ww])
          ]),*/
          // we wanna be able to express constant functions without necessarily having that be the only thing which hits
          // so we are gonna use when + reduce instead
          /* conditions => map(cond(conditions), brains), */
          conditions =>
            map(
              brain =>
                reduce(
                  (agg, [kk, [pred, trans]]) =>
                    mergeRight(agg, when(pred, trans, brain)),
                  brain,
                  conditions
                ),
              brains
            ),
          control => ({ control, brains, telepathy: tk }),
          good
        )(ct)
      } catch (e) {
        bad(e)
      }
      return cancel
    })
)

const lookForFrontmatter = curry(({ isCancelled, cancel }, config, network) => {
  const control = propOr(null, MC, network)
  const telepathy = propOr(null, TK, network)
  const basePath = propOr(process.cwd(), RT, config)
  const getFileTypes = propOr("{md,mdx}", FT)
  return pipe(
    getFileTypes,
    findBrainsRelativeTo(cancel, basePath),
    map(brains => ({ brains, control, telepathy })),
    chain(runTelepathy({ isCancelled, cancel })),
    chain(runMindControl({ isCancelled, cancel }))
  )(config)
})

export const psychic = curry(
  ({ isCancelled, cancel, loadOrSearch }, bad, good, config) =>
    pipe(
      propOr(false, CF),
      loadOrSearch,
      /* map(unless(pipe(propOr(false, CC)), generateNeuralNetwork(bad))), */
      map(generateNeuralNetwork(bad)),
      chain(lookForFrontmatter({ isCancelled, cancel }, config)),
      fork(bad, good)
    )(config)
)

export const telepath = curry(
  ({ cancel, isCancelled, loadOrSearch }, bad, good, config) =>
    ifElse(
      () => isCancelled,
      () => bad(new Error("Is cancelled!")),
      psychic({ isCancelled, cancel, loadOrSearch }, bad, good)
    )(config)
)

export const brainwave = config => {
  const ccf = propOr("brainwave", NS, config)
  const cc = cosmic(ccf)
  let isCancelled = false
  const cancel = () => {
    isCancelled = true
  }
  const futurize = futurizeWithCancel(cancel)
  const load = futurize(1, cc.load)
  const search = futurize(0, cc.search)
  const loadOrSearch = c => (c ? load(c) : search())
  const mindControl = telepath({ cancel, isCancelled, loadOrSearch })
  return new Future((bad, good) => {
    mindControl(bad, good, config)
    return cancel
  })
}
