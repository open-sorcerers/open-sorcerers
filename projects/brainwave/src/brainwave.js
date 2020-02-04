import path from "path"
import { stat as rawStat, readFile } from "torpor"
import {
  groupBy,
  prop,
  dissoc,
  reduce,
  concat,
  mergeRight,
  uniq,
  ap,
  unless,
  reject,
  is,
  assoc,
  chain,
  ifElse,
  __ as $,
  pipe,
  propOr,
  curryN,
  curry,
  map
} from "ramda"
import { Future, resolve as RESOLVE, parallel } from "fluture"
import { trace } from "xtrace"
import { cosmiconfig as cosmic } from "cosmiconfig"
import { box, futurizeWithCancel } from "ensorcel"
import grayMatter from "gray-matter"

import { fork, glob } from "./utils"

const brainScan = pipe(readFile($, "utf8"), map(pipe(grayMatter, prop("data"))))

export const relativePath = curryN(2, path.resolve)

export const wrap = curryN(2, (kk, vv) => ({ [kk]: vv }))
const wrapStats = wrap("stats")

export const stat = x =>
  pipe(
    rawStat($, { bigint: false }),
    map(pipe(reject(is(Function)), wrapStats, assoc("filepath", x)))
  )(x)

// move minds with your mind
export const teleTelekinesis = x =>
  pipe(brainScan, map(pipe(wrap("brain"), assoc("filepath", x))))(x)

export const findBrainsRelativeTo = curry((fileTypes, basePath) =>
  pipe(
    glob,
    chain(list =>
      pipe(
        box,
        ap([map(stat), map(teleTelekinesis)]),
        ([a, b]) => a.concat(b),
        parallel(10),
        /* map(groupBy(prop("filepath"))), */
        /* map(map(map(dissoc("filepath")))), */
        /* map(map(reduce(mergeRight, {}))), */

        map(
          pipe(
            groupBy(prop("filepath")),
            map(map(dissoc("filepath"))),
            map(reduce(mergeRight, {}))
          )
        ),
        map(trace("what"))
      )(list)
    )
  )(basePath + "/**/*." + fileTypes)
)

export const getBasePath = x => propOr(process.cwd(), "root", x)

// ;)
const generateNeuralNetwork = curry((bad, xxx) => {
  const cnf = propOr(false, "config", xxx)
  if (!cnf)
    return bad(
      new Error("Expected to have brainwave config return a function!")
    )
  const memoryPalace = cnf()
  const control = propOr(false, "control", memoryPalace)
  const telepathy = propOr(false, "telepathy", memoryPalace)
  if (!control && !telepathy) {
    return bad(
      new Error(
        "Expected to have brainwave config have one or more keys in: [telepathy, control]"
      )
    )
  }

  return memoryPalace
})

const cerebro = curryN(2, (config, network) => {
  const control = propOr(false, "control", network)
  const telepathy = propOr(false, "telepathy", network)
  return pipe(
    findBrainsRelativeTo(config.fileTypes || "{md,mdx}"),
    map(brains => ({ brains, control, telepathy }))
  )(config.basePath || process.cwd())
})

const xavier = curry((isCancelled, loadOrSearch, bad, good, config) =>
  ifElse(
    () => isCancelled,
    () => bad(new Error("Is cancelled!")),
    pipe(
      propOr(false, "configFile"),
      loadOrSearch,
      map(unless(pipe(propOr(false, "config")), generateNeuralNetwork(bad))),
      chain(cerebro(config)),
      fork(bad, good)
    )
  )(config)
)

export const brainwave = config => {
  const { cosmiconfig: ccf = "brainwave" } = config
  const cc = cosmic(ccf)
  let isCancelled = false
  const cancel = () => {
    isCancelled = true
  }
  const futurize = futurizeWithCancel(cancel)
  const load = futurize(1, cc.load)
  const search = futurize(0, cc.search)
  const loadOrSearch = c => (c ? load(c) : search())
  const onslaught = xavier(isCancelled, loadOrSearch)
  return new Future((bad, good) => {
    onslaught(bad, good, config)
    return cancel
  })
}
