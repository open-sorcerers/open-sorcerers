import crontab from "node-cron"
import F from "fluture"
import { curry } from "ramda"

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

export default cron
