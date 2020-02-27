import { isGeneratorFunction } from "./index"

test("isGeneratorFunction", () => {
  expect(isGeneratorFunction).toBeTruthy()
  const genGen = function* generator() {
    return yield 4
  }
  expect(isGeneratorFunction(genGen)).toBeTruthy()
  expect(isGeneratorFunction(() => {})).toBeFalsy()
  expect(isGeneratorFunction(Date)).toBeFalsy()
  expect(isGeneratorFunction({ constructor: false })).toBeFalsy()
})
