import { sideEffect } from "xtrace"
import { registerHelper } from "handlebars"
import { pipe, toPairs, map } from "ramda"
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

export const bakeIn = sideEffect(() =>
  pipe(
    toPairs,
    map(([k, v]) => registerHelper(k, v))
  )(bakedIn)
)
