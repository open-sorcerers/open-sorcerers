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
import { parse } from "recast"
import { trace } from "xtrace"
import { C, L, K, REGEXES, TYPES } from "./constants"

const box = x => (Array.isArray(x) ? x : [x])

const readNestedSignatures = (agg, xx) => {
  const starter = xx.startsWith(C.openParens)
  const ender = xx.endsWith(C.closeParens)
  const { nested, value, lastWasEnder } = agg
  const sliced = { start: init(value), end: last(value) }

  const yy = xx
    .replace(REGEXES.startsWithParens, C.empty)
    .replace(REGEXES.endsWithParens, C.empty)
  return {
    lastWasEnder: ender,
    value: starter
      ? concat(value, box(yy))
      : nested
      ? concat(box(init(value)), [concat(box(last(value)), box(yy))])
      : concat(value, [yy]),
    nested: ender ? false : nested || starter ? true : nested
  }
}

const j2 = x => JSON.stringify(x, null, 2)
const hasString = curry((a, b) => indexOf(a, b) > -1)
const trim = x => x.trim()
const hindleymilnerize = pipe(
  split(C.space),
  map(trim),
  map(z => (z[0] === C.asterisk ? z.slice(1, Infinity) : z)),
  filter(Boolean),
  reduce(readNestedSignatures, { nested: false, value: [] }),
  prop(L.value),
  ifElse(
    x => x[0] === K.HM_TYPE,
    pipe(nth(1), objOf(L.name), mergeRight({ type: TYPES.HM_TYPE })),
    ifElse(
      pipe(
        of,
        ap([pipe(nth(0), equals(K.HM)), pipe(nth(2), equals(C.doubleColon))]),
        all(x => x)
      ),
      x => ({
        [L.type]: TYPES.HM_SIGNATURE,
        [L.name]: nth(1, x),
        [L.signature]: x.slice(3, Infinity)
      }),
      trace("This is not a correctly formatted comment?")
    )
  )
)

// @hm parseWithConfig :: Object -> String -> Array
export const parseWithConfig = curry((config, str) =>
  pipe(
    parse,
    pathOr([], [L.program, L.body]),
    reduce((agg, expression) => {
      const { comments } = expression
      if (
        comments.length &&
        filter(pipe(prop(L.value), hasString(K.HM)), comments).length
      ) {
        return pipe(
          map(prop(L.value)),
          filter(hasString(K.HM)),
          map(comment =>
            mergeRight(hindleymilnerize(comment), { ast: expression })
          ),
          concat(agg)
        )(comments)
      }
      return agg
    }, [])
  )(str)
)
