import assert from "assert"

import { co } from "./index"

describe("co(gen, args)", () => {
  it("should pass the rest of the arguments", () => {
    return co(
      function* runnnner(num, str, arr, obj, fun) {
        assert(num === 42)
        assert(str === "forty-two")
        assert(arr[0] === 42)
        assert(obj.value === 42)
        assert(fun instanceof Function)
      },
      42,
      "forty-two",
      [42],
      { value: 42 },
      function unnamed() {}
    )
  })
})
