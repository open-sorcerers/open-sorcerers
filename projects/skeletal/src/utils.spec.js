import { deepfreeze, cutAfterStringAdjust, austereStack } from "./utils"

test("deepfreeze", () => {
  const out = deepfreeze({
    a: {
      b: {
        c: {
          d: {
            e: {
              cool: "yes",
              dope: true,
              dumb: false,
              number: 420,
              date: new Date()
            }
          }
        }
      }
    }
  })
  expect(() => {
    out.b.c.d.e.cool = "nah"
  }).toThrow()
})

test("deepfreeze, already frozen", () => {
  const out = deepfreeze(
    deepfreeze({
      a: {
        b: {
          c: {
            d: {
              e: {
                cool: "yes",
                dope: true,
                dumb: false,
                number: 420,
                date: new Date()
              }
            }
          }
        }
      }
    })
  )
  expect(() => {
    out.b.c.d.e.cool = "nah"
  }).toThrow()
})

test("cutAfterStringAdjust", () => {
  expect(
    cutAfterStringAdjust(5, "node_modules", "coool/node_modules/$$$/dope")
  ).toEqual("dope")
})

test("austereStack", () => {
  const e = new Error("Computers are hard!")
  const b = austereStack(e)
  expect(e.stack).not.toEqual(b.stack)
  const eIsh = {
    stack: [
      "at node_modules/someplace/cool",
      "at node_modules/there/is/some",
      "at node_modules/software",
      "at node_modules/yes/yes, cool)"
    ].join("\n\t")
  }
  const c = austereStack(eIsh)
  expect(c.stack).toEqual(
    [
      "    at someplace/cool",
      "at there/is/some",
      "at software",
      "at yes/yes"
    ].join("\n    ")
  )
})
