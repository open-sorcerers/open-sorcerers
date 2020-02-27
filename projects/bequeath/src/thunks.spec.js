import assert from "assert"
import { co } from "./index"

/**
 * @example
 * @param val
 * @param err
 * @param error
 */
function get(val, err, error) {
  return done => {
    if (error) throw error
    setTimeout(() => {
      done(err, val)
    }, 10)
  }
}

describe("co(* -> yield fn(done))", () => {
  describe("with no yields", () => {
    it("should work", () => {
      return co(function* noYields() {})
    })
  })

  describe("with one yield", () => {
    it("should work", () => {
      return co(function* oneYield() {
        const a = yield get(1)
        assert.equal(1, a)
      })
    })
  })

  describe("with several yields", () => {
    it("should work", () => {
      return co(function* severalYields() {
        const a = yield get(1)
        const b = yield get(2)
        const c = yield get(3)

        assert.deepEqual([1, 2, 3], [a, b, c])
      })
    })
  })

  describe("with many arguments", () => {
    it("should return an array", () => {
      const exec = cmd => done => {
        done(null, "stdout", "stderr")
      }

      return co(function* manyArgs() {
        const out = yield exec("something")
        assert.deepEqual(out, ["stdout", "stderr"])
      })
    })
  })

  describe("when the function throws", () => {
    it("should be caught", () => {
      return co(function* onThrow() {
        try {
          yield get(1, null, new Error("boom"))
        } catch (err) {
          assert.equal("boom", err.message)
        }
      })
    })
  })

  describe("when an error is passed then thrown", () => {
    it("should only catch the first error only", () => {
      return co(function* catchFirst() {
        yield done => {
          done(new Error("first"))
          throw new Error("second")
        }
      }).then(
        () => {
          throw new Error("wtf")
        },
        err => {
          assert.equal("first", err.message)
        }
      )
    })
  })

  describe("when an error is passed", () => {
    it("should throw and resume", () => {
      let error

      return co(function* throwAndResume() {
        try {
          yield get(1, new Error("boom"))
        } catch (err) {
          error = err
        }

        assert(error.message === "boom")
        const ret = yield get(1)
        assert(ret === 1)
      })
    })
  })

  describe("with nested co()s", () => {
    it("should work", () => {
      const hit = []

      return co(function* nested() {
        const a = yield get(1)
        const b = yield get(2)
        const c = yield get(3)
        hit.push("one")

        assert.deepEqual([1, 2, 3], [a, b, c])

        yield co(function* nested2() {
          hit.push("two")
          const aa = yield get(1)
          const bb = yield get(2)
          const cc = yield get(3)

          assert.deepEqual([1, 2, 3], [aa, bb, cc])

          yield co(function* nested3() {
            hit.push("three")
            const aaa = yield get(1)
            const bbb = yield get(2)
            const ccc = yield get(3)

            assert.deepEqual([1, 2, 3], [aaa, bbb, ccc])
          })
        })

        yield co(function* nested4() {
          hit.push("four")
          const a4 = yield get(1)
          const b4 = yield get(2)
          const c4 = yield get(3)

          assert.deepEqual([1, 2, 3], [a4, b4, c4])
        })

        assert.deepEqual(["one", "two", "three", "four"], hit)
      })
    })
  })

  describe("return values", () => {
    describe("with a callback", () => {
      it("should be passed", () => {
        return co(function* passssss() {
          return [yield get(1), yield get(2), yield get(3)]
        }).then(res => {
          assert.deepEqual([1, 2, 3], res)
        })
      })
    })

    describe("when nested", () => {
      it("should return the value", () => {
        return co(function* nesttttttt() {
          const other = yield co(function* otheryield() {
            return [yield get(4), yield get(5), yield get(6)]
          })

          return [yield get(1), yield get(2), yield get(3)].concat(other)
        }).then(res => {
          assert.deepEqual([1, 2, 3, 4, 5, 6], res)
        })
      })
    })
  })

  describe("when yielding neither a function nor a promise", () => {
    it("should throw", () => {
      const errors = []

      return co(function* willThrow() {
        try {
          yield "something"
        } catch (err) {
          errors.push(err.message)
        }

        try {
          yield "something"
        } catch (err) {
          errors.push(err.message)
        }

        assert.equal(2, errors.length)
        const msg =
          "yield a future, function, promise, generator, array, or object"
        assert(~errors[0].indexOf(msg))
        assert(~errors[1].indexOf(msg))
      })
    })
  })

  describe("with errors", () => {
    it("should throw", () => {
      const errors = []

      return co(function* withErrors() {
        try {
          yield get(1, new Error("foo"))
        } catch (err) {
          errors.push(err.message)
        }

        try {
          yield get(1, new Error("bar"))
        } catch (err) {
          errors.push(err.message)
        }

        assert.deepEqual(["foo", "bar"], errors)
      })
    })

    it("should catch errors on .send()", () => {
      const errors = []

      return co(function* catchable() {
        try {
          yield get(1, null, new Error("foo"))
        } catch (err) {
          errors.push(err.message)
        }

        try {
          yield get(1, null, new Error("bar"))
        } catch (err) {
          errors.push(err.message)
        }

        assert.deepEqual(["foo", "bar"], errors)
      })
    })

    it("should pass future errors to the callback", () => {
      return co(function* future() {
        yield get(1)
        yield get(2, null, new Error("fail"))
        assert(false)
        yield get(3)
      }).catch(err => {
        assert.equal("fail", err.message)
      })
    })

    it("should pass immediate errors to the callback", () => {
      return co(function* immediate() {
        yield get(1)
        yield get(2, new Error("fail"))
        assert(false)
        yield get(3)
      }).catch(err => {
        assert.equal("fail", err.message)
      })
    })

    it("should catch errors on the first invocation", () => {
      return co(function* catchFirst() {
        throw new Error("fail")
      }).catch(err => {
        assert.equal("fail", err.message)
      })
    })
  })
})
