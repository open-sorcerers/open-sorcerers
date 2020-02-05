const R = require("ramda")
const { trace } = require("xtrace")
const compareAsc = require("date-fns/fp/compareAsc")

const timeAfterTime = R.curry((b, a) => compareAsc(a, b) > -1)

// brainwave (TM) output
/*
const BRAINWAVE_NETWORK  = {
  files: [], // list of filenames
  keys: [], // union of all frontmatter keys across all files
  waves: [
    {stats, filename, keys, brain}
  ]
}
*/

const getFiles = R.propOr([], "files")
const getKeys = R.propOr([], "keys")
const hasKey = R.curry((key, wave) => R.pipe(getKeys, R.includes(key))(wave))
const getWaves = R.propOr([], "waves")

module.exports = () => ({
  // mind control mutates data in your frontmatter
  // each key is an array of [condition, mutation]
  // where condition is a unary function which receives each wave as its only parameter
  // and mutation is also a unary function which receives each wave as its only parameter
  // if mutation returns a non-null result, that value will be merged with the previous state
  // (using mergeRight)
  control: {
    publishingPublished: [
      /* condition */
      R.both(
        // datePublished >= now
        R.pipe(
          R.pathOr(-1, ["brain", "datePublished"]),
          x => new Date(x),
          // test this
          timeAfterTime(new Date(Date.now()))
        ),
        // is draft
        R.pathOr(false, ["brain", "draft"])
      ),
      /* mutation */
      /* R.assoc("draft", false) */
      R.pipe(trace("child rock"), z => ({ draft: false, ...z }))
    ],
    publishingEdited: [
      /* condition */
      () => true,
      /* mutation */
      R.pipe(
        R.pathOr(-1, ["stats", "ctime"]),
        z => new Date(z),
        R.assoc("date")
      )
    ]
  },
  // telepathy queries your frontmatter, using basically the same interface as mind control, but simplified
  // to only be the condition part of the mind control above, so no array wrapping either
  telepathy: {
    learnPages: R.propEq("menu", "learn")
  }
})
