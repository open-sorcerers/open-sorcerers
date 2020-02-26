module.exports = function(skeletal) {

  skeletal.setGenerator("dynamic-template-add", {
    description: "adds a file using a dynamic template",
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
        type: "add",
        path: "src/{{dashCase name}}.txt",
        templateFile: "bone-templates/{{dashCase kind}}.txt",
        abortOnFail: true
      },
      {
        type: "add",
        path: "src/change-me.txt",
        templateFile: "bone-templates/change-me.txt"
      },
      {
        type: "modify",
        path: "src/change-me.txt",
        pattern: /(-- APPEND ITEMS HERE --)/gi,
        templateFile: "bone-templates/{{dashCase kind}}.txt"
      }
    ]
  })
}