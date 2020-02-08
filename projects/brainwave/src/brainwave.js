import path from "path"
import {
  curryN,
  when,
  __ as $,
  reduce,
  keys,
  values,
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
import { trace } from "xtrace"
import { cosmiconfig as cosmic } from "cosmiconfig"
import { box, smooth, futurizeWithCancel } from "ensorcel"
import { safeDump as yamlize } from "js-yaml"

import { fork, globWithCancel } from "./utils"

import { RP, FI, FC, BR, DR, CC, CF, FT, MC, NS, RT, TK } from "./constants"
import { consumeData } from "./consumers"

const joint = curry((xx, aa, bb) => aa + xx + bb)

const toYAML = curryN(2, yamlize)

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

const NO_CHANGE = `NO_CHANGE`

const mindMapper = curry((conditions, mind) =>
  reduce(
    (agg, [kk, [pred, trans]]) => {
      const changed = ifElse(pred, trans, () => NO_CHANGE)(mind)
      const hasChanged = changed !== NO_CHANGE
      if (!hasChanged) return agg
      const matched = agg.matched.concat(kk)
      const transformed = mergeRight(agg.transformed, changed)
      return {
        transformed,
        matched
      }
    },
    { transformed: {}, matched: [] },
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

const DEFAULT_YAML_OPTS = {
  indent: 2,
  noArrayIndent: false,
  skipInvalid: false,
  flowLevel: -1,
  sortKeys: true,
  noRefs: true,
  condenseFlow: false
}

export const reyaml = curry(
  (config, content, head) =>
    tripleDash +
    toYAML(head, config.yamlOpts || DEFAULT_YAML_OPTS) +
    tripleDash +
    content
)

const relativize = x =>
  x.substr(path.resolve(x, process.cwd()).length, Infinity)

export const runTransformationWithWriter = curry((writer, config, xxx) =>
  pipe(
    map(({ fileContent, before, after, filepath }) =>
      pipe(
        writer(
          filepath,
          reyaml(config, fileContent, mergeRight(before, after))
        ),
        map(() => filepath)
      )("utf8")
    ),
    values,
    parallel(10),
    map(changed =>
      toYAML(
        { changed: map(relativize, changed) },
        config.yamlOpts || DEFAULT_YAML_OPTS
      )
    )
  )(xxx)
)

export const runTransformation = runTransformationWithWriter(writeFile)

const printOut = curry((config, xxx) =>
  map(
    pipe(
      ifElse(
        () => config.telepathy,
        pipe(map(map(relativize)), x =>
          toYAML(x, config.yamlOpts || DEFAULT_YAML_OPTS)
        ),
        pipe(
          map(({ after: changes, because }) => ({
            changes,
            because
          })),
          when(
            () => propOr(false, RP, config),
            pipe(
              toPairs,
              map(([kk, vv]) => [relativize(kk), vv]),
              fromPairs
            )
          ),
          toYAML($, config.yamlOpts || DEFAULT_YAML_OPTS)
        )
      )
    )
  )(xxx)
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
  const telepathyOnly = propOr(false, TK, config)
  return new Future((bad, good) => {
    pipe(
      mindControl(bad),
      ifElse(
        () => telepathyOnly,
        map(({ telepathy }) => map(keys)(telepathy)),
        structureTransformation
      ),
      ifElse(
        () => dryRun || telepathyOnly,
        printOut(config),
        chain(runTransformation(config))
      ),
      fork(bad, good)
    )(config)
    return cancel
  })
}
