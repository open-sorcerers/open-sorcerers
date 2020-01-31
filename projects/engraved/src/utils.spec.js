import { memo, j2 } from "./utils"

test("memo - default", () => {
  let count = 0
  const x = aa => {
    count += 1
    return aa * aa * aa * aa * aa
  }
  expect(x()).toEqual(x())
  expect(count).not.toEqual(1)
})
test("memo", () => {
  let count = 0
  const y = aa => {
    count += 1
    return aa * aa * aa * aa * aa
  }
  const x = memo(y)
  expect(x()).toEqual(x())
  expect(count).toEqual(1)
})
test("j2", () => {
  expect(j2({ a: { b: { c: [123] } } })).toMatchSnapshot()
})
