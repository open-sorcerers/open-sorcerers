import path from "path"
import { fork } from "fluture"
import { prop, keys } from "ramda"
import { j2 } from "ensorcel"
import { brainwave } from "./brainwave"
const fixture = path.resolve(process.cwd(), "src", "fixture")

test("basic - no valid config", done => {
  const xxx = brainwave({
    basePath: fixture
  })
  fork(error => {
    expect(error.message).toEqual(
      "Expected to have brainwave config return a function!"
    )
    done()
  })(done)(xxx)
})

test("basic - cosmiconfig", done => {
  const xxx = brainwave({
    basePath: fixture,
    cosmiconfig: "example-brainwave"
  })
  fork(done)(yyy => {
    expect(keys(yyy)).toMatchSnapshot()
    expect(yyy.brains.map(prop("filepath"))).toMatchSnapshot()
    expect(keys(yyy.brains[0])).toMatchSnapshot()
    expect(yyy.brains[0].filepath).toMatchSnapshot()
    done()
  })(xxx)
})

test("basic - configFile", done => {
  const xxx = brainwave({
    basePath: fixture,
    configFile: path.resolve(__dirname, "..", "example-brainwave.config.js")
  })
  fork(done)(yyy => {
    expect(keys(yyy)).toMatchSnapshot()
    expect(yyy.brains.map(prop("filepath"))).toMatchSnapshot()
    expect(keys(yyy.brains[0])).toMatchSnapshot()
    expect(yyy.brains[0].filepath).toMatchSnapshot()
    done()
  })(xxx)
})
