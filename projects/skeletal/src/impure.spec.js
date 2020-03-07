import { pushInto, saveKeyed } from "./impure"
test("pushInto", () => {
  let x = 0
  const inc = () => (x += 1)
  const into = []
  expect(!!pushInto).toBeTruthy()
  expect(pushInto(into, inc)("whatever")).toEqual(1)
  expect(into).toEqual([1])
  expect(pushInto(into, inc)("whatever")).toEqual(2)
  expect(into).toEqual([1, 2])
})
test("saveKeyed", () => {
  const x = 0
  const maker = xx => {
    xx += 1
    return ["name" + xx, xx]
  }
  const struct = {}
  expect(saveKeyed(struct, maker, x)).toEqual(1)
  expect(!!saveKeyed).toBeTruthy()
})
