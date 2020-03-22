import path from "path"
import globby from "globby"
import { futurizeWithCancel, tacit } from "ensorcel"
import { fork as rawFork } from "fluture"
import { curryN, __ as $ } from "ramda"

export const globWithCancel = futurizeWithCancel($, 1, globby)
export const fork = tacit(3, rawFork)
export const relativePath = curryN(2, path.resolve)

export const wrap = curryN(2, (kk, vv) => ({ [kk]: vv }))

const isString = x => typeof x === "string"

export const stringInString = curryN(
  2,
  (xx, yy) =>
    isString(xx) && isString(yy) && (xx.includes(yy) || yy.includes(xx))
)
