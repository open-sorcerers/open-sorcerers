import { cosmicConfigurate, configure } from "./configure"
import { once } from "ramda"

test("cosmicConfigurate", () => {
  expect(!!cosmicConfigurate).toBeTruthy()
})
test("configure", done => {
  expect(!!configure).toBeTruthy()
  const state = { patterns: "yes" }
  const ligament = { ligagwing: true }
  const input = consumed => {
    expect(consumed).toEqual(ligament)
    setTimeout(() => done(), 10)
  }
  const out = configure(state, ligament, { config: input })
  expect(out).toEqual(state.patterns)
})

test("configure - no config", done => {
  const state = { patterns: "yes" }
  const ligament = { noConfig: true }
  const dunce = once(done)
  const out = configure(state, ligament, {})
  expect(out).toEqual(state.patterns)
  setTimeout(() => dunce(), 10)
})

test("configure - broken config", () => {
  const config = () => {
    throw new Error("shit")
  }
  expect(() => configure("state", "ligament", { config })).toThrow()
})
