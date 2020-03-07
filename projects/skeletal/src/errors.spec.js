import { error, ERROR } from "./errors"

test("error", () => {
  const output = error('spectest', 'This is a spectesterror', {cool: 'true'})
  expect(output).toMatchSnapshot()
})
test("ERROR", () => {
  expect(!!ERROR).toBeTruthy()
})
