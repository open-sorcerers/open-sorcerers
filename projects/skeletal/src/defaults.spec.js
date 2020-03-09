import { fork } from "./utils"
import { nameVersion } from "./instance"

import { UTF8_NO_OVERWRITE, MADLIB, initialBoneFile } from "./defaults"
jest.mock("torpor")

const MOCKFILES = {
  "package.json": '{"name":"cool"}'
}

beforeEach(() => {
  require("torpor").__setMockFiles(MOCKFILES)
})

test("UTF8_NO_OVERWRITE", () => {
  expect(!!UTF8_NO_OVERWRITE).toBeTruthy()
})
test("MADLIB", () => {
  expect(!!MADLIB).toBeTruthy()
})
test("initialBoneFile", done => {
  expect(!!initialBoneFile).toBeTruthy()
  fork(
    done,
    e => {
      expect(e).toEqual(
        `🦴 ${nameVersion()} - Wrote initial config file to skeletal.config.js!
\tRun 'bone -p madlib' :)`
      )
      done()
    },
    initialBoneFile({})
  )
})

test("initialBoneFile - custom namespace", done => {
  expect(!!initialBoneFile).toBeTruthy()
  fork(
    done,
    e => {
      expect(e).toEqual(
        `🦴 ${nameVersion()} - Wrote initial config file to bonedance.config.js!
\tRun 'bone -n bonedance -p madlib' :)`
      )
      done()
    },
    initialBoneFile({ init: "bonedance" })
  )
})
test("initialBoneFile - should fail", done => {
  expect(!!initialBoneFile).toBeTruthy()
  fork(
    e => {
      expect(e).toEqual(
        `Unable to write file to skeletal.config.js, it may already exist?`
      )
      done()
    },
    done,
    initialBoneFile({ templatePath: "fail" })
  )
})
