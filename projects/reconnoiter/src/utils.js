import { flexeca } from "flexeca"
import { fork as rawFork } from "fluture"
import { sideEffect, trace } from "xtrace"
import {
  trim,
  propOr,
  replace,
  gt,
  join,
  head,
  last,
  curry,
  always as K,
  range,
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
import { tacit } from "ensorcel"
/* import { every } from "./cron" */

export const fork = tacit(2, rawFork)

const cwd = process.cwd()
export const netset = flexeca({ cwd }, "networksetup")

export const isOn = () =>
  pipe(netset, map(includes("On")))(["-getairportpower", "en0"])

export const ping = curry((times, what) =>
  pipe(
    flexeca({ cwd }, "ping"),
    map(
      pipe(
        split("\n"),
        filter(includes("packet loss")),
        propOr("", 0),
        split(","),
        last,
        trim,
        split(" "),
        head,
        replace("%", ""),
        parseFloat,
        // 1 = perfect connectivity, 0 = shit
        z => Math.abs(100 - z) / 100
      )
    )
  )(["-c" + times, what])
)

export const on = () =>
  pipe(
    netset,
    map(() => true)
  )(["-setairportpower", "en0", "on"])

export const off = () =>
  pipe(
    netset,
    map(() => true)
  )(["-setairportpower", "en0", "off"])

export const ipAddress = () =>
  pipe(
    netset,
    map(
      pipe(split("\n"), filter(includes("IP address")), nth(0), z =>
        z.substr(z.indexOf(":") + 2, Infinity)
      )
    )
  )(["-getinfo", "Wi-Fi"])

export const testNetwork = () =>
  pipe(
    netset,
    map(pipe(includes("not associated"), not))
  )(["-getairportnetwork", "en0"])

export const connectTo = net => () =>
  pipe(netset)(["-setairportnetwork", "en0", net])
