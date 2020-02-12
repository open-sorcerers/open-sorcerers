import { flexeca } from "flexeca"
import ora from "ora"
import { resolve, fork as rawFork } from "fluture"
import { sideEffect } from "xtrace"
import {
  not,
  equals,
  ifElse,
  identity as I,
  chain,
  nth,
  filter,
  split,
  map,
  pipe,
  includes
} from "ramda"
/* import { trace } from "xtrace" */
import { tacit } from "ensorcel"
/* import { every } from "./cron" */

const fork = tacit(2, rawFork)
/* const after = tacit(1, rawFork) */

const cwd = process.cwd()
const netset = flexeca({ cwd }, "networksetup")

const isOn = () =>
  pipe(netset, map(includes("On")))(["-getairportpower", "en0"])

const on = () =>
  pipe(
    netset,
    map(() => true)
  )(["-setairportpower", "en0", "on"])

const off = () =>
  pipe(
    netset,
    map(() => true)
  )(["-setairportpower", "en0", "off"])

const ipAddress = () =>
  pipe(
    netset,
    map(
      pipe(split("\n"), filter(includes("IP address")), nth(0), z =>
        z.substr(z.indexOf(":") + 2, Infinity)
      )
    )
  )(["-getinfo", "Wi-Fi"])

const testNetwork = () =>
  pipe(
    netset,
    map(pipe(includes("not associated"), not))
  )(["-getairportnetwork", "en0"])

const connectTo = net => () => pipe(netset)(["-setairportnetwork", "en0", net])

export const runner = network => {
  const spinner = ora(`Pinging ${network}`).start()
  const timerId = setInterval(
    pipe(
      isOn,
      chain(ifElse(I, () => resolve(true), on)),
      chain(ipAddress),
      chain(ifElse(equals("none"), testNetwork, () => resolve(true))),
      sideEffect(x => {
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
        spinner.color = x ? "green" : "red"
      }),
      chain(didConnect => {
        if (didConnect) {
          spinner.succeed(`Connected to ${network}`)
          clearInterval(timerId)
          return resolve(true)
        } else {
          spinner.text = "Retrying..."
          spinner.color = "yellow"
          process.stdout.write(".")
          return off()
        }
      }),
      fork(I, I)
    ),
    7000
  )
}
