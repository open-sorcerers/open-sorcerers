import assert from "assert"
import { readFile as read } from "mz/fs"
import { co } from "./index"

describe("co(* -> yield {})", () => {
  it("should aggregate several promises", () => {
    return co(function* aggregate() {
      const a = read("bequeath.js", "utf8")
      const b = read("LICENSE", "utf8")
      const c = read("package.json", "utf8")

      const res = yield {
        a: a,
        b: b,
        c: c
      }

      assert.equal(3, Object.keys(res).length)
      assert(~res.a.indexOf("exports"))
      assert(~res.b.indexOf("MIT"))
      assert(~res.c.indexOf("devDependencies"))
    })
  })

  it("should noop with no args", () => {
    return co(function* noopNargs() {
      const res = yield {}
      assert.equal(0, Object.keys(res).length)
    })
  })

  it("should ignore non-thunkable properties", () => {
    return co(function* unthinkable() {
      const foo = {
        name: { first: "tobi" },
        age: 2,
        address: read("package.json", "utf8"),
        tobi: new Pet("tobi"),
        now: new Date(),
        falsey: false,
        nully: null,
        undefiney: undefined
      }
      const res = yield foo
      assert.equal("tobi", res.name.first)
      assert.equal(2, res.age)
      assert.equal("tobi", res.tobi.name)
      assert.equal(foo.now, res.now)
      assert.equal(false, foo.falsey)
      assert.equal(null, foo.nully)
      assert.equal(undefined, foo.undefiney)
      assert(~JSON.parse(res.address).name.indexOf("bequeath"))
    })
  })

  it("should preserve key order", () => {
    const timedThunk = time => cb => {
      setTimeout(cb, time)
    }

    return co(function* preserveKey() {
      const before = {
        sun: timedThunk(30),
        rain: timedThunk(20),
        moon: timedThunk(10)
      }

      const after = yield before

      const orderBefore = Object.keys(before).join(",")
      const orderAfter = Object.keys(after).join(",")
      assert.equal(orderBefore, orderAfter)
    })
  })
})

/**
 * @example
 * @param name
 */
function Pet(name) {
  this.name = name
  this.something = () => {}
}
