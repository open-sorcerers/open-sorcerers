import { skeletal, fork } from "./skeletal"

test("skeletal - basic", done => {
  fork(
    done,
    out => {
      console.log("OUTPUT", out)
      expect(Object.keys(out)).toMatchSnapshot()
      done()
    },
    skeletal({
      namespace: "example-basic"
    })
  )
})
