import path from "path"
import { resolve, fork } from "fluture"
import { map, curry } from "ramda"
import {
  psychic,
  runTransformationWithWriter,
  reyaml,
  telepath,
  brainwave
} from "./brainwave"
const fixture = path.resolve(process.cwd(), "src", "fixture")

test("basic - no valid config", done => {
  const xxx = brainwave({ dryRun: true })
  fork(error => {
    expect(error.message).toEqual(
      "Expected to have brainwave config return a function! Have you run 'brainwave --init'?"
    )
    done()
  })(done)(xxx)
})
test("basic - config doesn't have telepathy and mindControl ", done => {
  const xxx = brainwave({ namespace: "example-brainwave2", dryRun: true })
  fork(error => {
    expect(error.message).toEqual(
      "Expected brainwave config to have one or more keys in: [control, telepathy]"
    )
    done()
  })(done)(xxx)
})

const truncateFromBrainwave = z => {
  return z.substr(z.indexOf("brainwave"))
}
const stripDateEdited = z =>
  z
    .split("\n")
    .filter(zz => !zz.includes("dateEdited"))
    .join("\n")

const runWithConfig = curry((config, done) => {
  const xxx = brainwave(config)
  fork(done)(yyy => {
    expect(stripDateEdited(yyy)).toMatchSnapshot()
    done()
  })(xxx)
})

test(
  "basic - namespace",
  runWithConfig({
    relativePath: true,
    root: fixture,
    namespace: "example-brainwave",
    dryRun: true
  })
)

test(
  "basic - configFile",
  runWithConfig({
    relativePath: true,
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
    expect(x).toMatchSnapshot()
    done()
  })(
    brainwave({
      relativePath: true,
      telepathy: true,
      root: fixture,
      namespace: "example-brainwave"
    })
  )
})

test("reyaml", () => {
  const input = "input!"
  const headContent = { a: { b: { c: { d: { cool: "so cool" } } } } }
  expect(reyaml(false, input, headContent)).toMatchSnapshot()
})

test("runTransformationWithWriter", done => {
  const writer = curry((p, content, __x) => resolve([p, content]))
  const forkable = runTransformationWithWriter(writer, {}, [
    {
      fileContent: "x",
      before: {},
      after: {},
      filepath: __dirname + "/fixture/cool/a.mdx"
    },
    {
      fileContent: "y",
      before: {},
      after: {},

      filepath: __dirname + "/fixture/cool/b.mdx"
    },
    {
      fileContent: "z",
      before: {},
      after: {},

      filepath: __dirname + "/fixture/cool/c.mdx"
    }
  ])
  fork(done)(x => {
    expect(x).toMatchSnapshot()
    done()
  })(forkable)
})

test("psychic", done => {
  const lig = { isCancelled: false, cancel: () => {}, loadOrSearch: () => {} }
  const bad = e => {
    expect(e.message).toEqual(
      "Cannot read property 'fantasy-land/map' of undefined"
    )
    done()
  }
  const config = {}
  psychic(lig, bad, config)
})
