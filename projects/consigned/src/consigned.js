import path from "path"
import { pipe } from "ramda"
import flexeca from "flexeca"
import { fork as rawFork } from "fluture"
import { tacit } from "ensorcel"
import * as git from "isomorphic-git"
import { format } from "date-fns"

const fork = tacit(3, rawFork)

export const shadow = ({ cwd = process.cwd(), interval, port = 6699 }) => {
  /* const GG = git(cwd) */
}
