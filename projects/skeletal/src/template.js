import {
  when,
  propOr,
  pathOr,
  join,
  ap,
  equals,
  ifElse,
  any,
  curry,
  pipe,
  map,
  chain,
  __ as $
} from "ramda"
import { box } from "ensorcel"
import { reject, mapRej, parallel } from "fluture"
import { readFile, writeFile } from "torpor"
import { compile as handleThemBars } from "handlebars"
import { trace } from "xtrace"

import { austereStack } from "./utils"
import { UNSET } from "./constants"
import { ERROR } from "./errors"
import { nameVersion } from "./instance"

const processHandlebars = curry((boneUI, answers, templateFile, templateF) =>
  map(
    pipe(
      handleThemBars,
      boneUI.say(`Processing handlebars...`),
      fn => {
        try {
          return fn(answers)
        } catch (ee) {
          pipe(austereStack, reject)(ee)
          process.exit(2)
        }
      },
      boneUI.say(`Converted ${templateFile}`)
    )
  )(templateF)
)

const writeOutput = curry((flag, outputFile, processedHandlebarsF) =>
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
  (boneUI, answers, flag, [type, templateFile, outputFile]) =>
    when(
      () => equals(type, "add"),
      pipe(
        boneUI.say(`Reading ${templateFile}...`),
        readFile(templateFile),
        processHandlebars(boneUI, answers, templateFile),
        writeOutput(flag, outputFile)
      )
    )("utf8")
)

export const templatizeActions = curry((answers, actions) =>
  map(
    map(
      pipe(handleThemBars, temp => {
        try {
          return temp(answers)
        } catch (ee) {
          pipe(austereStack, reject)(ee)
          process.exit(2)
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
          writeTemplate(boneUI, answers, flag)
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
