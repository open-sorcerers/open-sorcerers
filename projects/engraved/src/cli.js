import fs from "fs"
import { Future as F, encaseP } from "fluture"
import { map, ifElse, propOr, prop, curry, chain, pipe } from "ramda"
import parser from "yargs-parser"
import stdin from "get-stdin"
import { custom } from "./index"

const readStdin = encaseP(stdin)

// read a file in the Future
const read = x =>
  new F((bad, good) => {
    fs.readFile(x, "utf8", (e, o) => (e ? bad(e) : good(o)))
    return () => {}
  })
// write a file in the Future
const write = curry(
  (fd, data) =>
    new F((bad, good) => {
      fs.writeFile(fd, data, "utf8", (e, f) => (e ? bad(e) : good(f)))
      return () => {}
    })
)

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
      ifElse(propOr(false, "output"), pipe(prop("output"), write), () => {
        console.log(theme)
        return ""
      })(config)
    )
  )(config)
}
