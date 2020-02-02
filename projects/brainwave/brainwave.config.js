const R = require("ramda")

// brainwave (TM) output
/*
const THE_MIND  = {
  files: [], // list of filenames
  keys: [], // union of all frontmatter keys across all files
  waves: [
    {filename, keys, raw}
  ]
}
*/

const getFiles = R.propOr([], "files")
const getKeys = R.propOr([], "keys")
const hasKey = R.curry((key, wave) => R.pipe(getKeys, R.includes(key))(wave))
const getWaves = R.propOr([], "waves")

module.exports = {
  // mind control mutates data in your frontmatter
  // each key receives a brainwave (mind.waves).map as its only parameter
  control: {
    publishing: R.pipe(R.filter(hasKey("datePublished")))
  },
  // telepathy queries your frontmatter
  telepathy: {}
}
