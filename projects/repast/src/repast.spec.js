import { readFile } from "torpor"
import { __, pipe, map, prop } from "ramda"
import { fork } from "fluture"
import { parseWithConfig } from "./parser"
import { parse } from "recast"

test("basic", done => {
  pipe(
    readFile(__, "utf8"),
    map(parseWithConfig({})),
    fork(done)(outcome => {
      expect(map(prop("signature"), outcome)).toMatchSnapshot()
      done()
    })
  )("./fixture/example.js")
})
