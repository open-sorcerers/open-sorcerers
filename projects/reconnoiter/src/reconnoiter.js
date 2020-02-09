import { flexeca } from "flexeca"
import { reject, resolve, fork as rawFork, after as rawAfter } from "fluture"
import {
  not,
  unless,
  either,
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
import { trace } from "xtrace"
import { tacit } from "ensorcel"
import { every } from "./cron"

const fork = tacit(2, rawFork)
const after = tacit(1, rawFork)

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

const runner = network => {
  const timerId = setInterval(
    pipe(
      isOn,
      map(trace("has network connection")),
      /* after(5), */
      chain(ifElse(I, () => resolve(true), (on))),
      map(trace("connected?")),
      chain(ipAddress),
      map(trace("IP?")),
      chain(ifElse(equals("none"), testNetwork, () => resolve(true))),
      map(trace("network?")),
      chain(ifElse(I, () => resolve(true), connectTo(network))),
      map(trace("did connect?")),
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
      chain(didConnect => {
        if (didConnect) {
          console.log("CONNECTED!")
          clearInterval(timerId)
          return resolve(true)
        } else {
          console.log("no connection")
          /* return pipe(off, chain(on))() */
          return off()
        }
      }),
      fork(trace("bad"), trace("good"))
    ),
    7000
  )
}

runner("Papa No-FreeWiFi")
