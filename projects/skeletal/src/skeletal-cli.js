import yargsParser from "yargs-parser"
import { slice, pipe, __ as $ } from "ramda"
import { trace } from "xtrace"
import { skeletal, fork } from "./skeletal"

const OPTS = {
  number: ["t"],
  string: ["n"],
  default: { threads: 10, namespace: "skeletal" },
  alias: {
    threads: ["t"],
    namespace: ["n"]
  }
}

pipe(
  slice(2, Infinity),
  z => yargsParser(z, OPTS),
  trace("uhhhh"),
  skeletal,
  fork(console.warn, console.log)
)(process.argv)
