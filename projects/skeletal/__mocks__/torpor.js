const path = require("path")
const R = require("ramda")
const torpor = jest.genMockFromModule("torpor")
const F = require("fluture")

let mockFiles = Object.create(null)
function __setMockFiles(neu) {
  mockFiles = Object.create(null)
  for (const file in neu) {
    const dir = path.dirname(file)
    if (!mockFiles[dir]) mockFiles[dir] = []
    mockFiles[dir].push(path.basename(file))
  }
}
function readFile(file, config) {
  return new F.Future((bad, good) => {
    try {
      setTimeout(
        () => (file.includes("fail") ? bad(false) : good(config.raw || "")),
        1
      )
      return () => {}
    } catch (e) {
      bad(e)
      return () => {}
    }
  })
}
function writeFile(filepath, content, config) {
  return new F.Future((bad, good) => {
    try {
      setTimeout(() => (filepath.includes("fail") ? bad(false) : good(true)), 1)
      return () => {}
    } catch (e) {
      bad(e)
      return () => {}
    }
  })
}

torpor.__setMockFiles = __setMockFiles
torpor.writeFile = R.curryN(3, writeFile)
torpor.readFile = R.curryN(2, readFile)

module.exports = torpor
