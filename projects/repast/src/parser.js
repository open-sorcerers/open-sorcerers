import {
  mergeRight,
  objOf,
  all,
  ap,
  concat,
  curry,
  equals,
  filter,
  ifElse,
  indexOf,
  init,
  last,
  map,
  nth,
  of,
  pathOr,
  pipe,
  prop,
  reduce,
  split,
  splitWhen,
  startsWith
} from "ramda"
import recast from "recast"
import { trace } from "xtrace"
import { C } from "./constants"

const box = x => (Array.isArray(x) ? x : [x])

const j2 = x => JSON.stringify(x, null, 2)
const hasString = curry((a, b) => indexOf(a, b) > -1)
const trim = x => x.trim()
const hindleymilnerize = pipe(
  split(" "),
  map(trim),
  map(z => (z[0] === "*" ? z.slice(1, Infinity) : z)),
  filter(Boolean),
  reduce(
    (agg, xx) => {
      const starter = xx.startsWith("(")
      const ender = xx.endsWith(")")
      const { nested, value, lastWasEnder } = agg
      const sliced = { start: init(value), end: last(value) }

      const yy = xx.replace(/^\(/, "").replace(/\)$/, "")
      return {
        lastWasEnder: ender,
        value: starter
          ? concat(value, box(yy))
          : nested
          ? concat(box(init(value)), [concat(box(last(value)), box(yy))])
          : concat(value, [yy]),
        nested: ender ? false : nested || starter ? true : nested
      }
    },
    { nested: false, value: [] }
  ),
  prop("value"),
  ifElse(
    x => x[0] === "@hm-type",
    pipe(nth(1), objOf("name"), mergeRight({ type: "HMType" })),
    ifElse(
      pipe(
        of,
        ap([pipe(nth(0), equals("@hm")), pipe(nth(2), equals("::"))]),
        all(x => x)
      ),
      x => ({
        type: "HMSignature",
        name: nth(1, x),
        signature: x.slice(3, Infinity)
      }),
      trace("This is not a correctly formatted comment?")
    )
  )
)

// @hm parseWithConfig :: Object -> String -> Array
export const parseWithConfig = curry((config, str) =>
  pipe(
    recast.parse,
    pathOr([], ["program", "body"]),
    reduce((agg, expression) => {
      const { comments } = expression
      if (
        comments.length &&
        filter(pipe(prop("value"), hasString("@hm")), comments).length
      ) {
        return pipe(
          map(prop("value")),
          filter(hasString("@hm")),
          map(comment =>
            mergeRight(hindleymilnerize(comment), { ast: expression })
          ),
          concat(agg)
        )(comments)
      }
      return agg
    }, [])
    // map(prop("hm")),
    // j2
  )(str)
)
