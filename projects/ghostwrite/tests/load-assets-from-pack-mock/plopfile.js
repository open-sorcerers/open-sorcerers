module.exports = function(skeletal, config = {}) {
  const cfg = Object.assign({ prefix: "" }, config)

  // adds 4 dashes around some text (yes es6/es2015 is supported)
  skeletal.setHelper(`${cfg.prefix}helper1`, t => `helper 1: ${t}`)
  skeletal.setHelper(`${cfg.prefix}helper2`, t => `helper 2: ${t}`)
  skeletal.setHelper(`${cfg.prefix}helper3`, t => `helper 3: ${t}`)

  skeletal.setPartial(`${cfg.prefix}partial1`, "partial 1: {{name}}")
  skeletal.setPartial(`${cfg.prefix}partial2`, "partial 2: {{name}}")
  skeletal.setPartial(`${cfg.prefix}partial3`, "partial 3: {{name}}")

  // setGenerator creates a generator that can be run with "skeletal generatorName"
  skeletal.setGenerator(`${cfg.prefix}generator1`, {
    actions: [{ type: "add", path: "src/{{name}}.txt", template: "" }]
  })
  skeletal.setGenerator(`${cfg.prefix}generator2`, {
    actions: [{ type: "add", path: "src/{{name}}.txt", template: "" }]
  })
  skeletal.setGenerator(`${cfg.prefix}generator3`, {
    actions: [{ type: "add", path: "src/{{name}}.txt", template: "" }]
  })
}
