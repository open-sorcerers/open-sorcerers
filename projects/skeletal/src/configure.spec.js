import { once } from "ramda"
import { isFuture, resolve } from "fluture"
import { cosmicConfigurate, configure } from "./configure"
import { fork } from "./utils"

test("cosmicConfigurate", () => {
  expect(!!cosmicConfigurate).toBeTruthy()
})
test("configure", done => {
  expect(!!configure).toBeTruthy()
  const state = { patterns: "yes" }
  const ligament = { ligagwing: true, cancel: function cancelllllllll() {} }
  const input = consumed => {
    expect(consumed).toEqual(ligament)
  }
  const out = configure(state, ligament, resolve({ config: input }))
  expect(isFuture(out)).toBeTruthy()
  fork(
    done,
    xxx => {
      expect(xxx).toEqual(state.patterns)
      done()
    },
    out
  )
})

test("configure - no config", done => {
  const state = { patterns: "yes" }
  const ligament = { noConfig: true, cancel: function cancelllllllll() {} }
  fork(
    done,
    out => {
      expect(out).toEqual({ noConfig: true })
      done()
    },
    configure(state, ligament, resolve({}))
  )
})

test("configure - broken config", done => {
  const config = () => {
    throw new Error("shit")
  }
  const confF = configure(
    "state",
    { cancel: function cancellllelellele() {} },
    resolve({ config })
  )
  fork(
    err => {
      console.log("ERR", err)
      expect(err.message).toEqual("?")
      done()
    },
    out => {
      console.log("OPUT", out)
      done()
    },
    confF
  )
})
