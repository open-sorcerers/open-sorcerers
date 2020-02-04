import globby from "globby"
import { futurizeWithCancel, tacit } from "ensorcel"
import { fork as rawFork } from "fluture"

export const glob = futurizeWithCancel(() => {}, 1, globby)
export const fork = tacit(3, rawFork)
