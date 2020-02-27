import path from "path"
import del from "del"
import { isBinaryFileSync } from "isbinaryfile"
import * as fspp from "../fs-promise-proxy"
import {
  getRenderedTemplate,
  makeDestPath,
  throwStringifiedError,
  getRelativeToBasePath
} from "./_common-action-utils"

/**
 * @example
 * @param data
 * @param cfg
 * @param skeletal
 */
export default function* addFile(data, cfg, skeletal) {
  const fileDestPath = makeDestPath(data, cfg, skeletal)
  const { force, skipIfExists = false } = cfg
  try {
    // check path
    let destExists = yield fspp.fileExists(fileDestPath)

    // if we are forcing and the file already exists, delete the file
    if (force === true && destExists) {
      yield del([fileDestPath], { force })
      destExists = false
    }

    // we can't create files where one already exists
    if (destExists) {
      if (skipIfExists) {
        return `[SKIPPED] ${fileDestPath} (exists)`
      }
      throw `File already exists\n -> ${fileDestPath}`
    } else {
      yield fspp.makeDir(path.dirname(fileDestPath))

      const absTemplatePath =
        (cfg.templateFile &&
          path.resolve(skeletal.getBonefilePath(), cfg.templateFile)) ||
        null

      if (absTemplatePath != null && isBinaryFileSync(absTemplatePath)) {
        const rawTemplate = yield fspp.readFileRaw(cfg.templateFile)
        yield fspp.writeFileRaw(fileDestPath, rawTemplate)
      } else {
        const renderedTemplate = yield getRenderedTemplate(data, cfg, skeletal)
        yield fspp.writeFile(fileDestPath, renderedTemplate)
      }

      // keep the executable flags
      if (absTemplatePath != null) {
        const sourceStats = yield fspp.stat(absTemplatePath)
        const destStats = yield fspp.stat(fileDestPath)
        const executableFlags =
          sourceStats.mode &
          (fspp.constants.S_IXUSR |
            fspp.constants.S_IXGRP |
            fspp.constants.S_IXOTH)
        yield fspp.chmod(fileDestPath, destStats.mode | executableFlags)
      }
    }

    // return the added file path (relative to the destination path)
    return getRelativeToBasePath(fileDestPath, skeletal)
  } catch (err) {
    throwStringifiedError(err)
  }
}
