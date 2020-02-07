import {
  curryN,
  __ as $,
  reduce,
  keys,
  values,
  identity as I,
  mergeRight,
  fromPairs,
  toPairs,
  chain,
  ifElse,
  pipe,
  propOr,
  curry,
  map,
  ap
} from "ramda"
import { parallel, Future } from "fluture"
import { writeFile } from "torpor"
/* import { trace } from "xtrace" */
import { cosmiconfig as cosmic } from "cosmiconfig"
import { box, smooth, futurizeWithCancel } from "ensorcel"
import { safeDump as yamlize } from "js-yaml"

import { fork, globWithCancel } from "./utils"

import { FI, FC, BR, DR, CC, CF, FT, MC, NS, RT, TK } from "./constants"
import { consumeData } from "./consumers"

const joint = curry((xx, aa, bb) => aa + xx + bb)

const toYAML = curryN(2, yamlize)
const yamify = toYAML($, {
  indent: 2,
  noArrayIndent: false,
  skipInvalid: false,
  flowLevel: -1,
  sortKeys: true,
  noRefs: true,
  condenseFlow: false
})

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
            return [kk, pipe(map(pipe(propOr({}, BR), vv)), smooth)(brains)]
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

const mindMapper = curry((conditions, mind) =>
  reduce(
    (agg, [kk, [pred, trans]]) => {
      const changed = ifElse(pred, trans, () => ({}))(mind)
      const matched = agg.matched.concat(kk)
      const transformed = mergeRight(agg.transformed, changed)
      return {
        transformed,
        matched
      }
    },
    { transformed: mind.brain, matched: [] },
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
          conditions => map(mindMapper(conditions), brains),
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

export const structureTransformation = map(
  pipe(({ brains, control }) =>
    map(
      pipe(
        box,
        ap([propOr({}, BR), propOr("???", FI), propOr("", FC)]),
        ([brain, filepath, fileContent]) => ({
          [FC]: fileContent,
          before: brain,
          after: control[filepath].transformed,
          filepath,
          because: control[filepath].matched
        })
      )
    )(brains)
  )
)

const tripleDash = "---\n"

export const reyaml = curry(
  (content, head) => tripleDash + yamify(head) + tripleDash + content
)

export const runTransformation = pipe(
  map(
    /* istanbul ignore next */
    ({ fileContent = "", after, filepath }) =>
      writeFile(filepath, reyaml(fileContent, after), "utf8")
  ),
  values,
  parallel(10)
)
/* map(([kk, vv]) => kk + vv) */
/* map(join("\n")) */

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
  const telepathyOnly = propOr(false, TK, config)
  return new Future((bad, good) => {
    pipe(
      mindControl(bad),
      ifElse(
        () => telepathyOnly,
        map(({ telepathy }) => map(keys)(telepathy)),
        structureTransformation
      ),
      ifElse(() => dryRun || telepathyOnly, I, chain(runTransformation)),
      fork(bad, good)
    )(config)
    return cancel
  })
}
