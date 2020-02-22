module.exports = function(skeletal) {
  // test with dynamic actions, regarding responses to prompts
  skeletal.setGenerator("dynamic-prompt", {
    description: "A test using a dynamic prompt defined by a function",
    prompts: () => {
      return Promise.resolve({
        promptArgs: arguments,
        promptFunctionCalled: true
      })
    },
    actions: () => {
      return []
    }
  })
}
