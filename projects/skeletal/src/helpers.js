import { sideEffect } from "xtrace"
import bars from "handlebars"
import { toPairs, map } from "ramda"
import {
  capitalCase,
  constantCase,
  camelCase,
  dotCase,
  headerCase,
  noCase,
  paramCase,
  pascalCase,
  pathCase,
  sentenceCase,
  snakeCase
} from "change-case"
import { pipe } from "./utils"

export const bakedIn = {
  capitalCase,
  constantCase,
  camelCase,
  dotCase,
  headerCase,
  noCase,
  paramCase,
  pascalCase,
  pathCase,
  sentenceCase,
  snakeCase
}

export const enbaken = register =>
  sideEffect(() =>
    pipe(
      toPairs,
      map(([k, v]) => k && v && register(k, v))
    )(bakedIn)
  )

export const bakeIn = enbaken(bars.registerHelper.bind(bars))
