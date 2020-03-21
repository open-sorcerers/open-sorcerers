import {
  identity as I,
  propOr,
  pathOr,
  join,
  ap,
  equals,
  ifElse,
  any,
  curry,
  map,
  chain,
  __ as $
} from "ramda"
import { box } from "ensorcel"
import { reject, mapRej, Future, parallel } from "fluture"
import { readFile, writeFile } from "torpor"
import handlebars from "handlebars"
/* import { trace } from "xtrace" */

import { pipe, austereStack } from "./utils"
import { UNSET } from "./constants"
import { ERROR } from "./errors"
import { nameVersion } from "./instance"

export const processHandlebars = curry(
  (ligament, boneUI, answers, templateFile, templateF) => {
    const cancel = propOr(I, "cancel", ligament)
    return chain(
      xxx =>
        new Future((bad, good) => {
          pipe(
            handlebars.compile,
            boneUI.say(`Processing handlebars...`),
            fn => {
              try {
                return fn(answers)
              } catch (ee) {
                bad(austereStack(ee))
              }
            },
            boneUI.say(`Converted ${templateFile}`),
            good
          )(xxx)
          return cancel
        })
    )(templateF)
  }
)

export const writeOutput = curry((flag, outputFile, processedHandlebarsF) =>
  chain(content =>
    pipe(
      writeFile(outputFile, $, { format: "utf8", flag }),
      map(() => `Generated ${outputFile}`),
      mapRej(
        () => `Unable to write to ${outputFile}.
\tYou can use the --force flag, but it may overwrite existing files.`
      )
    )(content)
  )(processedHandlebarsF)
)

export const writeTemplate = curry(
  (ligament, boneUI, answers, flag, [type, templateFile, outputFile]) =>
    ifElse(
      () => equals(type, "add"),
      pipe(
        boneUI.say(`Reading ${templateFile}...`),
        readFile(templateFile),
        processHandlebars(ligament, boneUI, answers, templateFile),
        writeOutput(flag, outputFile)
      ),
      () => reject(`Only add actions are currently supported`)
    )("utf8")
)

export const templatizeActions = curry((answers, actions) =>
  map(
    map(
      pipe(handlebars.compile, temp => {
        try {
          return temp(answers)
        } catch (ee) {
          throw austereStack(ee)
        }
      })
    )
  )(actions)
)

export const render = curry((config, boneUI, ligament, filled) => {
  const threads = propOr(10, "threads", ligament)
  const forceWrite = pathOr(false, ["config", "force"], ligament)
  const { answers, actions } = filled
  const flag = forceWrite ? "w" : "wx"
  return pipe(
    templatizeActions(answers),
    map(
      pipe(
        box,
        ap([
          propOr(UNSET, "type"),
          propOr(UNSET, "template"),
          propOr(UNSET, "path")
        ]),
        ifElse(
          any(equals(UNSET)),
          pipe(ERROR.INCOMPLETE_ACTION, reject),
          writeTemplate(ligament, boneUI, answers, flag)
        )
      )
    ),
    boneUI.say("Processing..."),
    parallel(threads),
    map(
      pipe(
        join("\n\t- "),
        z => `🦴 ${nameVersion()} - bone-setting complete!\n\t- ` + z
      )
    )
  )(actions)
})
