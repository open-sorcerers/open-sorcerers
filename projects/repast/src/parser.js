import {
  __,
  all,
  ap,
  assoc,
  concat,
  curry,
  dissoc,
  equals,
  filter,
  ifElse,
  indexOf,
  init,
  last,
  map,
  mergeRight,
  nth,
  objOf,
  of,
  pathOr,
  pipe,
  prop,
  propEq,
  reduce,
  split,
  splitWhen,
  identity as I,
  startsWith,
  uniq,
  when
} from "ramda"
import { parse } from "recast"
import { trace } from "xtrace"
import { C, GLOBALS, L, K, REGEXES, TYPES } from "./constants"

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

const resolveHMType = pipe(
  nth(1),
  objOf(L.name),
  mergeRight({ type: TYPES.HM_TYPE })
)

const resolveBlockComments = map(z =>
  z[0] === C.asterisk ? z.slice(1, Infinity) : z
)
const getGlobalsFromSignature = curry((config, sig) =>
  pipe(
    filter(z => !!GLOBALS[z]),
    config.json ? map(z => GLOBALS[z]) : I,
    uniq
  )(sig)
)
const hindleymilnerize = curry((config, str) =>
  pipe(
    split(C.space),
    map(trim),
    resolveBlockComments,
    filter(Boolean),
    reduce(readNestedSignatures, { nested: false, value: [] }),
    prop(L.value),
    ifElse(
      x => x[0] === K.HM_TYPE,
      resolveHMType,
      ifElse(
        pipe(
          of,
          ap([pipe(nth(0), equals(K.HM)), pipe(nth(2), equals(C.doubleColon))]),
          all(x => x)
        ),
        x => {
          const sig = x.slice(3, Infinity)
          return {
            [L.type]: TYPES.HM_SIGNATURE,
            [L.name]: nth(1, x),
            [L.signature]: sig,
            [L.globals]: getGlobalsFromSignature(config, sig)
          }
        },
        trace("This is not a correctly formatted comment?")
      )
    )
  )(str)
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
            mergeRight(hindleymilnerize(config, comment), { ast: expression })
          ),
          concat(agg)
        )(comments)
      }
      return agg
    }, []),
    map(
      when(
        propEq(L.type, TYPES.HM_TYPE),
        pipe(x =>
          pipe(
            pathOr([], [L.ast, L.params]),
            filter(propEq(L.type, L.Identifier)),
            map(prop(L.name)),
            params =>
              pipe(assoc(L.params, params), assoc(L.arity, params.length))(x)
          )(x)
        )
      )
    ),
    when(() => prop(L.json, config), map(pipe(dissoc(L.ast), j2)))
  )(str)
)
