const merge = curry((a, b) => Object.assign({}, a, b))
const safeJSONParse = x => {
  try {
    return JSON.parse(x)
  } catch (e) {
    return {}
  }
}
const j2 = x => JSON.stringify(x, null, 2)
// remove null values
const smooth = filter(I)
)
// read a file in the Future
const read = x => F.encaseN2(fs.readFile)(x, "utf8")
// write a file in the Future
const write = curry(
  (fd, data) =>
    new F((bad, good) => {
      fs.writeFile(fd, data, "utf8", (e, f) => (e ? bad(e) : good(f)))
    })
)

// an essential tool for using with `ap`
const box = x => [x]
const isArray = Array.isArray
