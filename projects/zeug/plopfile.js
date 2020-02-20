const { pipe, map, join, split, prop } = require("ramda")
const { trace } = require("xtrace")
const { j2 } = require("ensorcel")

module.exports = plop => {
  plop.setHelper(
    "keyhelper",
    z => z.split(",")
    /* pipe(prop("keywords"), split(","), map(j2), join(",")) */
  )
  plop.setGenerator("pkg", {
    description: "make a package.json file",
    prompts: [
      { type: "input", name: "name", message: "package name?" },
      { type: "input", name: "desc", message: "description?" },
      {
        type: "input",
        name: "repo",
        message: "repo?"
      },
      { type: "input", name: "author", message: "author?" },
      { type: "input", name: "license", message: "license?" },
      { type: "confirm", name: "makePrivate", message: "private?" },
      { type: "confirm", name: "isCLI", message: "is this a CLI?" },
      { type: "input", name: "keywords", message: "keywords?" }
    ],
    actions: [
      {
        type: "add",
        path: "{{dashCase name}}/package.json",
        templateFile: "templates/package-json.hbs"
      }
    ]
  })
}
