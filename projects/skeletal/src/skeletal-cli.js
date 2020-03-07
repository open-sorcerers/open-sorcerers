import yargsParser from "yargs-parser"
import { pipe, slice } from "ramda"
import { skeletal } from "./skeletal"
import { CLI_OPTIONS } from "./constants"
import { austereStack, fork } from "./utils"

pipe(
  slice(2, Infinity),
  z => yargsParser(z, CLI_OPTIONS),
  skeletal,
  fork(
    e => {
      pipe(austereStack, console.warn)(e)
      process.exit(1)
    },
    out => {
      console.log(out)
      process.exit(0)
    }
  )
)(process.argv)
