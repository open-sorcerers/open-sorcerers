import yargsParser from "yargs-parser"
import { split, map, when, includes, join, slice, pipe } from "ramda"
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
  fork(e => {
    e.stack = pipe(
      split("\n"),
      map(
        when(
          includes("node_modules"),
          z =>
            "    at " + z.slice(z.indexOf("node_modules") + 13).replace(")", "")
        )
      ),
      join("\n")
    )(e.stack)
    console.warn(e.stack)
  }, console.log)
)(process.argv)
