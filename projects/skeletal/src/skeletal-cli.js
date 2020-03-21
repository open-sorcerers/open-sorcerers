import yargsParser from "yargs-parser"
import { fork as rawFork } from "fluture"
import { slice, map } from "ramda"
import { trace } from "xtrace"
import { skeletal } from "./skeletal"
import { CLI_OPTIONS } from "./constants"
import { pipe, fork } from "./utils"

function bonedance(xxx) {
  setTimeout(() => {
    console.warn("Never finished!")
    process.exit(3)
  }, 10e3)
  return pipe(
    slice(2, Infinity),
    z => yargsParser(z, CLI_OPTIONS),
    skeletal,
    rawFork(e => {
      console.warn("crap!", e)
      process.exit(1)
    })(out => {
      console.log("done!", out)
      process.exit(0)
    })
  )(xxx)
}

bonedance(process.argv)
