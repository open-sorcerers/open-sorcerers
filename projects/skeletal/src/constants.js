export const CLI_OPTIONS = Object.freeze({
  number: ["t"],
  string: ["n", "p"],
  boolean: ["f", "w", "s", "d"],
  default: {
    force: false,
    threads: 10,
    namespace: "skeletal",
    verbose: false,
    silent: false
  },
  alias: {
    debug: ["d"],
    verbose: ["w"],
    silent: ["s"],
    force: ["f"],
    pattern: ["p"],
    threads: ["t"],
    namespace: ["n"]
  }
})
