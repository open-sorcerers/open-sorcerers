module.exports = {
  scripts: {
    build: "rollup -c rollup.config.js",
    lint: "eslint ./src --fix",
    test: {
      script: "jest --verbose --coverage ",
      description: "run tests",
      watch: "jest --verbose --coverage --watchAll"
    }
  }
}
