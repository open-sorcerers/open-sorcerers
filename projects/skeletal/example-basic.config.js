const R = require("ramda")
const { trace } = require("xtrace")

console.log("SKELETAL CONFIG")

module.exports = bones => {
  bones.pattern({
    name: "one",
    prompts: [
      { type: "input", name: "name", message: "Name?" },
      { type: "input", name: "response", message: "Message?" }
    ],
    actions: [
      { type: "add", template: "templates/one.hbs", path: "one.output" }
    ]
  })

  bones.pattern({
    name: "two",
    prompts: [
      { type: "input", name: "description", message: "Description?" },
      { type: "confirm", name: "bool", message: "Vrai ou faux?" },
      { type: "number", name: "num", message: "how many?" },
      {
        name: "consume",
        type: "list",
        choices: ["apples", "bananas", "cherries"],
        default: "cherries"
      }
    ],
    actions: [{ type: "add", template: "templates/two.hbs", path: 'two.output' }]
  })
}
