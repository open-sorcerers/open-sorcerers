module.exports = skeletal => {
  // setGenerator creates a generator that can be run with "skeletal generatorName"
  skeletal.setGenerator("multiple-adds", {
    description: "adds multiple files from a glob",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your name?",
        validate: function validate(value) {
          if (/.+/.test(value)) {
            return true
          }
          return "name is required"
        }
      }
    ],
    actions: [
      {
        type: "addMany",
        destination: "src/{{dashCase name}}/",
        templateFiles: "bone-templates/**/*.txt",
        abortOnFail: true
      },
      {
        type: "addMany",
        destination: "src/base-{{dashCase name}}/",
        templateFiles: "bone-templates/**/*.txt",
        base: "bone-templates/nested-folder/",
        abortOnFail: true
      },
      {
        type: "addMany",
        destination: "src/components",
        templateFiles: "bone-templates/components/**/*",
        base: "bone-templates/components/logic",
        abortOnFail: true
      },
      {
        type: "addMany",
        destination: "src/array-{{dashCase name}}/",
        templateFiles: [
          "bone-templates/*.txt",
          "bone-templates/nested-folder/*.txt"
        ],
        base: "bone-templates/",
        abortOnFail: true
      },
      {
        type: "addMany",
        destination: "src/{{dashCase name}}-dot/",
        templateFiles: () => "bone-templates/*",
        globOptions: { dot: true },
        abortOnFail: true
      }
    ]
  })
}
