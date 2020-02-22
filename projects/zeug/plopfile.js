const {
  filter,
  reduce,
  mergeRight,
  range,
  identity: I,
  always: K,
  trim,
  pipe,
  map,
  propOr,
  join,
  split
} = require("ramda")
const { flexeca } = require("flexeca")
const { fork: rawFork } = require("fluture")
const latest = require("latest-version")
const { trace } = require("xtrace")
const { tacit, j2 } = require("ensorcel")

const fork = tacit(3, rawFork)

module.exports = plop => {
  plop.setGenerator("pkg", {
    description: "zeug - package.json",
    prompts: [
      { type: "input", name: "name", message: "Module Name?" },
      { type: "input", name: "desc", message: "Description?" },
      {
        type: "input",
        name: "repo",
        message: "Repo?"
      },
      { type: "input", name: "author", message: "Author?" },
      { type: "input", name: "license", message: "License?" },
      { type: "confirm", name: "makePrivate", message: "Private?" },
      { type: "confirm", name: "isCLI", message: "CLI?" },
      { type: "input", name: "keywords", message: "Keywords?" },
      { type: "input", name: "deps", message: "Dependencies?" },
      { type: "input", name: "devDeps", message: "Dev Dependencies?" }
    ],
    actions: [
      {
        type: "add",
        path: "{{dashCase name}}/package.json",
        templateFile: "templates/package-json.hbs"
      }
      /* , {
        type: "install"
      }*/
    ]
  })
  const C = {
    n: "\n"
  }
  plop.setHelper("arrayish", function arrayish(opts) {
    const space = pipe(range(0), map(K(" ")), join(""))(opts.hash.indent)
    const del = opts.hash.delimiter || ","
    const __trim = opts.hash.trim || true
    const $trim = __trim ? trim : I
    const __j2 = opts.hash.json || false
    const $j2 = __j2 ? j2 : I
    return pipe(
      split(del),
      map(pipe($trim, $j2)),
      join(`${C.n}${space}`),
      z => space + z + C.n
    )(opts.fn(this))
  })
  plop.setHelper("installable", function installable(opts) {
    const indent = opts.hash.indent || 2
    return pipe(
      split(" "),
      map(trim),
      filter(I),
      reduce((agg, dep) => mergeRight(agg, { [dep]: "^0.0.0" }), {}),
      z => JSON.stringify(z, null, indent)
    )(opts.fn(this))
  })
  plop.setActionType("install", (answers, config) => {
    return new Promise((resolve, reject) => {
      const useNPM = propOr(false, "useNPM", config)
      const cmd = useNPM ? "npm" : "yarn"
      const args = useNPM ? ["i"] : []
      fork(reject)(resolve)(flexeca({ cwd: process.cwd() }, cmd, args))
    })
    /* return new Promise((resolve, reject) => {
      const useNPM = propOr(false, "useNPM", config)
      const isDev = propOr(false, "dev", config)
      const cmd = useNPM ? "npm" : "yarn"
      const useWorkspace = propOr(false, "workspace", config)
      const deppies = (isDev ? answers.devDeps : answers.deps).split(" ")
      const args = [
        useWorkspace ? "workspace " + useWorkspace : false,
        useNPM ? "install" : "add",
        ...deppies,
        isDev ? "-D" : "-S"
      ].filter(I)
      return fork(reject)(resolve)(flexeca({ cwd: process.cwd() }, cmd, args))
    }) */
  })
}
