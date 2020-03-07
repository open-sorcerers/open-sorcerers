import { nameVersion, nameAndVersion } from "./instance"
test("nameAndVersion", () => {
  expect(!!nameAndVersion).toBeTruthy()
})
test("nameVersion", () => {
  expect(!!nameVersion).toBeTruthy()
})
