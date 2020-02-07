import {
  ap,
  includes,
  reduce,
  concat,
  groupBy,
  mergeRight,
  pipe,
  reject,
  is,
  __ as $,
  prop,
  assoc,
  map
} from "ramda"
import { readFile, stat as rawStat } from "torpor"
import grayMatter from "gray-matter"
import { parallel } from "fluture"
import { box } from "ensorcel"

import { FC, CO, FI, BR, ST, DA } from "./constants"
import { wrap } from "./utils"

export const addStats = x =>
  pipe(
    rawStat($, { bigint: false }),
    map(pipe(reject(is(Function)), wrap(ST), assoc(FI, x)))
  )(x)

export const brainScan = pipe(
  readFile($, "utf8"),
  map(pipe(grayMatter, box, ap([prop(DA), prop(CO)])))
)

export const addBrains = x =>
  pipe(
    brainScan,
    map(
      pipe(
        ([brain, fileContent]) => ({ [BR]: brain, [FC]: fileContent }),
        assoc(FI, x)
      )
    )
  )(x)

export const consumeData = pipe(
  reject(includes("node_modules")),
  box,
  ap([map(addStats), map(addBrains)]),
  reduce(concat, []),
  parallel(10),
  map(pipe(groupBy(prop(FI)), map(reduce(mergeRight, {}))))
)
