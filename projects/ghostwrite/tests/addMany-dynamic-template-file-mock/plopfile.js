module.exports = skeletal => {
  // setGenerator creates a generator that can be run with "skeletal generatorName"
  skeletal.setGenerator("dynamic-template-add-many", {
    description: "adds multiple files using dynamic templates",
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
      },
      {
        type: "list",
        name: "kind",
        message: "What kind of widget do you want to create?",
        choices: ["LineChart", "BarChart"]
      }
    ],
    actions: [
      {
        type: "addMany",
        destination: "src/{{dashCase name}}-{{dashCase kind}}/",
        templateFiles: [
          "bone-templates/{{dashCase kind}}/*",
          "bone-templates/{{dashCase kind}}/helpers/\\{{dashCase name}}.js"
        ],
        base: "bone-templates/{{dashCase kind}}",
        abortOnFail: true
      }
    ]
  })
}
