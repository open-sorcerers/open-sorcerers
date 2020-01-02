import fs from "fs"
import F from "fluture"
import { curry } from "ramda"

const encaseN2 = curry(fn => xx => yy => F.node(c => fn(xx, yy, c)))
// read a file in the Future
export const read = x => encaseN2(fs.readFile)(x)("utf8")
// write a file in the Future
export const write = curry(
  (fd, data) =>
    new F((bad, good) => {
      fs.writeFile(fd, data, "utf8", (e, f) => (e ? bad(e) : good(f)))
      return () => {}
    })
)
