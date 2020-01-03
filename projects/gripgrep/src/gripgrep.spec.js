import F from "fluture"
import { prepFlags, gripgrep, handleCancelledCaseOr } from "./gripgrep"

test("gripgrep", done => {
  const MAGIC = "magic comment for a test"
  const lookupF = gripgrep({}, MAGIC.slice(0, 13))
  F.fork(done)(out => {
    expect(out).toMatchSnapshot()
    done()
  })(lookupF)
})

test.skip("gripgrep - globs", done => {
  const MAGIC = "fluture"
  const lookupF = gripgrep({ cwd: process.cwd(), globs: ["src/*.js"] }, MAGIC)
  F.fork(e => {
    console.log(">>E>E>>E>E", e)
    done(e)
  })(out => {
    expect(out).toEqual({})
    done()
  })(lookupF)
})

test("gripgrep - force object path", done => {
  const FORCE = "force push objects"
  const lookupF = gripgrep(false, FORCE)
  F.fork(done)(out => {
    expect(out).toMatchSnapshot()
    done()
  })(lookupF)
})

test("handleCancelledCaseOr", done => {
  const ff = handleCancelledCaseOr(done)({ isCancelled: true })
  F.fork(e => {
    expect(e).toEqual("Process was killed!")
    done()
  })(done)(ff)
})

test("prepFlags - regex", () => {
  const regex = "cool"
  const string = false
  const globs = []
  expect(prepFlags(regex, string, globs)).toMatchSnapshot()
})
