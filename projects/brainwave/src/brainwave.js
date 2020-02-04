import path from "path"
import { stat as rawStat } from "torpor"
import {
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
import { Future, parallel } from "fluture"
/* import { trace } from "xtrace" */
import { cosmiconfig as cosmic } from "cosmiconfig"
import { futurizeWithCancel } from "ensorcel"
import brainScan from "gray-matter"

import { fork, glob } from "./utils"

export const relativePath = curryN(2, path.resolve)

export const wrap = curryN(2, (kk, vv) => ({ [kk]: vv }))
const wrapStats = wrap("stats")

export const stat = x =>
  pipe(
    rawStat($, { bigint: false }),
    map(pipe(reject(is(Function)), wrapStats, assoc("filepath", x)))
  )(x)

// move minds with your mind
export const teleTelekinesis = pipe(brainScan, wrap("brain"))

export const findBrainsRelativeTo = curry((fileTypes, basePath) =>
  pipe(
    glob,
    /* chain(list => parallel(10)(map(stat, list))) */
    chain(pipe(map(stat), parallel(10)))
    /* chain(pipe(map(teleTelekinesis), parallel(10))) */
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
