module.exports = skeletal => {
  // setGenerator creates a generator that can be run with "skeletal generatorName"
  skeletal.setGenerator("add-many-strip-extensions", {
    description: "adds multiple files removing extensions",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your name?",
        validate: function(value) {
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
        destination: "src/",
        stripExtensions: ["hbs"],
        templateFiles: "bone-templates/remove-hbs/*",
        abortOnFail: true
      },
      {
        type: "addMany",
        destination: "src/",
        stripExtensions: true,
        templateFiles: "bone-templates/remove-all/*",
        abortOnFail: true
      }
    ]
  })
}
