module.exports = skeletal => {
  // adds 4 dashes around some text (yes es6/es2015 is supported)
  skeletal.setHelper("surround", text => "---- " + text + " ----")

  // setGenerator creates a generator that can be run with "skeletal generatorName"
  skeletal.setGenerator("basic-add", {
    actions: [
      {
        type: "add",
        path: "src/{{dashCase name}}.txt",
        templateFile: "bone-templates/test.txt"
      }
    ]
  })

  skeletal.load("./nested/nested-bonefile.js")
}
