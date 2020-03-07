import { curry } from "ramda"

export const talker = curry((conf, bar, text) => {
  if (conf.silent) return
  const up = txt => {
    if (conf.verbose) bar.log.write(txt)
    bar.updateBottomBar(txt)
  }
  if (text && text.text) {
    up(text.text)
  } else {
    up(text)
  }
})
