import assert from "assert"
import { co } from "./index"

describe("co.wrap(fn*)", () => {
  it("should pass context", () => {
    const ctx = {
      some: "thing"
    }

    return co
      .wrap(function* wrapWrap() {
        assert.equal(ctx, this)
      })
      .call(ctx)
  })

  it("should pass arguments", () => {
    return co.wrap(function* passPass(a, b, c) {
      assert.deepEqual([1, 2, 3], [a, b, c])
    })(1, 2, 3)
  })

  it("should expose the underlying generator function", () => {
    const wrapped = co.wrap(function* expose(a, b, c) {
      return a * b * c
    })
    const source = Object.toString.call(wrapped.__generatorFunction__)
    assert(
      source.indexOf("regenerator") > -1 || source.indexOf("function*") > -1
    )
  })
})
