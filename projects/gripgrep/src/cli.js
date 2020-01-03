import { curryN } from "ramda"
export const flag = curryN(2, (key, value) => [key, value])
export const regexFlag = flag(`-e`)
export const stringFlag = flag(`-F`)
export const globFlag = flag(`-g`)
