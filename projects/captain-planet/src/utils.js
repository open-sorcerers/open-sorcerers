import { identity as I, curry, filter } from "ramda"

export const merge = curry((a, b) => Object.assign({}, a, b))
export const j2 = x => JSON.stringify(x, null, 2)
// remove null values
export const smooth = filter(I)

// an essential tool for using with `ap`
export const box = x => [x]
export const isArray = Array.isArray

export const safeJSONParse = x => {
  try {
    return JSON.parse(x)
  } catch (e) {
    return {}
  }
}
