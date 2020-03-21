/* import { trace } from "xtrace" */
import path from "path"
import { pipe } from "ramda"
import parser from "yargs-parser"
import { brainwave } from "./brainwave"
import { NS, FT, DR, CC, TK, RP, INIT, GLOB } from "./constants"

const OPTS = {
  boolean: "dirt".split(""),
  default: {
    [DR]: false,
    [RP]: true,
    [GLOB]: path.join("**", "*"),
    [FT]: "{md,mdx}"
  },
  alias: {
    [GLOB]: ["g"],
    [CC]: ["c"],
    [NS]: ["n"],
    [DR]: ["d"],
    [TK]: ["t"],
    [RP]: ["r"],
    [INIT]: ["i"],
    [FT]: ["f"]
  }
}

export const cli = args => pipe(c => parser(c, OPTS), brainwave)(args)
