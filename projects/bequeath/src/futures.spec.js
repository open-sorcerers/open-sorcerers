import { pipe } from "ramda"
import { Future, fork as rawFork } from "fluture"
import { tacit } from "ensorcel"
import { readFile as read } from "mz/fs"
import { willYield, co } from "./index"

const fork = tacit(3, rawFork)

describe("futures", () => {
  it("futures can be consumed", () => {
    return co(function* futurized() {
      const data = {
        cool: new Future((bad, good) => {
          setTimeout(() => good("yeah"), 100)
          return () => {}
        })
      }
      const res = yield data
      expect(res.cool).toEqual("yeah")
    })
  })
})

describe("future-mode", () => {
  it("future based interface", done => {
    const mortgage = willYield({ of: Future, reverse: true })

    const ff = mortgage(function* futureInterface() {
      const data = {
        cool: new Future((bad, good) => {
          setTimeout(() => good("yeah"), 100)
          return () => {}
        }),
        pkg: read("package.json", "utf8")
      }
      return yield data
    })
    fork(
      done,
      res => {
        expect(res.cool).toEqual("yeah")
        expect(JSON.parse(res.pkg).name).toEqual("bequeath")
        done()
      },
      ff
    )
  })
  it("is cancellable", done => {
    const mortgage = willYield({
      of: Future,
      reverse: true,
      cancel: args => {
        expect(args).toEqual([])
        done()
      }
    })
    const FF = mortgage(function* futureInterface() {
      const data = {
        cool: new Future((bad, good) => {
          // nothing
          setTimeout(() => bad(new Error("timeout")), 10e3)
        })
      }
      return yield data
    })
    const cancel = fork(done)(done)(FF)
    cancel()
  })

  it("is cancellable - no cancel fn", done => {
    const mortgage = willYield({
      of: Future,
      reverse: true
    })
    const FF = mortgage(function* futureInterface() {
      const data = {
        cool: new Future((bad, good) => {
          // nothing
          setTimeout(() => bad(new Error("timeout")), 10e3)
        })
      }
      return yield data
    })
    const cancel = fork(done)(done)(FF)
    pipe(cancel, () => done())()
  })
})
