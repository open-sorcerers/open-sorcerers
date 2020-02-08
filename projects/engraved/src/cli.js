import fs from "fs"
import { writeFile } from "torpor"
import { Future as F, encaseP } from "fluture"
import { __ as $, map, ifElse, propOr, prop, curry, chain, pipe } from "ramda"
import parser from "yargs-parser"
import getStdin from "get-stdin"
import { custom } from "./index"

const readStdin = encaseP(getStdin)

// read a file in the Future
const read = x =>
  new F((bad, good) => {
    fs.readFile(x, "utf8", (e, o) => (e ? bad(e) : good(o)))
    return () => {}
  })

const OPTS = {
  boolean: [
    "f", // flatten
    "c" // compare
  ],
  default: { flatten: true, compare: true },
  alias: { input: ["i"], output: ["o"], flatten: ["f"], compare: ["c"] }
}

const readJSON = jj => JSON.parse(jj)

export const cli = args => {
  const config = parser(args, OPTS)
  const generateTheme = custom(config)
  return pipe(
    ifElse(
      propOr(false, "input"),
      pipe(prop("input"), read, map(readJSON)),
      readStdin
    ),
    chain(generateTheme),
    map(theme =>
      ifElse(
        propOr(false, "output"),
        pipe(prop("output"), writeFile($, theme, "utf8")),
        () => {
          console.log(theme)
          return ""
        }
      )(config)
    )
  )(config)
}
