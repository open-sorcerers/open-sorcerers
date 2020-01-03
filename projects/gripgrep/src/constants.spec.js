import { KEYS, NIL } from "./constants"

test("KEYS", () => {
  expect(KEYS).toMatchSnapshot()
})

test("NIL", () => {
  expect(NIL).toMatchSnapshot()
})
