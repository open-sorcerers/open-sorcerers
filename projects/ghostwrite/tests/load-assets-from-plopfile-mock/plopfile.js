module.exports = (skeletal, config = {}) => {
  const cfg = Object.assign({ prefix: "" }, config)

  skeletal.setHelper(`${cfg.prefix}helper1`, t => `helper 1: ${t}`)
  skeletal.setHelper(`${cfg.prefix}helper2`, t => `helper 2: ${t}`)
  skeletal.setHelper(`${cfg.prefix}helper3`, t => `helper 3: ${t}`)

  skeletal.setPartial(`${cfg.prefix}partial1`, "partial 1: {{name}}")
  skeletal.setPartial(`${cfg.prefix}partial2`, "partial 2: {{name}}")
  skeletal.setPartial(`${cfg.prefix}partial3`, "partial 3: {{name}}")

  skeletal.setActionType(`${cfg.prefix}actionType1`, () => "test")

  const generatorObject = {
    actions: [{ type: "add", path: "src/{{name}}.txt" }]
  }
  skeletal.setGenerator(`${cfg.prefix}generator1`, generatorObject)
  skeletal.setGenerator(`${cfg.prefix}generator2`, generatorObject)
  skeletal.setGenerator(`${cfg.prefix}generator3`, generatorObject)
}
