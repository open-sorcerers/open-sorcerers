import path from "path"
import { pipe, map } from "ramda"
import { flexeca } from "flexeca"
import execa from "execa"
import { trace } from "xtrace"
import { fork as rawFork } from "fluture"
import { tacit } from "ensorcel"

const fork = tacit(2, rawFork)
const cwd = process.cwd()

test("no arguments", done => {
  console.log("deflexo", cwd)
  return execa("./bone-cli.js", [], { cwd })
    .catch(done)
    .then(out => {
      expect(out).toEqual("something")
      done()
    })
})
