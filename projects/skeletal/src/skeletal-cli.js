import yargsParser from "yargs-parser"
import { slice, pipe, __ as $ } from "ramda"
import { trace } from "xtrace"
import { skeletal, fork } from "./skeletal"

const OPTS = {
  number: ["t"],
  string: ["n", "p"],
  default: { threads: 10, namespace: "skeletal" },
  alias: {
    pattern: ["p"],
    threads: ["t"],
    namespace: ["n"]
  }
}

pipe(
  slice(2, Infinity),
  z => yargsParser(z, OPTS),
  skeletal,
  fork(console.warn, console.log)
)(process.argv)
