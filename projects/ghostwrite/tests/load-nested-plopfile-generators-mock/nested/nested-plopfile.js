module.exports = function(skeletal) {
  "use strict"

  // adds 4 dashes around some text (yes es6/es2015 is supported)
  skeletal.setHelper("surround", text => "##### " + text + " #####")

  // setGenerator creates a generator that can be run with "skeletal generatorName"
  skeletal.setGenerator("basic-nested", {
    actions: [
      {
        type: "add",
        path: "src/nested-{{dashCase name}}.txt",
        templateFile: "bone-templates/nested-test.txt"
      }
    ]
  })
}
