import ora from "ora"
import { sideEffect } from "xtrace"
import {
  gt,
  ifElse,
  pipe,
  chain,
  range,
  always as K,
  map,
  join,
  includes,
  equals,
  identity as I
} from "ramda"
import { resolve } from "fluture"
import {
  fork,
  ping,
  isOn,
  ipAddress,
  off,
  on,
  testNetwork,
  connectTo
} from "./utils"

export const runner = (network, rawAttempts = 1, wait = 5000) => {
  let attempts = rawAttempts
  const attempt = () => {
    return ifElse(
      gt(10),
      pipe(range(0), map(K(".")), join("")),
      z => " - " + z + "th attempt"
    )(attempts)
  }
  const spinner = ora(`Connecting to ${network}`).start()
  let cancelId = null
  let timerId = null
  let slowdown = wait
  const rece = () => {
    const cancel = pipe(
      isOn,
      sideEffect(() => (attempts += 1)),
      chain(ifElse(I, () => resolve(true), on)),
      chain(ipAddress),
      chain(ifElse(equals("none"), testNetwork, () => resolve(true))),
      sideEffect(x => {
        spinner.text = `Signal found${attempt()}`
        spinner.color = x ? "cyan" : "magenta"
      }),
      chain(ifElse(I, () => resolve(true), connectTo(network))),
      chain(
        ifElse(
          z =>
            includes("Could not", z) ||
            includes("Failed to join", z) ||
            includes("cannot", z),
          () => resolve(false),
          () => resolve(true)
        )
      ),
      sideEffect(x => {
        spinner.color = x ? "green" : "yellow"
      }),
      chain(didConnect => {
        if (didConnect) {
          spinner.text = `Connected to ${network}`
          return ping(5, "npmjs.com")
        } else {
          spinner.text = `Retrying${attempt()}`
          spinner.color = "yellow"
          return resolve(false)
        }
      }),
      chain(didResolve => {
        if (didResolve > 1 / 4) {
          spinner.succeed(
            `Got ${didResolve *
              100}% internet from ${network} after ${attempts} tries.`
          )
          clearTimeout(timerId)
          clearTimeout(cancelId)
          return resolve(true)
        } else {
          spinner.color = "red"
          spinner.text = `Cycling wifi${attempt()}`
          clearTimeout(timerId)
          clearTimeout(cancelId)
          slowdown = wait + attempts * 3
          timerId = setTimeout(rece, slowdown)
          return off()
        }
      }),
      fork(I, I)
    )()
    cancelId = setTimeout(cancel, 60e3)
  }
  timerId = setTimeout(rece, slowdown)
}
