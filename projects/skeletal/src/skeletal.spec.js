import { skeletal, fork } from "./skeletal"

test("skeletal - basic", done => {
  fork(
    done,
    out => {
      console.log("out", out)
      expect(out).toBeTruthy() // eventually
      done()
    },
    skeletal({
      namespace: "example-basic",
      pattern: data => {
        console.log("data", data)
        expect(data).toBeTruthy()
        expect(Object.keys(data)).toEqual(["?"])
        expect(data).toMatchSnapshot()
      }
    })
  )
})
