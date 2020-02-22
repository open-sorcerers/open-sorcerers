import co from "co"
import * as fspp from "../fs-promise-proxy"
import {
  getRenderedTemplate,
  makeDestPath,
  throwStringifiedError,
  getRelativeToBasePath,
  getRenderedTemplatePath
} from "./_common-action-utils"

import actionInterfaceTest from "./_common-action-interface-check"

export default co.wrap(function* modify(data, cfg, skeletal) {
  const interfaceTestResult = actionInterfaceTest(cfg)
  if (interfaceTestResult !== true) {
    throw interfaceTestResult
  }
  const fileDestPath = makeDestPath(data, cfg, skeletal)
  try {
    // check path
    const pathExists = yield fspp.fileExists(fileDestPath)

    if (!pathExists) {
      throw new Error("File does not exist")
    } else {
      let fileData = yield fspp.readFile(fileDestPath)
      cfg.templateFile = getRenderedTemplatePath(data, cfg, skeletal)
      const replacement = yield getRenderedTemplate(data, cfg, skeletal)
      fileData = fileData.replace(cfg.pattern, replacement)
      yield fspp.writeFile(fileDestPath, fileData)
    }
    return getRelativeToBasePath(fileDestPath, skeletal)
  } catch (err) {
    throwStringifiedError(err)
  }
})
