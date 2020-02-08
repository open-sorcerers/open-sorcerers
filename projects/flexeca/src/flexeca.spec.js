import { fork as rawFork } from "fluture"
import { tacit } from "ensorcel"
import { flexeca } from "./flexeca"

const cmd = "node"
const cwd = process.cwd()
const runLocally = flexeca({ cwd }, cmd)

const fork = tacit(2, rawFork)

test("flexeca", done => {
  fork(
    done,
    e => {
      expect(e).toMatchSnapshot()
      done()
    },
    runLocally(["./src/fixture.js"])
  )
})

test("flexeca - slow", done => {
  fork(
    done,
    e => {
      expect(e).toMatchSnapshot()
      done()
    },
    runLocally(["./src/fixture2.js"])
  )
})

test("flexeca - error", done => {
  fork(
    e => {
      expect(e.shortMessage).toEqual(
        "Command failed with exit code 1: node ./src/not-a-file.js"
      )
      done()
    },
    done,
    runLocally(["./src/not-a-file.js"])
  )
})

test("flexeca - cancelled", done => {
  const cancel = fork(done, done, runLocally(["./src/fixture2.js"]))

  cancel()
  setTimeout(() => {
    done()
  }, 1)
})
