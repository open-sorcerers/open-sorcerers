import { C, REGEX_HEX3, REGEX_HEX6 } from "./constants"

test("C", () => {
  expect(C).toMatchSnapshot()
})

test("REGEX_HEX3", () => {
  expect(REGEX_HEX3.test("cool")).toBeFalsy()
  expect(REGEX_HEX3.test("c00")).toBeTruthy()
})

test("REGEX_HEX6", () => {
  expect(REGEX_HEX6.test("yellow")).toBeFalsy()
  expect(REGEX_HEX6.test("0faced")).toBeTruthy()
})
