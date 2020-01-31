import F from "fluture"
import fixture from "../fixture.json"
import { custom } from "./index"

test("custom", done => {
  const ff = custom({ flatten: false }, fixture)
  F.fork(done)(z => {
    expect(z).toMatchSnapshot()
    done()
  })(ff)
})

test("engraved", done => {
  const ff = custom({ flatten: false }, fixture)
  F.fork(done)(z => {
    expect(z).toMatchSnapshot()
    done()
  })(ff)
})

test("engraved - bad data", done => {
  const ff = custom({ flatten: false }, "blah blah blah")
  F.fork(e => {
    expect(e.message).toEqual(
      "engraved - expected to be given an object as an input"
    )
    done()
  })(done)(ff)
})

test("engraved - bad data, recursive", done => {
  const badData = { a: { b: { c: 123 } } }
  badData.a.b.c = badData
  const ff = custom({ flatten: true }, badData)
  F.fork(e => {
    expect(e.message).toEqual("Maximum call stack size exceeded")
    done()
  })(done)(ff)
})

test("engraved - tons of data - cancellable?", done => {
  const ff = custom(
    { flatten: true },
    {
      ...fixture,
      a: {
        b: {
          c: {
            d: { e: { f: { d: { e: { f: { d: { e: { f: fixture } } } } } } } }
          }
        }
      },

      d: { e: { f: { d: { e: { f: { d: { e: { f: fixture } } } } } } } },
      d2: { e: { f: { d: { e: { f: { d: { e: { f: fixture } } } } } } } },
      e: { f: { d: { e: { f: { d: { e: { f: fixture } } } } } } },
      f: { d: { e: { f: { d: { e: { f: fixture } } } } } },
      d3: { e: { f: { d: { e: { f: fixture } } } } },
      e2: { f: { d: { e: { f: fixture } } } },
      f2: { d: { e: { f: fixture } } },

      d4: { e: { f: { d: { e: { f: { d: { e: { f: fixture } } } } } } } },
      d5: { e: { f: { d: { e: { f: { d: { e: { f: fixture } } } } } } } },
      e3: { f: { d: { e: { f: { d: { e: { f: fixture } } } } } } },
      f3: { d: { e: { f: { d: { e: { f: fixture } } } } } },
      d6: { e: { f: { d: { e: { f: fixture } } } } },
      e4: { f: { d: { e: { f: fixture } } } },
      f4: { d: { e: { f: fixture } } },

      d7: { e: { f: { d: { e: { f: { d: { e: { f: fixture } } } } } } } },
      d8: { e: { f: { d: { e: { f: { d: { e: { f: fixture } } } } } } } },
      e5: { f: { d: { e: { f: { d: { e: { f: fixture } } } } } } },
      f5: { d: { e: { f: { d: { e: { f: fixture } } } } } },
      d9: { e: { f: { d: { e: { f: fixture } } } } },
      e6: { f: { d: { e: { f: fixture } } } },
      f6: { d: { e: { f: fixture } } }
    }
  )
  const cancel = F.fork(console.warn)(x => {
    expect(x).toMatchSnapshot()
    done()
  })(ff)
  cancel()
})
