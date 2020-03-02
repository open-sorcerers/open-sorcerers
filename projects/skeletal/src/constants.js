export const UNSET = `%UNSET%`

export const STRINGS = Object.freeze({
  // cli stuff
  debug: `debug`,
  force: `force`,
  init: `init`,
  namespace: `namespace`,
  pattern: `pattern`,
  silent: `silent`,
  threads: `threads`,
  verbose: `verbose`,
  // errors
  NO_CONFIG: `noConfig`
})

export const CLI_OPTIONS = Object.freeze({
  number: ["t"],
  string: ["n", "p", "I"],
  boolean: ["f", "w", "s", "d"],
  default: {
    [STRINGS.debug]: false,
    [STRINGS.force]: false,
    [STRINGS.init]: "",
    [STRINGS.namespace]: "skeletal",
    [STRINGS.silent]: false,
    [STRINGS.threads]: 10,
    [STRINGS.verbose]: false
  },
  alias: {
    [STRINGS.debug]: ["d"],
    [STRINGS.force]: ["f"],
    [STRINGS.init]: ["I"],
    [STRINGS.namespace]: ["n"],
    [STRINGS.pattern]: ["p"],
    [STRINGS.silent]: ["s"],
    [STRINGS.threads]: ["t"],
    [STRINGS.verbose]: ["w"]
  }
})
