import { after, resolve, fork } from "fluture"
import {
  auto,
  futurizeWithCancel,
  unfuturize,
  idiotic,
  FLUTURE_METHOD_ARITIES
} from "./future"

test("futurizeWithCancel", done => {
  const cancel = () => {}
  const futurize = futurizeWithCancel(cancel)
  const easy = () => Promise.resolve(100)
  const future100Maker = futurize(0, easy)
  fork(done)(z => {
    expect(z).toEqual(100)
    done()
  })(future100Maker())
})

test("unfuturize", done => {
  const easy = () => resolve(100)
  const promise100Maker = unfuturize(0, easy)
  promise100Maker()
    .catch(done)
    .then(z => {
      expect(z).toEqual(100)
      done()
    })
})
test("FLUTURE_METHOD_ARITIES", () => {
  expect(FLUTURE_METHOD_ARITIES).toMatchSnapshot()
})
test("mandatory simple currying sucks", done => {
  const shitLater = after(5)("shit")
  const handler = fork(done)(x => {
    expect(x).toEqual("shit")
    done()
  })
  handler(shitLater)
})
test("idiotic - manual", done => {
  const shitLater = after(5)("shit")
  const spoon = idiotic(3, fork)
  const handler = spoon(done)(x => {
    expect(x).toEqual("shit")
    done()
  })
  handler(shitLater)
})
test("idiotic - all", done => {
  const shitLater = after(5)("shit")
  const spoon = idiotic(3, fork)
  spoon(
    done,
    x => {
      expect(x).toEqual("shit")
      done()
    },
    shitLater
  )
})

test("idiotic - variant", done => {
  const shitLater = after(5)("shit")
  const spoon = idiotic(3, fork)
  spoon(done)(x => {
    expect(x).toEqual("shit")
    done()
  }, shitLater)
})

test("idiotic - final permutation", done => {
  const shitLater = after(5)("shit")
  const spoon = idiotic(3, fork)
  spoon(done, x => {
    expect(x).toEqual("shit")
    done()
  })(shitLater)
})

test("auto", done => {
  const shitLater = after(5)("shit")
  const spoon = auto("fork")
  spoon(done, x => {
    expect(x).toEqual("shit")
    done()
  })(shitLater)
})
