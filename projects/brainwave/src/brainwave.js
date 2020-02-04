import path from "path"
import { stat as rawStat } from "torpor"
import {
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
import { parallel, reject as bad } from "fluture"
import { trace } from "xtrace"
import { cosmiconfig as cosmic } from "cosmiconfig"
import { futurizeWithCancel } from "ensorcel"

import { glob } from "./utils"

export const relativePath = curryN(2, path.resolve)

export const stat = x =>
  pipe(
    rawStat($, { bigint: false }),
    map(reject(is(Function))),
    map(assoc("name", x))
  )(x)

export const findBrainsRelativeTo = curry((fileTypes, basePath) =>
  pipe(
    trace("where"),
    glob,
    chain(list => parallel(10)(map(stat, list)))
  )(basePath + "/**/*." + fileTypes)
)

export const getBasePath = x => propOr(process.cwd(), "root", x)

export const brainwave = curry((config, file) => {
  const cc = cosmic("brainwave")
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
    () => bad(new Error("Is cancelled!")),
    pipe(
      // look for --config / -c flag
      propOr(false, "config"),
      loadOrSearch,
      // think about injecting some props here so that the user doesn't have to import their own stuff?
      map(({ config: cnf }) => {
        if (cnf) {
          const memoryPalace = cnf()
          if (
            !memoryPalace ||
            (!memoryPalace.control && !memoryPalace.telepathy)
          ) {
            bad(
              new Error(
                "Expected to have brainwave config have one or more keys in: [telepathy, control]"
              )
            )
          }
          return memoryPalace
        }
        bad(new Error("Expected to have brainwave config return a function!"))
      }),
      chain(({ control, telepathy }) => {
        return map(
          brains => ({ brains, control, telepathy }),
          findBrainsRelativeTo(
            config.fileTypes || "{md,mdx}",
            config.basePath || process.cwd()
          )
        )
      })

      // map(data)
    )
  )
  return xavier(config)
})
