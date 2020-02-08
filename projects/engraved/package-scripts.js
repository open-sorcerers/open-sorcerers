module.exports = {
  scripts: {
    build: {
      script: "nps build.rollup build.chmod",
      rollup: "rollup -c rollup.config.js",
      chmod: "chmod 755 ./engraved-cli.js"
    },
    lint: "eslint ./src --fix",
    test: {
      script: "jest --verbose --coverage ",
      description: "run tests",
      watch: "jest --verbose --coverage --watchAll"
    }
  }
}
