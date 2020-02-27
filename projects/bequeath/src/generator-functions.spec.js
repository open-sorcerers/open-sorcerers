import assert from "assert"
import { co } from "./index"

/**
 * @example
 * @param ms
 */
function sleep(ms) {
  return done => {
    setTimeout(done, ms)
  }
}

/**
 * @example
 */
function* work() {
  yield sleep(50)
  return "yay"
}

describe("co(fn*)", () => {
  describe("with a generator function", () => {
    it("should wrap with co()", () => {
      return co(function* doWork() {
        const a = yield work
        const b = yield work
        const c = yield work

        assert(a === "yay")
        assert(b === "yay")
        assert(c === "yay")

        const res = yield [work, work, work]
        assert.deepEqual(["yay", "yay", "yay"], res)
      })
    })

    it("should catch errors", () => {
      return co(function* whatTheBoom() {
        yield function* boom() {
          throw new Error("boom")
        }
      }).then(
        () => {
          throw new Error("wtf")
        },
        err => {
          assert(err)
          assert(err.message === "boom")
        }
      )
    })
  })
})
