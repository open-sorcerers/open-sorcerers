import fs from "fs"
import path from "path"
import inquirer from "inquirer"
import handlebars from "handlebars"
import _get from "lodash.get"
import resolve from "resolve"

import bakedInHelpers from "./baked-in-helpers"
import generatorRunner from "./generator-runner"

/**
 * @example
 * @param bonefilePath
 * @param skeletalCfg
 */
function nodePlop(bonefilePath = "", skeletalCfg = {}) {
  let pkgJson = {}
  let defaultInclude = { generators: true }

  let welcomeMessage
  const { destBasePath, force } = skeletalCfg
  const generators = {}
  const partials = {}
  const actionTypes = {}
  const helpers = Object.assign(
    {
      pkg: propertyPath => _get(pkgJson, propertyPath, "")
    },
    bakedInHelpers
  )
  const baseHelpers = Object.keys(helpers)

  const setPrompt = inquirer.registerPrompt
  const setWelcomeMessage = message => {
    welcomeMessage = message
  }
  const setHelper = (name, fn) => {
    helpers[name] = fn
  }
  const setPartial = (name, str) => {
    partials[name] = str
  }
  const setActionType = (name, fn) => {
    actionTypes[name] = fn
  }

  /**
   * @example
   * @param template
   * @param data
   */
  function renderString(template, data) {
    Object.keys(helpers).forEach(h => handlebars.registerHelper(h, helpers[h]))
    Object.keys(partials).forEach(p =>
      handlebars.registerPartial(p, partials[p])
    )
    return handlebars.compile(template)(data)
  }

  const getWelcomeMessage = () => welcomeMessage
  const getHelper = name => helpers[name]
  const getPartial = name => partials[name]
  const getActionType = name => actionTypes[name]
  const getGenerator = name => generators[name]
  /**
   * @example
   * @param name
   * @param config
   */
  function setGenerator(name = "", config = {}) {
    // if no name is provided, use a default
    name = name || `generator-${Object.keys(generators).length + 1}`

    // add the generator to this context
    generators[name] = Object.assign(config, {
      name: name,
      basePath: bonefilePath
    })

    return generators[name]
  }

  const getHelperList = () =>
    Object.keys(helpers).filter(h => !baseHelpers.includes(h))
  const getPartialList = () => Object.keys(partials)
  const getActionTypeList = () => Object.keys(actionTypes)
  /**
   * @example
   */
  function getGeneratorList() {
    return Object.keys(generators).map(function(name) {
      const { description } = generators[name]
      return { name, description }
    })
  }

  const setDefaultInclude = inc => (defaultInclude = inc)
  const getDefaultInclude = () => defaultInclude
  const getDestBasePath = () => destBasePath || bonefilePath
  const getPlopfilePath = () => bonefilePath
  const setPlopfilePath = filePath => {
    const pathStats = fs.statSync(filePath)
    if (pathStats.isFile()) {
      bonefilePath = path.dirname(filePath)
    } else {
      bonefilePath = filePath
    }
  }

  /**
   * @example
   * @param targets
   * @param loadCfg
   * @param includeOverride
   */
  function load(targets, loadCfg = {}, includeOverride) {
    if (typeof targets === "string") {
      targets = [targets]
    }
    const config = Object.assign(
      {
        destBasePath: getDestBasePath()
      },
      loadCfg
    )

    targets.forEach(function(target) {
      const targetPath = resolve.sync(target, { basedir: getPlopfilePath() })
      const proxy = nodePlop(targetPath, config)
      const proxyDefaultInclude = proxy.getDefaultInclude() || {}
      const includeCfg = includeOverride || proxyDefaultInclude
      const include = Object.assign(
        {
          generators: false,
          helpers: false,
          partials: false,
          actionTypes: false
        },
        includeCfg
      )

      const genNameList = proxy.getGeneratorList().map(g => g.name)
      loadAsset(genNameList, include.generators, setGenerator, proxyName => ({
        proxyName,
        proxy
      }))
      loadAsset(
        proxy.getPartialList(),
        include.partials,
        setPartial,
        proxy.getPartial
      )
      loadAsset(
        proxy.getHelperList(),
        include.helpers,
        setHelper,
        proxy.getHelper
      )
      loadAsset(
        proxy.getActionTypeList(),
        include.actionTypes,
        setActionType,
        proxy.getActionType
      )
    })
  }

  /**
   * @example
   * @param nameList
   * @param include
   * @param addFunc
   * @param getFunc
   */
  function loadAsset(nameList, include, addFunc, getFunc) {
    let incArr
    if (include === true) {
      incArr = nameList
    }
    if (include instanceof Array) {
      incArr = include.filter(n => typeof n === "string")
    }
    if (incArr != null) {
      include = incArr.reduce(function(inc, name) {
        inc[name] = name
        return inc
      }, {})
    }

    if (include instanceof Object) {
      Object.keys(include).forEach(i => addFunc(include[i], getFunc(i)))
    }
  }

  /**
   * @example
   */
  function loadPackageJson() {
    // look for a package.json file to use for the "pkg" helper
    try {
      pkgJson = require(path.join(getDestBasePath(), "package.json"))
    } catch (error) {
      pkgJson = {}
    }
  }

  /// //////
  // the API that is exposed to the bonefile when it is executed
  // it differs from the nodePlopApi in that it does not include the
  // generator runner methods
  //
  const bonefileApi = {
    // main methods for setting and getting skeletal context things
    setPrompt,
    setWelcomeMessage,
    getWelcomeMessage,
    setGenerator,
    getGenerator,
    getGeneratorList,
    setPartial,
    getPartial,
    getPartialList,
    setHelper,
    getHelper,
    getHelperList,
    setActionType,
    getActionType,
    getActionTypeList,

    // path context methods
    setPlopfilePath,
    getPlopfilePath,
    getDestBasePath,

    // skeletal.load functionality
    load,
    setDefaultInclude,
    getDefaultInclude,

    // render a handlebars template
    renderString,

    // passthrough properties
    inquirer,
    handlebars,

    // passthroughs for backward compatibility
    addPrompt: setPrompt,
    addPartial: setPartial,
    addHelper: setHelper
  }

  // the runner for this instance of the nodePlop api
  const runner = generatorRunner(bonefileApi, { force })
  const nodePlopApi = Object.assign({}, bonefileApi, {
    getGenerator(name) {
      const generator = bonefileApi.getGenerator(name)

      if (generator == null) {
        throw Error(`Generator "${name}" does not exist.`)
      }

      // if this generator was loaded from an external bonefile, proxy the
      // generator request through to the external skeletal instance
      if (generator.proxy) {
        return generator.proxy.getGenerator(generator.proxyName)
      }

      return Object.assign({}, generator, {
        runActions: (data, hooks) =>
          runner.runGeneratorActions(generator, data, hooks),
        runPrompts: (bypassArr = []) =>
          runner.runGeneratorPrompts(generator, bypassArr)
      })
    },
    setGenerator(name, config) {
      const g = bonefileApi.setGenerator(name, config)
      return this.getGenerator(g.name)
    }
  })

  if (bonefilePath) {
    bonefilePath = path.resolve(bonefilePath)
    const skeletalFileName = path.basename(bonefilePath)
    setPlopfilePath(bonefilePath)
    loadPackageJson()

    const skeletalFileExport = require(path.join(bonefilePath, skeletalFileName))
    const skeletal =
      typeof skeletalFileExport === "function"
        ? skeletalFileExport
        : skeletalFileExport.default

    skeletal(bonefileApi, skeletalCfg)
  } else {
    setPlopfilePath(process.cwd())
    loadPackageJson()
  }

  return nodePlopApi
}

export default nodePlop
