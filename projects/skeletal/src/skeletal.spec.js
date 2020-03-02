import { skeletal } from "./skeletal"
import { fork } from "./utils"

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
