import { skeletal } from "./skeletal"
import { fork } from "./utils"
import { nameVersion } from "./instance"

test("skeletal - basic", done => {
  fork(
    done,
    out => {
      expect(out).toMatchSnapshot()
      done()
    },
    skeletal({
      namespace: "example-basic"
    })
  )
})

test("skeletal - no config", done => {
  const namespace = "namespace" + Math.round(Math.random() * 1e5)
  fork(
    out => {
      expect(out).toEqual(
        `No config file found for namespace: "${namespace}". Try "bone --init ${namespace}"?`
      )
      done()
    },
    done,
    skeletal({ namespace })
  )
})
test("skeletal - initialize", done => {
  fork(
    done,
    eeee => {
      expect(eeee).toEqual(
        `🦴 ${nameVersion()} - Wrote initial config file to my-cool-ns.config.js!\n\tRun 'bone -n my-cool-ns -p madlib' :)`
      )
      done()
    },
    skeletal({ init: "my-cool-ns" })
  )
})

test("skeletal - cancellation", done => {
  const cancel = fork(done, done, skeletal({ cancel: done }))
  cancel()
})
