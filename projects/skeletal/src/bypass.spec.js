import { combineBypassData } from "./bypass"

test("combineBypassData", () => {
  const gen = {
    description: "basic",
    prompts: [{ type: "confirm", name: "cool" }],
    actions: []
  }
  const bypassArr = []
  const skeletalArgV = { cool: "???" }

  const out = combineBypassData(gen, bypassArr, skeletalArgV)
  expect(out).toEqual("?")
})
