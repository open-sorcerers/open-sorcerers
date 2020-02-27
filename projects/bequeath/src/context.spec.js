import assert from "assert"

import { co } from "./index"

const ctx = {
  some: "thing"
}

describe("co.call(this)", () => {
  it("should pass the context", () => {
    return co.call(ctx, function* generator() {
      assert(ctx === this)
    })
  })
})
