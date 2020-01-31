import { memoizeWith, identity as I } from "ramda"
export const memo = memoizeWith(I)
export const j2 = x => JSON.stringify(x, null, 2)
