module.exports = {
  scripts: {
    build: {
      script: "nps build.rollup",
      rollup: "rollup -c rollup.config.js",
      cli: "chmod 755 ./skeletal.js"
    },
    lint: "eslint ./src --fix",
    test: {
      script: "jest --verbose --coverage ",
      description: "run tests",
      watch: "jest --verbose --coverage --watchAll"
    }
  }
}
