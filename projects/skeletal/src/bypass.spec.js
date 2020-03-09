import { map } from "ramda"
import {
  propIsString,
  casedEqual,
  getChoiceValue,
  choiceMatchesValue,
  isFlag,
  flag,
  listTypeBypass,
  typeBypass,
  bypass
} from "./bypass"

test("propIsString", () => {
  expect(propIsString).toBeTruthy()
  expect(propIsString("no", { no: "true" })).toBeTruthy()
})
test("casedEqual", () => {
  expect(casedEqual).toBeTruthy()
  expect(casedEqual("EqUaLiTy", "equality")).toBeTruthy()
})

test("getChoiceValue", () => {
  expect(getChoiceValue).toBeTruthy()
})
test("choiceMatchesValue - matchesChoice", () => {
  expect(choiceMatchesValue).toBeTruthy()
  const cx = { value: "shibby" }
  const ix = "any"
  const val = "ShiBBy"
  expect(choiceMatchesValue(cx, ix, val)).toBeTruthy()
})

test("choiceMatchesValue - matchesKey", () => {
  expect(choiceMatchesValue).toBeTruthy()
  const cx = { key: "shibby" }
  const ix = "any"
  const val = "ShiBBy"
  expect(choiceMatchesValue(cx, ix, val)).toBeTruthy()
})

test("choiceMatchesValue - matchesIndex", () => {
  expect(choiceMatchesValue).toBeTruthy()
  const cx = {}
  const ix = 5
  const val = "5"
  expect(choiceMatchesValue(cx, ix, val)).toBeTruthy()
})

test("isFlag", () => {
  expect(isFlag).toBeTruthy()
  expect(isFlag("abcde".split(""), "A")).toBeTruthy()
  expect(isFlag("abcde".split(""), "F")).toBeFalsy()
})
test("flag", () => {
  expect(flag).toBeTruthy()
  expect(map(flag.isTrue)(["true", "t", "yes", "y"])).toEqual([
    true,
    true,
    true,
    true
  ])
  expect(map(flag.isFalse)(["false", "f", "no", "n"])).toEqual([
    true,
    true,
    true,
    true
  ])
  expect(flag.isPrompt("__")).toBeTruthy()
})
test("listTypeBypass", () => {
  expect(listTypeBypass).toBeTruthy()
  const value = "value"
  const prompt = { choices: ["value"] }
  expect(listTypeBypass(value, prompt)).toBeTruthy()
})
test("listTypeBypass - no choice", () => {
  expect(listTypeBypass).toBeTruthy()
  const value = "value"
  const prompt = { choices: [] }
  expect(listTypeBypass(value, prompt)).toBeFalsy()
})
test("typeBypass - confirm", () => {
  expect(typeBypass).toBeTruthy()
  expect(typeBypass.confirm).toBeTruthy()
  expect(typeBypass.confirm("true")).toBeTruthy()
  expect(typeBypass.confirm("n")).toBeFalsy()
  expect(() => {
    throw typeBypass.confirm("unknown")
  }).toThrow("Invalid input")
})

test("typeBypass - checkbox", () => {
  const input = "checkbox,love"
  const prompt = { choices: [] }
  const output = typeBypass.checkbox(input, prompt)
  expect(output.message).toEqual(`No match for "checkbox", "love"`)
})

test("typeBypass - checkbox with matches", () => {
  const input = "checkbox,love"
  const prompt = { choices: [{ value: "checkbox" }, { value: "love" }] }
  const output = typeBypass.checkbox(input, prompt)
  expect(output).toEqual("checkbox,love".split(","))
})
test("bypass - good path", () => {
  expect(bypass).toBeTruthy()
  const prompts = [
    { type: "input", name: "name", message: "name?" },
    { type: "input", name: "number", message: "favorite number?" },
    { type: "input", name: "noun", message: "(pro)noun?" }
  ]

  const hop = bypass(prompts)
  expect(hop(false)).toEqual([prompts, {}])
  expect(hop(["cool"])).toEqual([
    [{ ...prompts[0], default: "cool", when: false }, prompts[1], prompts[2]],
    { name: "cool" }
  ])
})

test("bypass - alternate path", () => {
  expect(bypass).toBeTruthy()
  const prompts = [
    { type: "input", name: "name", message: "name?" },
    { type: "input", when: () => {}, name: "tricky" },
    { type: "input", name: "number", message: "favorite number?" },
    { type: "input", name: "noun", message: "(pro)noun?" }
  ]

  const hop = bypass(prompts)
  expect(hop(false)).toEqual([prompts, {}])
  expect(hop(["___"])).toEqual([prompts, {}])
})

test("bypass - advanced path - bypass", () => {
  expect(bypass).toBeTruthy()
  const prompts = [
    {
      type: "input",
      name: "noun",
      message: "(pro)noun?",
      bypass: (aa, bb) => {
        expect(aa).toMatchSnapshot()
        expect(bb).toMatchSnapshot()
        return "ours"
      }
    }
  ]

  const hop = bypass(prompts)
  expect(hop(["yours"])).toEqual([
    [{ ...prompts[0], default: "ours", when: false }],
    { noun: "ours" }
  ])
})

test("bypass - advanced path - filter", () => {
  expect(bypass).toBeTruthy()
  const prompts = [
    {
      type: "input",
      name: "noun",
      message: "(pro)noun?",
      filter: vv => {
        expect(vv).toEqual("yours")
        return true
      }
    }
  ]

  const hop = bypass(prompts)
  expect(hop(["yours"])).toEqual([
    [{ ...prompts[0], default: true, when: false }],
    { noun: true }
  ])
})

test("bypass - advanced path - when function", () => {
  expect(bypass).toBeTruthy()
  const prompts = [
    {
      type: "input",
      name: "noun",
      message: "(pro)noun?",
      when: () => {}
    }
  ]

  const hop = bypass(prompts)
  expect(() => hop(["yours"])).toThrow("You cannot bypass conditional prompts.")
})

test("bypass - advanced path - validate function", () => {
  expect(bypass).toBeTruthy()
  const prompts = [
    {
      type: "input",
      name: "message",
      validate: () => true,
      message: "a message?"
    },
    {
      type: "input",
      name: "noun",
      message: "(pro)noun?",
      validate: () => false
    }
  ]

  const hop = bypass(prompts)
  expect(() => hop(["any message will do", "yours"])).toThrow(
    `"noun" did not pass validation.`
  )
})

test("bypass - advanced path - throwing function", () => {
  expect(bypass).toBeTruthy()
  const prompts = [
    {
      type: "input",
      name: "noun",
      message: "(pro)noun?",
      bypass: () => {
        throw new Error("BROKEN")
      }
    }
  ]

  const hop = bypass(prompts)
  expect(() => hop(["yours"])).toThrow(
    `The "noun" prompt didn't recognize "yours" as a valid input value. (ERROR: BROKEN)`
  )
})
