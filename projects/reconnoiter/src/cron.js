import crontab from "node-cron"
import { Future as F } from "fluture"
import { camelCase } from "camel-case"
/* import { flexeca }  from 'flexeca' */
import { mergeRight, toPairs, fromPairs, pipe, curry, map } from "ramda"

export const freeze = Object.freeze

export const cron = curry(
  (conf, schedule, fn) =>
    new F((bad, good) => {
      if (!crontab.validate(schedule)) {
        bad(`Invalid crontab schedule specified`)
        return
      }
      const task = crontab.schedule(schedule, fn, conf)
      good(task.start())
      return function cronCancel() {
        task.stop()
        setTimeout(task.destroy, 1)
      }
    })
)

export const DEFAULT_CONFIG = { scheduled: false }

export const EVERY = freeze({
  MINUTE: "* * * * *",
  FIVE_MINUTES: "*/5 * * * *",
  FIFTEEN_MINUTES: "*/15 * * * *",
  THIRTY_MINUTES: "*/30 * * * *",
  HOUR: "0 * * * *",
  MONTH: "0 0 1 * *",
  WEEKDAY_START: "0 9 * * 1-5",
  WEEKDAY_END: "0 5 * * 1-5",
  NIGHT: "0 0 * * *",
  WEEKEND_START: "0 0 * * 0",
  WEEKEND_END: "23 0 * * 6"
})

export const everyWithConfig = conf =>
  pipe(
    toPairs,
    map(([k, v]) => [camelCase(k), cron(conf, v)]),
    fromPairs,
    freeze
  )(EVERY)

export const rawEvery = everyWithConfig(DEFAULT_CONFIG)

export const constants = freeze({
  DEFAULT_CONFIG,
  EVERY
})
export const every = mergeRight(rawEvery, {
  // ja, and then we will have a cigarette, every one half hour two half hour
  oneHalfHour: rawEvery.thirtyMinutes,
  twoHalfHour: rawEvery.hour
})
