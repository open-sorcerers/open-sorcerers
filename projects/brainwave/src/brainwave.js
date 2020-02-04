import path from "path"
import { stat as rawStat } from "torpor"
import { ifElse, __ as $, pipe, propOr, curryN, curry, map } from "ramda"
import { reject } from "fluture"
import { cosmiconfig as cosmic } from "cosmiconfig"
import { futurizeWithCancel } from "ensorcel"

import { glob } from "./utils"

export const relativePath = curryN(2, path.resolve)

export const stat = rawStat($, { bigint: false })

export const findBrainsRelativeTo = curry((fileTypes, basePath) =>
  pipe(relativePath(basePath), glob, map(stat))("/**/*." + fileTypes)
)

export const getBasePath = x => propOr(process.cwd(), "root", x)

export const brainwave = curry((config, file) => {
  const cc = cosmic()
  let isCancelled = false
  const cancel = () => {
    isCancelled = true
  }
  const futurize = futurizeWithCancel(cancel)
  const load = futurize(1, cc.load)
  const search = futurize(0, cc.search)
  const loadOrSearch = c => (c ? load(c) : search())
  const xavier = ifElse(
    () => isCancelled,
    () => reject("Is cancelled!"),
    pipe(
      // look for --config / -c flag
      propOr(false, "config"),
      loadOrSearch
      // map(data)
    )
  )
  return xavier(config)
})
