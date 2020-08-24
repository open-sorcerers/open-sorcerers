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
  identity as I,
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
  slice,
  split,
  splitWhen,
  startsWith,
  uniq,
  when
} from "ramda"
import { parse } from "recast"
import { trace } from "xtrace"
import { C, GLOBALS, L, K, REGEXES, TYPES } from "./constants"

// @repast Config = { input: String, output: String, json: Boolean }
// @repast NestedSignature = { nested: Boolean, value: Array, lastWasEnder: Boolean }
// @repast RepastDefinition = { type: String, name: String, definition: [String] }
// @repast RepastSignature = { type: String, name: String, signature: [String], globals: [Function] }
// @repast RepastParse = { definitions: [RepastDefinitions], signatures: [RepastSignature] }

// @repast box :: any -> [any]
const box = x => (Array.isArray(x) ? x : [x])

// @repast readNestedSignatures :: [String] -> NestedSignature
const readNestedSignatures = reduce(
  // @repast _readNestedSignatureReducer :: NestedSignature -> String -> NestedSignature
  function _readNestedSignatureReducer(agg, xx) {
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
  },
  { nested: false, value: [], lastWasEnder: false }
)

// @repast j2 :: any -> String
const j2 = x => JSON.stringify(x, null, 2)

// @repast hasString :: String -> String -> Boolean
const hasString = curry((a, b) => indexOf(a, b) > -1)

// @repast trim :: String -> String
const trim = x => x.trim()

// @repast resolveDataDefinitions :: AST -> RepastDefinition
const resolveDataDefinitions = pipe(
  of,
  ap([nth(1), slice(3, Infinity)]),
  ([name, definition]) => {
    const def = JSON.parse(definition.join(" "))
    return { name, definition: def, type: HM.TYPE }
  }
)

// @repast resolveBlockComments :: [String] -> [String]
const resolveBlockComments = map(z =>
  z[0] === C.asterisk ? z.slice(1, Infinity) : z
)

// @repast getGlobalsFromSignature :: Config -> [String]
const getGlobalsFromSignature = curry((config, sig) =>
  pipe(
    filter(z => !!GLOBALS[z]),
    config.json ? map(z => GLOBALS[z]) : I,
    uniq
  )(sig)
)
// @repast isRepastDataDefinition :: [String] -> Boolean
const isRepastDataDefinition = x => x[0] === K.REPAST && x[1] === C.equal

// @repast matchesExpectedPattern :: [String] -> Boolean
const matchesExpectedPattern = pipe(
  of,
  ap([pipe(nth(0), equals(K.REPAST)), pipe(nth(2), equals(C.doubleColon))]),
  all(x => x)
)

// @repast parseSignatureGivenConfig :: Config -> [String] -> RepastSignature
const parseSignatureGivenConfig = curry((config, x) => {
  const sig = x.slice(3, Infinity)
  return {
    [L.type]: TYPES.HM_SIGNATURE,
    [L.name]: nth(1, x),
    [L.signature]: sig,
    [L.globals]: getGlobalsFromSignature(config, sig)
  }
})

// @repast trimLines :: [String] -> [String]
const trimLines = map(trim)

// @repast trimLines :: [String] -> [String]
const removeEmptyLines = filter(Boolean)

// @repast hindleymilnerize :: Config -> String -> [RepastSignature|RepastDefinition]
const hindleymilnerize = curry((config, str) =>
  pipe(
    split(C.space),
    trimLines,
    resolveBlockComments,
    removeEmptyLines,
    readNestedSignatures,
    prop(L.value),
    ifElse(
      isRepastDataDefinition,
      resolveDataDefinitions,
      ifElse(
        matchesExpectedPattern,
        parseSignatureGivenConfig(config),
        trace("This is not a correctly formatted comment?")
      )
    )
  )(str)
)

// @repast grabEntitiesWithMagicComments :: Config -> [String] -> RepastParse
const grabEntitiesWithMagicComments = curry((config, list) =>
  reduce((agg, ast) => {
    const { comments } = ast
    if (
      comments.length &&
      filter(pipe(prop(L.value), hasString(K.REPAST)), comments).length
    ) {
      return pipe(
        map(prop(L.value)),
        filter(hasString(K.REPAST)),
        map(comment => mergeRight(hindleymilnerize(config, comment), { ast })),
        concat(agg)
      )(comments)
    }
    return agg
  }, [])(list)
)

// @hm conditionallyConvertToJSON :: Config -> [AST] -> [AST]|JSON
const conditionallyConvertToJSON = curry((config, xx) =>
  when(() => prop(L.json, config), map(pipe(dissoc(L.ast), j2)))(xx)
)

// @hm parseWithConfig :: Object -> String -> Array
export const parseWithConfig = curry((config, str) =>
  pipe(
    parse,
    pathOr([], [L.program, L.body]),
    grabEntitiesWithMagicComments(config),
    map(when(propEq(L.type, TYPES.HM_TYPE), trace("this is a thing"))),
    conditionallyConvertToJSON(config)
  )(str)
)
