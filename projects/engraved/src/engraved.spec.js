import F from "fluture"
import {
  render,
  engrave,
  testHex,
  constantColor,
  noHexLead,
  noParens,
  convert,
  unstring
} from "./engraved"

test("testHex", () => {
  expect(testHex("yellow")).toBeFalsy()
  expect(testHex("c0ffee")).toBeTruthy()
  expect(testHex("goo")).toBeFalsy()
  expect(testHex("600")).toBeTruthy()
})

test("constantColor", () => {
  expect(constantColor("butts")).toEqual("const $butts = 'butts'")
  expect(constantColor("c0ffee")).toEqual("const $c0ffee = '#c0ffee'")
})

test("noHexLead", () => {
  expect(noHexLead("#c0ffee")).toBeFalsy()
  expect(noHexLead("c0ffee")).toBeTruthy()
})

test("noParens", () => {
  expect(noParens("grand(parens")).toBeFalsy()
  expect(noParens("grand parens")).toBeTruthy()
})

test("convert", () => {
  expect(convert("#c0ffee")).toEqual("c0ffee")
  expect(convert("linear-gradient()")).toEqual("")
  expect(convert("lime")).toEqual("lime")
})

test("unstring", () => {
  expect(unstring('"cool": "$yaaaa"')).toEqual("cool: $yaaaa")
  expect(unstring('"cool": "chicken necks"')).toEqual('"cool": "chicken necks"')
})

test("engrave - flatten", () => {
  const output = engrave(
    true,
    { a: 1, b: 2, c: { d: { e: { f: { g: { h: 100 } } } } } },
    [["abc".split(""), "whatevertown"]]
  )
  expect(output).toEqual(`{
  "aBC": "whatevertown"
}`)
})

test("engrave - no flatten", () => {
  const output = engrave(
    false,
    { a: 1, b: 2, c: { d: { e: { f: { g: { h: 100 } } } } } },
    [["abc".split(""), "whatevertown"]]
  )
  expect(output).toEqual(`{
  "a": {
    "b": {
      "c": "whatevertown"
    }
  },
  "b": 2,
  "c": {
    "d": {
      "e": {
        "f": {
          "g": {
            "h": 100
          }
        }
      }
    }
  }
}`)
})

test("render", done => {
  const routes = [[["a"], "cool"]]
  const flatten = true
  const known = ["lime"]

  const consumer = out => {
    expect(out).toEqual(`const $lime = 'lime'

export default Object.freeze({
  "a": "cool"
})`)
    done()
  }
  const future = F.resolve({ known, routes, initial: {} })
  F.fork(done)(consumer)(render(flatten, future))
})
