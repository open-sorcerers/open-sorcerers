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
    actions: [
      { type: "add", template: "templates/two.hbs", path: "two.output" }
    ]
  })
  bones.pattern({
    name: "madlib",
    prompts: [
      { type: "input", name: "place", message: "Place?" },
      { type: "input", name: "name", message: "Name of someone?" },
      { type: "input", name: "activity", message: "Activity?" },
      { type: "input", name: "otherPlace", message: "Another place?" },
      { type: "input", name: "noun1", message: "A noun?" },
      { type: "input", name: "verb1", message: "A verb?" },
      { type: "input", name: "verb2", message: "A second verb?" },
      { type: "input", name: "adjective1", message: "An adjective?" },
      { type: "input", name: "adjective2", message: "Another adjective?" }
    ],
    actions: [
      {
        type: "add",
        template: "templates/example-madlib.hbs",
        path: "{{paramCase adjective1}}-{{paramCase noun1}}.md"
      }
    ]
  })
}
