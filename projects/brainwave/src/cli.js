/* import { trace } from "xtrace" */
import { pipe } from "ramda"
import parser from "yargs-parser"
import { brainwave } from "./brainwave"
import { NS, DR, CC, TK } from "./constants"

const OPTS = {
  boolean: ["d", "t"],
  default: { [DR]: false },
  alias: { [CC]: ["c"], [NS]: ["n"], [DR]: ["d"], [TK]: ["t"] }
}

export const cli = args => pipe(c => parser(c, OPTS), brainwave)(args)
