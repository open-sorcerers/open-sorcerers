export const DEFAULT_CONFIG = { scheduled: false }

export const EVERY = Object.freeze({
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

