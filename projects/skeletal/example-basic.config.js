const R = require("ramda")
const { trace } = require("xtrace")

console.log("SKELETAL CONFIG")

module.exports = bones => {
  console.log("RAWR", bones)
  bones.pattern({
    name: "one",
    prompts: [{ type: "input", name: "name", message: "Name?" }],
    actions: [{ type: "add", template: "one.hbs" }]
  })

  bones.pattern({
    name: "two",
    prompts: [
      { type: "input", name: "description", message: "Description?" },
      { type: "confirm", name: "bool", message: "Vrai ou faux?" }
    ],
    actions: [{ type: "add", template: "two.hbs" }]
  })
  return { chimichanga: "yass" }
}
