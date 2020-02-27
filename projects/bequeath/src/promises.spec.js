import assert from "assert"
import { co } from "./index"

/**
 * @example
 * @param val
 * @param err
 */
function getPromise(val, err) {
  return new Promise((resolve, reject) => {
    if (err) reject(err)
    else resolve(val)
  })
}

describe("co(* -> yield <promise>", () => {
  describe("with one promise yield", () => {
    it("should work", () => {
      return co(function* onePromiseYielder() {
        const a = yield getPromise(1)
        assert.equal(1, a)
      })
    })
  })

  describe("with several promise yields", () => {
    it("should work", () => {
      return co(function* severalPromiseYielder() {
        const a = yield getPromise(1)
        const b = yield getPromise(2)
        const c = yield getPromise(3)

        assert.deepEqual([1, 2, 3], [a, b, c])
      })
    })
  })

  describe("when a promise is rejected", () => {
    it("should throw and resume", () => {
      let error

      return co(function* resumable() {
        try {
          yield getPromise(1, new Error("boom"))
        } catch (err) {
          error = err
        }

        assert(error.message === "boom")
        const ret = yield getPromise(1)
        assert(ret === 1)
      })
    })
  })

  describe("when yielding a non-standard promise-like", () => {
    it("should return a real Promise", () => {
      assert(
        co(function* promisify() {
          yield { then: () => {} }
        }) instanceof Promise
      )
    })
  })
})

describe("co(function) -> promise", () => {
  it("return value", done => {
    co(() => {
      return 1
    }).then(data => {
      assert.equal(data, 1)
      done()
    })
  })

  it("return resolve promise", () => {
    return co(() => {
      return Promise.resolve(1)
    }).then(data => {
      assert.equal(data, 1)
    })
  })

  it("return reject promise", () => {
    return co(() => {
      return Promise.reject(1)
    }).catch(data => {
      assert.equal(data, 1)
    })
  })

  it("should catch errors", () => {
    return co(() => {
      throw new Error("boom")
    })
      .then(() => {
        throw new Error("nope")
      })
      .catch(err => {
        assert.equal(err.message, "boom")
      })
  })
})
