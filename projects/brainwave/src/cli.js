/* import { trace } from "xtrace" */
import { pipe } from "ramda"
import parser from "yargs-parser"
import { brainwave } from "./brainwave"
import { NS, DR, CC, TK, RP, INIT } from "./constants"

const OPTS = {
  boolean: ["d", "t", "r", 'i'],
  default: { [DR]: false, [RP]: true },
  alias: { [CC]: ["c"], [NS]: ["n"], [DR]: ["d"], [TK]: ["t"], [RP]: ["r"], [INIT]: ['i'] }
}

export const cli = args => pipe(c => parser(c, OPTS), brainwave)(args)
