import { bakedIn, bakeIn, enbaken } from "./helpers"
import { once } from "ramda"
test("enbaken", done => {
  const call = once((a, b) => {
    expect(a).toEqual("capitalCase")
    expect(typeof b).toEqual("function")
    done()
  })
  enbaken(call)(undefined)
})
test("bakedIn", () => {
  expect(!!bakedIn).toBeTruthy()
})
test("bakeIn", () => {
  expect(!!bakeIn).toBeTruthy()
})
