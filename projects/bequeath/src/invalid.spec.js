import assert from "assert"
import { co } from "./index"

describe("yield <invalid>", () => {
  it("should throw an error", () => {
    return co(function* cool() {
      try {
        yield null
        throw new Error("lol")
      } catch (err) {
        assert(err instanceof TypeError)
        assert(~err.message.indexOf("You may only yield"))
      }
    })
  })
})
