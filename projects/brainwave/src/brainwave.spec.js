import path from "path"
import { fork } from "fluture"
import { curry, keys } from "ramda"
import { brainwave } from "./brainwave"
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
