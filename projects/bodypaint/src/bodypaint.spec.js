import {
  makePainter,
  GAP,
  DEFAULT_BREAKPOINTS,
  useDefaultPainter,
  fillGaps,
  asRelativeUnit
} from "./bodypaint"

test("makePainter", () => {
  const input = {
    useMin: true,
    baseFontSize: 16,
    points: DEFAULT_BREAKPOINTS
  }
  const mq = makePainter(input)
  expect(
    mq({ color: ["red", GAP, "orange", GAP, GAP, "yellow", GAP, "green"] })
  ).toEqual(
    useDefaultPainter({
      color: ["red", GAP, "orange", GAP, GAP, "yellow", GAP, "green"]
    })
  )
  expect(
    makePainter({
      useMin: false,
      baseFontSize: 16,
      points: DEFAULT_BREAKPOINTS
    })
  ).toMatchSnapshot()
})

test("asRelativeUnit", () => {
  const ratio = x => x * 11
  const name = "levens"
  const points = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6
  }
  expect(asRelativeUnit(ratio, name, points)).toMatchSnapshot()
})

test("fillGaps", () => {
  const output = fillGaps({ one: 10, two: 20, three: 30, four: 40, five: 50 }, [
    "a",
    GAP,
    "b",
    GAP,
    "c"
  ])

  expect(output).toEqual(["a", "a", "b", "b", "c"])
})
