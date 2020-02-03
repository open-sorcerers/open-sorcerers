import { freeze, j2, smooth, box } from "./utils"

test("freeze", () => {
  const input = { cool: "flat flat" }
  const output = freeze(input)

  expect(output).toEqual(input)

  expect(() => {
    output.f = 100
  }).toThrow()
})

test("j2", () => {
  expect(j2({ cool: "yes" })).toEqual(`{\n  "cool": "yes"\n}`)
})

test("smooth", () => {
  const input = "a b c d e f g h i j k    l m n o    p q   r s t u    v      w x y z"
    .split("")
    .map(x => x.trim())
  expect(smooth(input)).toEqual("abcdefghijklmnopqrstuvwxyz".split(""))
})

test("box", () => {
  const input = "100"
  expect(box(input)).toEqual(["100"])
  expect(box([input])).toEqual([["100"]])
})
