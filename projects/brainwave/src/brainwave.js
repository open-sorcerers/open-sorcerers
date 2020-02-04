import path from "path"
import { stat as rawStat, readFile } from "torpor"
import { unless, chain, ifElse, pipe, propOr, curryN, curry, map } from "ramda"
import { Future } from "fluture"
import { trace } from "xtrace"
import { cosmiconfig as cosmic } from "cosmiconfig"
import { futurizeWithCancel } from "ensorcel"

import { fork, glob } from "./utils"

import { CC, CF, FT, MC, NS, RT, TK } from "./constants"
import { consumeData } from "./consumers"

const joint = curry((xx, aa, bb) => aa + xx + bb)

export const findBrainsRelativeTo = curry((basePath, fileTypes) =>
  pipe(joint("/**/*.", basePath), glob, chain(consumeData))(fileTypes)
)

export const getBasePath = x => propOr(process.cwd(), RT, x)

const ERRORS = Object.freeze({
  RETURN_A_FUNCTION: "Expected to have brainwave config return a function!",
  TELEPATHY_OR_CONTROL: `Expected to have brainwave config have one or more keys in: [${MC}, ${TK}]`
})

// ;)
const generateNeuralNetwork = curry((bad, xxx) => {
  const cnf = propOr(false, CC, xxx)
  if (!cnf) return bad(new Error(ERRORS.RETURN_A_FUNCTION))
  const memoryPalace = cnf()
  const control = propOr(false, MC, memoryPalace)
  const telepathy = propOr(false, TK, memoryPalace)
  if (!control && !telepathy) {
    return bad(new Error(ERRORS.TELEPATHY_OR_CONTROL))
  }
  return memoryPalace
})

const lookForFrontmatter = curryN(2, (config, network) => {
  const control = propOr([], MC, network)
  const telepathy = propOr([], TK, network)
  const basePath = propOr(process.cwd(), RT, config)
  const getFileTypes = propOr("{md,mdx}", FT)
  return pipe(
    getFileTypes,
    findBrainsRelativeTo(basePath),
    map(brains => ({ brains, control, telepathy }))
  )(config)
})

const psychic = curry((loadOrSearch, bad, good, config) =>
  pipe(
    propOr(false, CF),
    loadOrSearch,
    trace("==>"),
    map(unless(pipe(propOr(false, CC)), generateNeuralNetwork(bad))),
    chain(lookForFrontmatter(config)),
    fork(bad, good)
  )(config)
)

const telepath = curry((isCancelled, loadOrSearch, bad, good, config) =>
  ifElse(
    () => isCancelled,
    () => bad(new Error("Is cancelled!")),
    psychic(loadOrSearch, bad, good)
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
  const mindControl = telepath(isCancelled, loadOrSearch)
  return new Future((bad, good) => {
    mindControl(bad, good, config)
    return cancel
  })
}
