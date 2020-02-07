import { fork } from "fluture"
import { identity as I } from "ramda"

import { cli } from "./cli"

fork(console.warn)(console.log)(cli(process.argv.slice(2)))
