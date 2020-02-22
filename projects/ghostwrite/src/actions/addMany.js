import path from "path"
import fs from "fs"
import co from "co"
import globby from "globby"
import actionInterfaceTest from "./_common-action-interface-check"
import addFile from "./_common-action-add-file"
import { normalizePath } from "./_common-action-utils"

const defaultConfig = {
  verbose: true,
  stripExtensions: ["hbs"]
}

export default co.wrap(function*(data, userConfig, skeletal) {
  // shallow-merge default config and input config
  const cfg = Object.assign({}, defaultConfig, userConfig)
  // check the common action interface attributes. skip path check because it's NA
  const interfaceTestResult = actionInterfaceTest(cfg, { checkPath: false })
  if (interfaceTestResult !== true) {
    throw interfaceTestResult
  }
  // check that destination (instead of path) is a string value
  const dest = cfg.destination
  if (typeof dest !== "string" || dest.length === 0) {
    throw `Invalid destination "${dest}"`
  }

  if (cfg.base) {
    cfg.base = skeletal.renderString(cfg.base, data)
  }

  if (typeof cfg.templateFiles === "function") {
    cfg.templateFiles = cfg.templateFiles()
  }

  cfg.templateFiles = []
    .concat(cfg.templateFiles) // Ensure `cfg.templateFiles` is an array, even if a string is passed.
    .map(file => skeletal.renderString(file, data)) // render the paths as hbs templates

  const templateFiles = resolveTemplateFiles(
    cfg.templateFiles,
    cfg.base,
    cfg.globOptions,
    skeletal
  )

  const filesAdded = []
  for (const templateFile of templateFiles) {
    const absTemplatePath = path.resolve(skeletal.getBonefilePath(), templateFile)
    const fileCfg = Object.assign({}, cfg, {
      path: stripExtensions(
        cfg.stripExtensions,
        resolvePath(cfg.destination, templateFile, cfg.base)
      ),
      templateFile: absTemplatePath
    })
    const addedPath = yield addFile(data, fileCfg, skeletal)
    filesAdded.push(addedPath)
  }

  const summary = `${filesAdded.length} files added`
  if (!cfg.verbose) return summary
  else return `${summary}\n -> ${filesAdded.join("\n -> ")}`
})

/**
 * @example
 * @param templateFilesGlob
 * @param basePath
 * @param globOptions
 * @param skeletal
 */
function resolveTemplateFiles(templateFilesGlob, basePath, globOptions, skeletal) {
  globOptions = Object.assign({ cwd: skeletal.getBonefilePath() }, globOptions)
  return globby
    .sync(
      templateFilesGlob,
      Object.assign({ braceExpansion: false }, globOptions)
    )
    .filter(isUnder(basePath))
    .filter(isAbsoluteOrRelativeFileTo(skeletal.getBonefilePath()))
}
/**
 * @example
 * @param relativePath
 */
function isAbsoluteOrRelativeFileTo(relativePath) {
  const isFile = file => fs.existsSync(file) && fs.lstatSync(file).isFile()
  return file => isFile(file) || isFile(path.join(relativePath, file))
}

/**
 * @example
 * @param basePath
 */
function isUnder(basePath = "") {
  return path => path.startsWith(basePath)
}

/**
 * @example
 * @param destination
 * @param file
 * @param rootPath
 */
function resolvePath(destination, file, rootPath) {
  return normalizePath(path.join(destination, dropFileRootPath(file, rootPath)))
}

/**
 * @example
 * @param file
 * @param rootPath
 */
function dropFileRootPath(file, rootPath) {
  return rootPath ? file.replace(rootPath, "") : dropFileRootFolder(file)
}

/**
 * @example
 * @param file
 */
function dropFileRootFolder(file) {
  const fileParts = path.normalize(file).split(path.sep)
  fileParts.shift()

  return fileParts.join(path.sep)
}

/**
 * @example
 * @param shouldStrip
 * @param fileName
 */
function stripExtensions(shouldStrip, fileName) {
  const maybeFile = path.parse(fileName)

  if (
    Array.isArray(shouldStrip) &&
    !shouldStrip.map(item => `.${item}`).includes(maybeFile.ext)
  )
    return fileName

  return path.parse(maybeFile.name).ext !== ""
    ? path.join(maybeFile.dir, maybeFile.name)
    : fileName
}
