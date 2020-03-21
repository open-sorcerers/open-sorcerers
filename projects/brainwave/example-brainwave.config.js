const R = require("ramda")
const { trace } = require("xtrace")
const compareAsc = require("date-fns/fp/compareAsc")

const timeAfterTime = R.curry((b, a) => compareAsc(a, b) > -1)

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
      () => ({ draft: false })
    ],
    publishingEdited: [
      () => true,
      input =>
        R.pipe(
          R.pathOr(-1, ["stats", "ctime"]),
          z => new Date(z),
          dateEdited => ({ dateEdited })
        )(input)
    ]
  },
  telepathy: {
    learnPages: R.propEq("menu", "learn"),
    authors: x => x && x.author
  }
})
