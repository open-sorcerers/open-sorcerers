const R = require("ramda")
const compareAsc = require("date-fns/fp/compareAsc")

const timeAfterTime = R.curry((a, b) => compareAsc(a, b) > -1)

module.exports = () => ({
  control: {
    publishingPublished: [
      R.both(
        R.pipe(
          R.pathOr(-1, ["brain", "datePublished"]),
          x => new Date(x),
          timeAfterTime(new Date(Date.now()))
        ),
        R.pathOr(false, ["brain", "draft"])
      ),
      z => ({ draft: false, ...z })
    ],
    publishingEdited: [
      () => true,
      R.pipe(
        R.pathOr(-1, ["stats", "ctime"]),
        z => new Date(z),
        R.assoc("date")
      )
    ]
  },
  telepathy: {
    learnPages: R.propEq("menu", "learn")
  }
})
