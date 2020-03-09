import { resolve } from "fluture"
import {
  mergePreAnswers,
  handleUnpromptedAnswers,
  validatePatternAndSubmit,
  sequentialResolve,
  pattern
} from "./pattern"
import { fork } from "./utils"

jest.mock("inquirer")

test("validatePatternAndSubmit - good path", done => {
  expect(!!validatePatternAndSubmit).toBeTruthy()
  const raw = { name: "name", prompts: [], actions: [] }
  validatePatternAndSubmit(
    done,
    xxx => {
      expect(xxx).toEqual(raw)
      done()
    },
    raw
  )
})
test("sequentialResolve", done => {
  expect(!!sequentialResolve).toBeTruthy()
  const list = [
    resolve({ a: "albatross" }),
    resolve({ b: "badger" }),
    resolve({ c: "cougar" })
  ]
  const out = sequentialResolve(list)
  fork(
    done,
    xxx => {
      expect(xxx).toEqual({ a: "albatross", b: "badger", c: "cougar" })
      done()
    },
    out
  )
})
test("pattern", done => {
  expect(!!pattern).toBeTruthy()
  const ligature = {
    cancel: () => {},
    config: { _: ["eine"] }
  }
  const raw = {
    name: "houndstooth",
    prompts: [
      { type: "input", name: "one", message: "one?" },
      { type: "input", name: "two", message: "two?" },
      { type: "input", name: "three", message: "three?" }
    ],
    actions: []
  }
  const [name, futurePrompt] = pattern(ligature, raw)
  expect(name).toEqual(raw.name)
  fork(
    done,
    xxx => {
      expect(xxx).toEqual({
        name: "houndstooth",
        prompts: [
          {
            type: "input",
            name: "one",
            message: "one?",
            default: "eine",
            when: false
          },
          { type: "input", name: "two", message: "two?" },
          { type: "input", name: "three", message: "three?" }
        ],
        actions: [],
        preAnswered: { one: "eine" },
        answers: { one: "eine", answer: "cool" }
      })
      done()
    },
    futurePrompt
  )
})
test("mergePreAnswers", () => {
  const given = {}
  const answers = {}
  expect(mergePreAnswers(given, answers)).toEqual({ answers: {} })
})

test("pattern - no pre-answers", done => {
  expect(!!pattern).toBeTruthy()
  const ligature = {
    cancel: () => {}
  }
  const raw = {
    name: "houndstoothtest",
    prompts: [
      { type: "input", name: "onetest", message: "one?" },
      { type: "input", name: "twotest", message: "two?" },
      { type: "input", name: "threetest", message: "three?" }
    ],
    actions: [],
    test: true
  }
  const [name, futurePrompt] = pattern(ligature, raw)
  expect(name).toEqual(raw.name)
  fork(
    done,
    xxx => {
      expect(xxx).toEqual({
        name: "houndstoothtest",
        prompts: [
          {
            type: "input",
            name: "onetest",
            message: "one?"
          },
          { type: "input", name: "twotest", message: "two?" },
          { type: "input", name: "threetest", message: "three?" }
        ],
        actions: [],
        answers: {},
        preAnswered: {}
      })
      done()
    },
    futurePrompt
  )
})

test("handleUnpromptedAnswers", done => {
  expect(!!handleUnpromptedAnswers).toBeTruthy()
  const ligature = { config: { _: "abc".split("") } }
  const raw = {
    name: "check",
    prompts: [
      { type: "input", name: "one", message: "one?" },
      { type: "input", name: "two", message: "two?" },
      { type: "input", name: "three", message: "three?" }
    ],
    actions: []
  }
  const rawF = resolve(raw)
  fork(
    done,
    out => {
      expect(out).toEqual({
        actions: [],
        name: "check",
        preAnswered: { one: "a", two: "b", three: "c" },
        prompts: [
          { ...raw.prompts[0], default: "a", when: false },
          { ...raw.prompts[1], default: "b", when: false },
          { ...raw.prompts[2], default: "c", when: false }
        ]
      })
      done()
    },
    handleUnpromptedAnswers(ligature, rawF)
  )
})
