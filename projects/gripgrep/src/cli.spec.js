import { flag } from "./cli"

test("flag", () => {
  expect(flag("cool", "butts")).toEqual(["cool", "butts"])
})
