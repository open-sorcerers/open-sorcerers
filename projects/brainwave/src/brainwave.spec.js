import path from "path"
import { resolve, fork } from "fluture"
import { mergeRight, map, omit, curry, keys } from "ramda"
import { reyaml, telepath, brainwave } from "./brainwave"
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

const omitATime = omit(["atime", "atimeMs"])
const omitATimeAllOver = x =>
  mergeRight(omitATime(x), x.stats ? { stats: omitATime(x.stats) } : {})
const truncateFromBrainwave = z => {
  return z.substr(z.indexOf("brainwave"))
}
const runWithConfig = curry((config, done) => {
  const xxx = brainwave(config)
  fork(done)(yyy => {
    const keyed = keys(yyy)
    const out = keyed.map(truncateFromBrainwave)
    expect(out).toMatchSnapshot()
    expect(keys(yyy[keyed[0]])).toMatchSnapshot()
    expect(omit(["dateEdited"], yyy[keyed[0]].after)).toMatchSnapshot()
    done()
  })(xxx)
})

test(
  "basic - namespace",
  runWithConfig({
    root: fixture,
    namespace: "example-brainwave",
    dryRun: true
  })
)

test(
  "basic - configFile",
  runWithConfig({
    root: fixture,
    configFile: path.resolve(__dirname, "..", "example-brainwave.config.js"),
    dryRun: true
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
  const canceller = fork(done)(done)(brainwave({ dryRun: true }))
  canceller()
  setTimeout(() => done(), 1)
})

test("brainwave - telepathy", done => {
  fork(done)(x => {
    expect(map(map(truncateFromBrainwave))(x)).toMatchSnapshot()
    done()
  })(
    brainwave({
      telepathy: true,
      root: fixture,
      namespace: "example-brainwave",
      dryRun: true
    })
  )
})

test("reyaml", () => {
  const input = "input!"
  const headContent = { a: { b: { c: { d: { cool: "so cool" } } } } }
  expect(reyaml(input, headContent)).toMatchSnapshot()
})
