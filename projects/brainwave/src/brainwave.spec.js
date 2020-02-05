import path from "path"
import { resolve, fork } from "fluture"
import { curry, keys } from "ramda"
import { telepath, brainwave } from "./brainwave"
const fixture = path.resolve(process.cwd(), "src", "fixture")

test("basic - no valid config", done => {
  const xxx = brainwave({})
  fork(error => {
    expect(error.message).toEqual(
      "Expected to have brainwave config return a function!"
    )
    done()
  })(done)(xxx)
})
test("basic - config doesn't have telepathy and mindControl ", done => {
  const xxx = brainwave({ namespace: "example-brainwave2" })
  fork(error => {
    expect(error.message).toEqual(
      "Expected brainwave config to have one or more keys in: [control, telepathy]"
    )
    done()
  })(done)(xxx)
})

const runWithConfig = curry((config, done) => {
  const xxx = brainwave(config)
  fork(done)(yyy => {
    expect(keys(yyy)).toMatchSnapshot()
    const files = keys(yyy.brains)
    expect(files).toMatchSnapshot()
    expect(keys(yyy.brains[files[0]])).toMatchSnapshot()
    done()
  })(xxx)
})

test(
  "basic - namespace",
  runWithConfig({
    root: fixture,
    namespace: "example-brainwave"
  })
)

test(
  "basic - configFile",
  runWithConfig({
    root: fixture,
    configFile: path.resolve(__dirname, "..", "example-brainwave.config.js")
  })
)
test("telepath", done => {
  const cancel = () => {}
  const isCancelled = true
  const unaryF = () => resolve({})
  telepath(
    { cancel, isCancelled, loadOrSearch: unaryF },
    z => {
      expect(z.message).toEqual("Is cancelled!")
      done()
    },
    done,
    { namespace: "example-brainwave2" }
  )
})
test("brainwave - cancel", done => {
  const canceller = fork(done)(done)(brainwave({}))
  canceller()
  setTimeout(() => done(), 5)
})
