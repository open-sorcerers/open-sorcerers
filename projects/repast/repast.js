#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('path');
var nopt = _interopDefault(require('nopt'));
var torpor = require('torpor');
var fluture = require('fluture');
var ramda = require('ramda');
var recast = require('recast');
var xtrace = require('xtrace');

/* eslint-disable string-literal/no-string-literal */

var REGEXES = {
  startsWithParens: /^\(/,
  endsWithParens: /\)$/
};

var TYPES = {
  HM_TYPE: "RepastData",
  HM_SIGNATURE: "RepastSignature"
};

var CHARACTERS = Object.freeze({
  __of__: "∋",
  newline: "\n",
  comment: "//",
  space: " ",
  openParens: "(",
  closeParens: ")",
  asterisk: "*",
  empty: "",
  space: " ",
  doubleColon: "::",
  equal: "="
});
var C = CHARACTERS;

var KEYWORDS = Object.freeze({
  REPAST: "@repast"
});
var K = KEYWORDS;

var makeObjectFromStrings = ramda.pipe(
  ramda.reduce(function (xx, yy) {
    var obj;

    return ramda.mergeRight(xx, ( obj = {}, obj[yy] = yy, obj ));
}, {}),
  Object.freeze
);

// read !cat file.js | grep 'L\..'
var LITERALS = makeObjectFromStrings([
  "Boolean",
  "Global",
  "Identifier",
  "String",
  "ast",
  "arity",
  "body",
  "data",
  "globals",
  "input",
  "json",
  "loc",
  "name",
  "nil",
  "object",
  "output",
  "params",
  "program",
  "signature",
  "signatures",
  "string",
  "type",
  "undefined",
  "utf8",
  "value",
  "returnType"
]);

var L = LITERALS;

var FLAGS = makeObjectFromStrings([L.input, L.output, L.json]);
var nf = ramda.map(function (z) { return "--" + z; });

var PRIMITIVE_TYPES = makeObjectFromStrings([
  "Boolean",
  "String",
  "Number",
  "Void",
  "Object",
  "Array"
]);

var GLOBALS = ramda.pipe(
  ramda.reduce(function (agg, thing) {
    var obj;

    return ramda.mergeRight(agg, ( obj = {}, obj[thing.name] = thing, obj ));
}, {})
)([
  Array,
  Boolean,
  Date,
  Error,
  Function,
  Number,
  Object,
  Promise,
  Proxy,
  RegExp,
  String,
  Symbol
]);

// @repast Config = { input: String, output: String, json: Boolean }
// @repast NestedSignature = { nested: Boolean, value: Array, lastWasEnder: Boolean }
// @repast RepastDefinition = { type: String, name: String, definition: [String] }
// @repast RepastSignature = { type: String, name: String, signature: [String], globals: [Function] }
// @repast RepastParse = { definitions: [RepastDefinitions], signatures: [RepastSignature] }

// @repast box :: any -> [any]
var box = function (x) { return (Array.isArray(x) ? x : [x]); };

// @repast readNestedSignatures :: [String] -> NestedSignature
var readNestedSignatures = ramda.reduce(
  // @repast _readNestedSignatureReducer :: NestedSignature -> String -> NestedSignature
  function _readNestedSignatureReducer(agg, xx) {
    var starter = xx.startsWith(C.openParens);
    var ender = xx.endsWith(C.closeParens);
    var nested = agg.nested;
    var value = agg.value;
    var lastWasEnder = agg.lastWasEnder;
    var sliced = { start: ramda.init(value), end: ramda.last(value) };

    var yy = xx
      .replace(REGEXES.startsWithParens, C.empty)
      .replace(REGEXES.endsWithParens, C.empty);
    return {
      lastWasEnder: ender,
      value: starter
        ? ramda.concat(value, box(yy))
        : nested
        ? ramda.concat(box(ramda.init(value)), [ramda.concat(box(ramda.last(value)), box(yy))])
        : ramda.concat(value, [yy]),
      nested: ender ? false : nested || starter ? true : nested
    }
  },
  { nested: false, value: [], lastWasEnder: false }
);

// @repast j2 :: any -> String
var j2 = function (x) { return JSON.stringify(x, null, 2); };

// @repast hasString :: String -> String -> Boolean
var hasString = ramda.curry(function (a, b) { return ramda.indexOf(a, b) > -1; });

// @repast trim :: String -> String
var trim = function (x) { return x.trim(); };

// @repast resolveDataDefinitions :: AST -> RepastDefinition
var resolveDataDefinitions = ramda.pipe(
  xtrace.trace("resolving data defs"),
  ramda.of,
  ramda.ap([ramda.nth(1), ramda.slice(3, Infinity)]),
  function (ref) {
    var name = ref[0];
    var definition = ref[1];

    var def = ramda.pipe(
      ramda.init,
      ramda.tail,
      ramda.splitEvery(2),
      ramda.reduce(
        function (agg, ref) {
          var obj;

          var k = ref[0];
          var v = ref[1];
          return ramda.mergeRight(agg, ( obj = {}, obj[k.substr(0, k.length - 1)] = v, obj ));
    },
        {}
      )
    )(definition);
    console.log("fergalicious", def);
    // const def = JSON.parse(definition.join(" "))
    return { name: name, definition: def, type: TYPES.HM_TYPE }
  }
);

// @repast resolveBlockComments :: [String] -> [String]
var resolveBlockComments = ramda.map(function (z) { return z[0] === C.asterisk ? z.slice(1, Infinity) : z; }
);

