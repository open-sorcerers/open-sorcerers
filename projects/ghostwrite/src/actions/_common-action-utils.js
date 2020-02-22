import path from "path"
import * as fspp from "../fs-promise-proxy"

const getFullData = (data, cfg) => Object.assign({}, cfg.data, data)

export const normalizePath = path => {
  return !path.sep || path.sep === "\\" ? path.replace(/\\/g, "/") : path
}

export const makeDestPath = (data, cfg, skeletal) => {
  return path.resolve(
    skeletal.getDestBasePath(),
    skeletal.renderString(normalizePath(cfg.path) || "", getFullData(data, cfg))
  )
}

/**
 * @example
 * @param data
 * @param cfg
 * @param skeletal
 */
export function getRenderedTemplatePath(data, cfg, skeletal) {
  if (cfg.templateFile) {
    const absTemplatePath = path.resolve(
      skeletal.getPlopfilePath(),
      cfg.templateFile
    )
    return skeletal.renderString(
      normalizePath(absTemplatePath),
      getFullData(data, cfg)
    )
  }
  return null
}

/**
 * @example
 * @param data
 * @param cfg
 * @param skeletal
 */
export function* getTemplate(data, cfg, skeletal) {
  const makeTmplPath = p => path.resolve(skeletal.getPlopfilePath(), p)

  let { template } = cfg

  if (cfg.templateFile) {
    template = yield fspp.readFile(makeTmplPath(cfg.templateFile))
  }
  if (template == null) {
    template = ""
  }

  return template
}

/**
 * @example
 * @param data
 * @param cfg
 * @param skeletal
 */
export function* getRenderedTemplate(data, cfg, skeletal) {
  const template = yield getTemplate(data, cfg, skeletal)

  return skeletal.renderString(template, getFullData(data, cfg))
}

export const getRelativeToBasePath = (filePath, skeletal) =>
  filePath.replace(path.resolve(skeletal.getDestBasePath()), "")

export const throwStringifiedError = err => {
  if (typeof err === "string") {
    throw err
  } else {
    throw err.message || JSON.stringify(err)
  }
}
