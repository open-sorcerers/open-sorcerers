import {
  gaplessPlayback,
  makePainter,
  GAP,
  DEFAULT_BREAKPOINTS,
  bodypaint,
  fillGaps,
  asRelativeUnit
} from "./bodypaint"

const RAW_ARRAY_STYLE = {
  color: ["red", "orange", GAP, GAP, "yellow"],
  svg: {
    fill: ["lime", GAP, GAP, GAP, GAP, "blue"]
  },
  "&:hover": {
    svg: {
      fill: ["cyan", GAP, GAP, GAP, GAP, GAP, "magenta"]
    }
  }
}

const RAW = {
  color: {
    XT: "red",
    T: "orange",
    XS: "yellow"
  },
  svg: {
    fill: {
      XT: "lime",
      S: "blue"
    }
  },
  "&:hover": {
    svg: { fill: { XT: "cyan", XXM: "magenta" } }
  }
}

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
    bodypaint({
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

test("makePainter - nested", () => {
  const input = {
    useMin: true,
    baseFontSize: 16,
    points: DEFAULT_BREAKPOINTS,
    implicit: true
  }

  const arrayStyleOutput = bodypaint(RAW_ARRAY_STYLE)
  expect(arrayStyleOutput).toMatchSnapshot()
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

test("gaplessPlayback", () => {
  const points = { ONE: 100, TWO: 200, THREE: 300, FOUR: 400, FUNDY: 500 }
  const simple = {
    margin: { ONE: 0, THREE: "5vw" }
  }
  const output = gaplessPlayback(points, simple)
  expect(output).toEqual({
    margin: [0, GAP, "5vw"]
  })
})

test("gaplessPlayback - nested", () => {
  const points = { ONE: 100, TWO: 200, THREE: 300, FOUR: 400, FUNDY: 500 }
  const nested = {
    margin: { ONE: 0, THREE: "5vw" },
    padding: {
      ONE: "1rem",
      FUNDY: "10px"
    },
    "&:hover": {
      padding: { ONE: "2rem", FUNDY: "20px" }
    }
  }
  const output = gaplessPlayback(points, nested)
  expect(output).toEqual({
    margin: [0, GAP, "5vw"],
    padding: ["1rem", GAP, GAP, GAP, "10px"],
    "&:hover": {
      padding: ["2rem", GAP, GAP, GAP, "20px"]
    }
  })
})

test("gaplessPlayback - complex", () => {
  const points = { ONE: 100, TWO: 200, THREE: 300, FOUR: 400, FUNDY: 500 }
  const complex = {
    margin: { ONE: 0, TWO: "5vw", FOUR: "10vw" },
    padding: {
      ONE: "1rem",
      THREE: "2rem",
      FUNDY: "10px"
    },
    svg: { fill: { ONE: "purple", THREE: "lime" } },
    "&:hover": {
      padding: { ONE: "2rem", TWO: "222px", FUNDY: "20px" },
      svg: {
        fill: { ONE: "yellow", FOUR: "red" }
      }
    }
  }
  const output = gaplessPlayback(points, complex)
  expect(output).toEqual({
    margin: [0, "5vw", GAP, "10vw"],
    padding: ["1rem", GAP, "2rem", GAP, "10px"],
    svg: { fill: ["purple", GAP, "lime"] },
    "&:hover": {
      padding: ["2rem", "222px", GAP, GAP, "20px"],
      svg: { fill: ["yellow", GAP, GAP, "red"] }
    }
  })
})

test("makePainter - implicit", () => {
  const input = {
    useMin: true,
    baseFontSize: 16,
    points: DEFAULT_BREAKPOINTS,
    implicit: true
  }
  const customPainter = makePainter(input)
  const output = customPainter(RAW)
  const arrayStyleOutput = bodypaint(RAW_ARRAY_STYLE)
  expect(output).toEqual(arrayStyleOutput)
  expect(output).toMatchSnapshot()
})
