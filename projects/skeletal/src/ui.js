import { curry, once } from "ramda"
import { cyan } from "kleur"

const logOnce = once(console.log)

export const talker = curry((conf, bar, text) => {
  if (conf.debug) logOnce(cyan(`DEBUG`), conf)
  if (conf.silent) return
  const up = txt => {
    if (conf.verbose) bar.log.write(txt)
    bar.updateBottomBar(txt)
  }
  if (typeof text === "string") {
    up(text)
  } else if (text.text) {
    up(text.text)
  }
})
