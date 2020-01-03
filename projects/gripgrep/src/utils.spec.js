import {
  expectType,
  yellUnless,
  box,
  orNil,
  isNil,
  KΩ,
  wrap,
  quote
} from "./utils"

test("box", () => {
  expect(box("...")).toEqual(["..."])
})

test("orNil", () => {
  expect(orNil("nothing", {})).toEqual("nil")
  expect(orNil("key", { key: "cool" })).toEqual("cool")
})

test("isNil", () => {
  expect(isNil(false)).toBeFalsy()
  expect(isNil("nil")).toBeTruthy()
})

test("KΩ", () => {
  const out = Math.round(Math.random() * 1e8)
  const set = KΩ(out)
  expect(set()).toEqual(out)
})
test("wrap", () => {
  expect(wrap("<>", "💩")).toEqual("<💩>")
})
test("quote", () => {
  expect(quote("😀")).toEqual("'😀'")
})

test("expectType", () => {
  expect(expectType("number", 2222)).toBeTruthy()
  expect(expectType("number", "nah")).toBeFalsy()
})

test("yellUnless - good path", done => {
  const response = yellUnless(done, "number", 2222)
  expect(response).toBeTruthy()
  done()
})

test("yellUnless - good path", done => {
  const cb = x => {
    expect(x).toEqual(
      `Expected to be given number but instead received (string)`
    )
    done()
  }
  const response = yellUnless(cb, "number", "twotwotwotwo")
  expect(response).toBeFalsy()
})
