import path from "path"
import globby from "globby"
import { futurizeWithCancel, tacit } from "ensorcel"
import { fork as rawFork } from "fluture"
import { curryN } from "ramda"

export const glob = futurizeWithCancel(() => {}, 1, globby)
export const fork = tacit(3, rawFork)
export const relativePath = curryN(2, path.resolve)

export const wrap = curryN(2, (kk, vv) => ({ [kk]: vv }))
