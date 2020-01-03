import F from "fluture"
import { futurizeWithCancel, unfuturize } from "./future"

/*
  const badFun = () =>
    new Promise(reject => {
      setTimeout(() => reject("someone lost an eye!"), 100)
    })

*/

test("futurizeWithCancel - good case", done => {
  const input = Math.round(Math.random() * 1e5) + 1
  const goodFun = (xx, yy) =>
    new Promise(resolve => {
      setTimeout(() => resolve((xx * yy) / input), 100)
    })
  const killable = () => {}
  const goodFutureFun = futurizeWithCancel(2, goodFun, killable)
  const aa = 5
  const bb = 20
  F.fork(done)(out => {
    expect(out).toEqual((aa * bb) / input)
    done()
  })(goodFutureFun(aa, bb))
})

test("futurizeWithCancel - bad case", done => {
  const badFun = (xx, yy) =>
    new Promise((resolve, reject) => {
      setTimeout(
        () => reject(new Error(`[${xx}, ${yy}] someone lost an eye!`)),
        100
      )
    })
  const killable = () => {}
  const badFutureFun = futurizeWithCancel(2, badFun, killable)
  const aa = 5
  const bb = 20
  F.fork(out => {
    expect(out.message).toEqual(`[${aa}, ${bb}] someone lost an eye!`)
    done()
  })(done)(badFutureFun(aa, bb))
})

test("unfuturize", done => {
  const nn = Math.round(Math.random() * 1e8)
  const send = unfuturize(1, x => F.resolve(x))
  send(nn)
    .catch(done)
    .then(out => {
      expect(out).toEqual(nn)
      done()
    })
})