// @repast getGlobalsFromSignature :: Config -> [String]
var getGlobalsFromSignature = ramda.curry(function (config, sig) { return ramda.pipe(
    ramda.filter(function (z) { return !!GLOBALS[z]; }),
    config.json ? ramda.map(function (z) { return GLOBALS[z]; }) : ramda.identity,
    ramda.uniq
  )(sig); }
);
// @repast isRepastDataDefinition :: [String] -> Boolean
var isRepastDataDefinition = function (x) { return x[0] === K.REPAST && x[2] === C.equal; };

// @repast matchesExpectedPattern :: [String] -> Boolean
var matchesExpectedPattern = ramda.pipe(
  ramda.of,
  ramda.ap([ramda.pipe(ramda.nth(0), ramda.equals(K.REPAST)), ramda.pipe(ramda.nth(2), ramda.equals(C.doubleColon))]),
  ramda.all(function (x) { return x; })
);

var isCapitalized = function (z) { return z[0].toLowerCase() !== z[0]; };

var inferReturn = function (xx) {
  var lastCap = ramda.findLastIndex(isCapitalized, xx);
  var successiveParams = ramda.slice(lastCap, Infinity, xx);
  if (ramda.map(ramda.complement(isCapitalized), successiveParams)) { return ramda.nth(lastCap, xx) }
  return ramda.last(xx)
};

// @repast parseSignatureGivenConfig :: Config -> [String] -> RepastSignature
var parseSignatureGivenConfig = ramda.curry(function (config, x) {
  var obj;

  var sig = x.slice(3, Infinity);
  return ( obj = {}, obj[L.returnType] = inferReturn(sig), obj[L.type] = TYPES.HM_SIGNATURE, obj[L.name] = ramda.nth(1, x), obj[L.signature] = sig, obj[L.globals] = getGlobalsFromSignature(config, sig), obj )
});

// @repast trimLines :: [String] -> [String]
var trimLines = ramda.map(trim);

// @repast trimLines :: [String] -> [String]
var removeEmptyLines = ramda.filter(Boolean);

// @repast hindleymilnerize :: Config -> String -> [RepastSignature|RepastDefinition]
var hindleymilnerize = ramda.curry(function (config, str) { return ramda.pipe(
    ramda.split(C.space),
    trimLines,
    resolveBlockComments,
    removeEmptyLines,
    readNestedSignatures,
    ramda.prop(L.value),
    ramda.ifElse(
      isRepastDataDefinition,
      resolveDataDefinitions,
      ramda.ifElse(
        matchesExpectedPattern,
        parseSignatureGivenConfig(config),
        xtrace.trace("This is not a correctly formatted comment?")
      )
    )
  )(str); }
);

// @repast grabEntitiesWithMagicComments :: Config -> [String] -> RepastParse
// because of the nature of comments, we can have ast entities which are
// unrelated to our search space
var grabEntitiesWithMagicComments = ramda.curry(function (config, list) { return ramda.reduce(function (agg, ast) {
    var comments = ast.comments;
    if (
      comments.length &&
      ramda.filter(ramda.pipe(ramda.prop(L.value), hasString(K.REPAST)), comments).length
    ) {
      return ramda.pipe(
        ramda.map(ramda.prop(L.value)),
        ramda.filter(hasString(K.REPAST)),
        ramda.map(function (comment) { return ramda.mergeRight(hindleymilnerize(config, comment), { ast: ast }); }),
        ramda.concat(agg)
      )(comments)
    }
    return agg
  }, [])(list); }
);

// @hm conditionallyConvertToJSON :: Config -> [AST] -> [AST]|JSON
var conditionallyConvertToJSON = ramda.curry(function (config, xx) { return ramda.when(function () { return ramda.prop(L.json, config); }, ramda.map(ramda.map(ramda.pipe(ramda.dissoc(L.ast), j2))))(xx); }
);

// @hm rename :: String -> String -> Object -> Object
var rename = ramda.curry(function (fromName, toName, xx) { return ramda.pipe(ramda.prop(fromName), function (grabbed) { return ramda.pipe(ramda.dissoc(fromName), ramda.assoc(toName, grabbed))(xx); }
  )(xx); }
);

// @hm parseWithConfig :: Object -> String -> Array
var parseWithConfig = ramda.curry(function (config, str) { return ramda.pipe(
    recast.parse,
    ramda.pathOr([], [L.program, L.body]),
    grabEntitiesWithMagicComments(config),
    ramda.groupBy(ramda.prop(L.type)),
    rename(TYPES.HM_TYPE, L.data),
    rename(TYPES.HM_SIGNATURE, L.signatures),
    ramda.map(ramda.when(ramda.propEq(L.type, TYPES.HM_TYPE), xtrace.trace("this is a thing"))),
    conditionallyConvertToJSON(config)
  )(str); }
);

var api = {};
api[FLAGS.input] = String;
api[FLAGS.output] = String;
api[FLAGS.json] = Boolean;

var shortflags = {
  i: nf([FLAGS.input]),
  o: nf([FLAGS.output]),
  j: nf([FLAGS.json])
};

var standardOut = function (fromStream) { return fromStream ? console.log(fromStream) : console.log("Wrote file to output"); };

function cli(xx) {
  return ramda.pipe(
    // parse argv and turn into object
    function (vv) { return nopt(api, shortflags, vv, 2); },
    function (config) { return ramda.pipe(
        ramda.prop("input"),
        // read -i input
        torpor.readFile(ramda.__, L.utf8),
        // parse given nopt object
        ramda.map(parseWithConfig(config)),
        // barf or print
        fluture.fork(xtrace.trace("bad"))(standardOut)
      )(config); }
  )(xx)
}

cli(process.argv);
