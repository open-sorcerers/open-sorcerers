import assert from "assert"
import { readFile as read } from "mz/fs"
import { co } from "./index"

describe("co() recursion", () => {
  it("should aggregate arrays within arrays", () => {
    return co(function* rayWithinRay() {
      const a = read("bequeath.js", "utf8")
      const b = read("LICENSE", "utf8")
      const c = read("package.json", "utf8")

      const res = yield [a, [b, c]]
      assert.equal(2, res.length)
      assert(~res[0].indexOf("exports"))
      assert.equal(2, res[1].length)
      assert(~res[1][0].indexOf("MIT"))
      assert(~res[1][1].indexOf("devDependencies"))
    })
  })

  it("should aggregate objects within objects", () => {
    return co(function* objWithinObj() {
      const a = read("bequeath.js", "utf8")
      const b = read("LICENSE", "utf8")
      const c = read("package.json", "utf8")

      const res = yield {
        0: a,
        1: {
          0: b,
          1: c
        }
      }

      assert(~res[0].indexOf("exports"))
      assert(~res[1][0].indexOf("MIT"))
      assert(~res[1][1].indexOf("devDependencies"))
    })
  })
})
