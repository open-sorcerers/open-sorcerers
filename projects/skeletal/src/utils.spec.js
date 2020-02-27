import { deepfreeze } from "./utils"

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
