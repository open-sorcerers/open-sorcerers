module.exports = skeletal => {
  skeletal.setGenerator("make-list", {
    actions: [
      {
        type: "add",
        path: "src/{{listName}}.txt",
        template: ""
      }
    ]
  })

  skeletal.setGenerator("append-to-list", {
    description: "adds entry to a list",
    actions: [
      {
        type: "append",
        path: "src/{{listName}}.txt",
        template: "{{name}}"
      }
    ]
  })
}
