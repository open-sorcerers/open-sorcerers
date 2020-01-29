import { mergeRight } from "ramda"
import { freeze } from "./utils"
import cron from "./cron"
import { repeatEvery, repeatEveryWithConfig } from "./timing"
import { DEFAULT_CONFIG, EVERY } from "./constants"

export default freeze({
  constants: freeze({
    DEFAULT_CONFIG,
    EVERY
  }),
  cron,
  repeatEveryWithConfig,
  repeatEvery: mergeRight(repeatEvery, {
    // ja, and then we will have a cigarette, every one half hour two half hour
    oneHalfHour: repeatEvery.thirtyMinutes,
    twoHalfHour: repeatEvery.hour
  })
})
