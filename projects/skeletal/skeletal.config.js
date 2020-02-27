const R = require("ramda")
const { trace } = require("xtrace")

module.exports = bones => {
  console.log("BONES", bones)
  bones.pattern({
    name: "PKG",
    prompts: [
      { type: "input", name: "name", message: "Module Name?" },
      { type: "input", name: "desc", message: "Description?" },
      {
        type: "input",
        name: "repo",
        message: "Repo?"
      },
      { type: "input", name: "author", message: "Author?" },
      { type: "input", name: "license", message: "License?" },
      { type: "confirm", name: "makePrivate", message: "Private?" },
      { type: "confirm", name: "isCLI", message: "CLI?" },
      { type: "input", name: "keywords", message: "Keywords?" },
      { type: "input", name: "deps", message: "Dependencies?" },
      { type: "input", name: "devDeps", message: "Dev Dependencies?" }
    ],
    actions: [
      {
        type: "add",
        path: "{{dashCase name}}/package.json",
        template: "templates/package-json.hbs"
      }
    ]
  })
}
