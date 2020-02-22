import co from "co"
import del from "del"
import fspp from "../../src/fs-promise-proxy"
import { normalizePath } from "../../src/actions/_common-action-utils"

module.exports = co.wrap(function* customAction(data, cfg) {
  const removeFilePath = cfg.path
  if (yield fspp.fileExists(removeFilePath)) {
    return yield del([normalizePath(removeFilePath)])
  } else {
    throw new Error(`Path does not exist ${removeFilePath}`)
  }
})
