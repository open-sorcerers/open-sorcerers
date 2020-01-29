import { pipe, toPairs, map, fromPairs } from "ramda"
import { camelCase } from "camel-case"
import { EVERY, DEFAULT_CONFIG } from "./constants"
import cron from "./cron"

export const repeatEveryWithConfig = conf =>
  pipe(
    toPairs,
    map(([k, v]) => [camelCase(k), cron(conf, v)]),
    fromPairs,
    Object.freeze
  )(EVERY)

export const repeatEvery = repeatEveryWithConfig(DEFAULT_CONFIG)
