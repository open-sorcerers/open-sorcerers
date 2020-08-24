import path from "path"
import nopt from "nopt"
import { readFile } from "torpor"
import { fork } from "fluture"
import { prop, map, __, pipe } from "ramda"
import { L, FLAGS, nf } from "./constants"
import { parseWithConfig } from "./parser"
import { trace } from "xtrace"

const api = {
  [FLAGS.input]: String,
  [FLAGS.output]: String,
  [FLAGS.json]: Boolean
}

const shortflags = {
  i: nf([FLAGS.input]),
  o: nf([FLAGS.output]),
  j: nf([FLAGS.json])
}

const standardOut = fromStream =>
  fromStream ? console.log(fromStream) : console.log("Wrote file to output")

function cli(xx) {
  return pipe(
    // parse argv and turn into object
    vv => nopt(api, shortflags, vv, 2),
    config =>
      pipe(
        prop("input"),
        // read -i input
        readFile(__, L.utf8),
        // parse given nopt object
        map(parseWithConfig(config)),
        // barf or print
        fork(trace("bad"))(standardOut)
      )(config)
  )(xx)
}

cli(process.argv)
