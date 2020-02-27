import assert from "assert"
import { readFile as read } from "mz/fs"

import { co } from "./index"

describe("co(* -> yield [])", () => {
  it("should aggregate several promises", () => {
    return co(function* aggPro() {
      const a = read("bequeath.js", "utf8")
      const b = read("LICENSE", "utf8")
      const c = read("package.json", "utf8")

      const res = yield [a, b, c]
      assert.equal(3, res.length)
      assert(~res[0].indexOf("exports"))
      assert(~res[1].indexOf("MIT"))
      assert(~res[2].indexOf("devDependencies"))
    })
  })

  it("should noop with no args", () => {
    return co(function* noopNargs() {
      const res = yield []
      assert.equal(0, res.length)
    })
  })

  it("should support an array of generators", () => {
    return co(function* arrayOf() {
      const val = yield [
        (function* genGens() {
          return 1
        })()
      ]
      assert.deepEqual(val, [1])
    })
  })
})
