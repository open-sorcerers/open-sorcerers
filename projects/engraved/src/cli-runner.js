import { fork } from "fluture"
import { identity as I } from "ramda"

import { cli } from "./cli"

fork(I)(I)(cli(process.argv.slice(2)))
