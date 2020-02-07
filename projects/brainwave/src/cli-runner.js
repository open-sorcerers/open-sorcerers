import { fork } from "fluture"

import { cli } from "./cli"

fork(console.warn)(console.log)(cli(process.argv.slice(2)))
