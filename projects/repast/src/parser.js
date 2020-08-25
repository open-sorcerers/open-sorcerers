import {
  __,
  all,
  ap,
  assoc,
  complement,
  concat,
  curry,
  dissoc,
  equals,
  filter,
  findLastIndex,
  groupBy,
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
  splitEvery,
  splitWhen,
  startsWith,
  tail,
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
  trace("resolving data defs"),
  of,
  ap([nth(1), slice(3, Infinity)]),
  ([name, definition]) => {
    const def = pipe(
      init,
      tail,
      splitEvery(2),
      reduce(
        (agg, [k, v]) => mergeRight(agg, { [k.substr(0, k.length - 1)]: v }),
        {}
      )
    )(definition)
    console.log("fergalicious", def)
    // const def = JSON.parse(definition.join(" "))
    return { name, definition: def, type: TYPES.HM_TYPE }
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
const isRepastDataDefinition = x => x[0] === K.REPAST && x[2] === C.equal

// @repast matchesExpectedPattern :: [String] -> Boolean
const matchesExpectedPattern = pipe(
  of,
  ap([pipe(nth(0), equals(K.REPAST)), pipe(nth(2), equals(C.doubleColon))]),
  all(x => x)
)

const isCapitalized = z => z[0].toLowerCase() !== z[0]

const inferReturn = xx => {
  const lastCap = findLastIndex(isCapitalized, xx)
  const successiveParams = slice(lastCap, Infinity, xx)
  if (map(complement(isCapitalized), successiveParams)) return nth(lastCap, xx)
  return last(xx)
}

// @repast parseSignatureGivenConfig :: Config -> [String] -> RepastSignature
const parseSignatureGivenConfig = curry((config, x) => {
  const sig = x.slice(3, Infinity)
  return {
    [L.returnType]: inferReturn(sig),
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
// because of the nature of comments, we can have ast entities which are
// unrelated to our search space
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
  when(() => prop(L.json, config), map(map(pipe(dissoc(L.ast), j2))))(xx)
)

// @hm rename :: String -> String -> Object -> Object
const rename = curry((fromName, toName, xx) =>
  pipe(prop(fromName), grabbed =>
    pipe(dissoc(fromName), assoc(toName, grabbed))(xx)
  )(xx)
)

// @hm parseWithConfig :: Object -> String -> Array
export const parseWithConfig = curry((config, str) =>
  pipe(
    parse,
    pathOr([], [L.program, L.body]),
    grabEntitiesWithMagicComments(config),
    groupBy(prop(L.type)),
    rename(TYPES.HM_TYPE, L.data),
    rename(TYPES.HM_SIGNATURE, L.signatures),
    map(when(propEq(L.type, TYPES.HM_TYPE), trace("this is a thing"))),
    conditionallyConvertToJSON(config)
  )(str)
)
