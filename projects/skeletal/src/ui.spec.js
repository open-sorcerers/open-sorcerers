import { talker } from "./ui"
test("talker - good path", done => {
  expect(!!talker).toBeTruthy()

  const conf = {}
  const input = "good paaaaaaath"
  const bar = {
    updateBottomBar: out => {
      expect(out).toEqual(input)
      done()
    }
  }
  talker(conf, bar, input)
})

test("talker - text.text", done => {
  expect(!!talker).toBeTruthy()

  const conf = { verbose: true }
  const input = { text: "text text test path" }
  const bar = {
    log: {
      write: out => {
        expect(out).toEqual(input.text)
      }
    },
    updateBottomBar: out => {
      expect(out).toEqual(input.text)
      done()
    }
  }
  talker(conf, bar, input)
})

test("talker - silent", done => {
  expect(!!talker).toBeTruthy()

  const conf = { silent: true }
  const input = { text: "good paaaaaaath" }
  const bar = {
    log: {
      write: out => {
        expect(out).toEqual(input)
      }
    },
    updateBottomBar: out => {
      expect(out).toEqual(input)
      done()
    }
  }
  talker(conf, bar, input)
  setTimeout(() => done(), 1)
})
