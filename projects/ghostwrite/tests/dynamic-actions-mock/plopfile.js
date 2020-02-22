module.exports = skeletal => {
  // test with dynamic actions, regarding responses to prompts
  skeletal.setGenerator("dynamic-actions", {
    description: "another test using an actions function",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your name?",
        validate: value => {
          if (/.+/.test(value)) {
            return true
          }
          return "name is required"
        }
      },
      {
        type: "confirm",
        name: "yesPotatoes",
        message: "Do you want potatoes with your burger?"
      }
    ],
    actions: data => {
      const actions = [
        {
          type: "add",
          path: "src/{{dashCase name}}-burger.txt",
          templateFile: "bone-templates/burger.txt",
          abortOnFail: true
        }
      ]

      if (data.yesPotatoes) {
        actions.push({
          type: "add",
          path: "src/{{dashCase name}}-potatoes.txt",
          templateFile: "bone-templates/potatoes.txt",
          abortOnFail: true
        })
      }

      return actions
    }
  })
}
