#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('path');
var nopt = _interopDefault(require('nopt'));
var torpor = require('torpor');
var fluture = require('fluture');
var ramda = require('ramda');
var recast = require('recast');

/* eslint-disable string-literal/no-string-literal */

var REGEXES = {
  startsWithParens: /^\(/,
  endsWithParens: /\)$/
};

var TYPES = {
  HM_TYPE: "HMType",
  HM_SIGNATURE: "HMSignature"
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
  doubleColon: "::"
});
var C = CHARACTERS;

var KEYWORDS = Object.freeze({
  HM: "@hm",
  HM_TYPE: "@hm-type"
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
  "string",
  "type",
  "undefined",
  "utf8",
  "value"
]);

var L = LITERALS;

var FLAGS = makeObjectFromStrings([L.input, L.output, L.json]);
var nf = ramda.map(function (z) { return "--" + z; });

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

var PLACEHOLDER = "🍛";
var $ = PLACEHOLDER;
var bindInternal3 = function bindInternal3 (func, thisContext) {
  return function (a, b, c) {
    return func.call(thisContext, a, b, c);
  };
};
var some$1 = function fastSome (subject, fn, thisContext) {
  var length = subject.length,
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      i;
  for (i = 0; i < length; i++) {
    if (iterator(subject[i], i, subject)) {
      return true;
    }
  }
  return false;
};

var curry = function (fn) {
  var test = function (x) { return x === PLACEHOLDER; };
  return function curried() {
    var arguments$1 = arguments;
    var argLength = arguments.length;
    var args = new Array(argLength);
    for (var i = 0; i < argLength; ++i) {
      args[i] = arguments$1[i];
    }
    var countNonPlaceholders = function (toCount) {
      var count = toCount.length;
      while (!test(toCount[count])) {
        count--;
      }
      return count
    };
    var length = (
      some$1(args, test) ?
        countNonPlaceholders(args) :
        args.length
    );
    function saucy() {
      var arguments$1 = arguments;
      var arg2Length = arguments.length;
      var args2 = new Array(arg2Length);
      for (var j = 0; j < arg2Length; ++j) {
        args2[j] = arguments$1[j];
      }
      return curried.apply(this, args.map(
        function (y) { return (
          test(y) && args2[0] ?
            args2.shift() :
            y
        ); }
      ).concat(args2))
    }
    return (
      length >= fn.length ?
        fn.apply(this, args) :
        saucy
    )
  }
};

var innerpipe = function (args) { return function (x) {
  var first = args[0];
  var rest = args.slice(1);
  var current = first(x);
  for (var a = 0; a < rest.length; a++) {
    current = rest[a](current);
  }
  return current
}; };
function pipe() {
  var arguments$1 = arguments;
  var argLength = arguments.length;
  var args = new Array(argLength);
  for (var i = 0; i < argLength; ++i) {
    args[i] = arguments$1[i];
  }
  return innerpipe(args)
}

var prop = curry(function (property, o) { return o && property && o[property]; });
var _keys = Object.keys;
var keys = _keys;

var propLength = prop("length");
var objectLength = pipe(keys, propLength);

var delegatee = curry(function (method, arg, x) { return (x[method](arg)); });

var filter = delegatee("filter");

function curryObjectN(arity, fn) {
  return function λcurryObjectN(args) {
    var joined = function (z) { return λcurryObjectN(Object.assign({}, args, z)); };
    return (
      args && Object.keys(args).length >= arity ?
        fn(args) :
        joined
    )
  }
}

var callWithScopeWhen = curry(function (effect, when, what, value) {
  var scope = what(value);
  if (when(scope)) { effect(scope); }
  return value;
});
var callBinaryWithScopeWhen = curry(function (effect, when, what, tag, value) {
  var scope = what(value);
  if (when(tag, scope)) { effect(tag, scope); }
  return value;
});

var always = function always() {
  return true;
};
var I = function I(x) {
  return x;
};

var callWhen = callWithScopeWhen($, $, I);
var call = callWithScopeWhen($, always, I);
var callWithScope = callWithScopeWhen($, always);
var callBinaryWhen = callBinaryWithScopeWhen($, $, I);
var callBinaryWithScope = callBinaryWithScopeWhen($, always);
var callBinary = callBinaryWithScopeWhen($, always, I);

var traceWithScopeWhen = callBinaryWithScopeWhen(console.log);
var traceWithScope = traceWithScopeWhen(always);
var inspect = traceWithScope;
var trace = inspect(I);
var traceWhen = callBinaryWithScopeWhen(console.log, $, I);

var segment = curryObjectN(3, function (_ref) {
  var _ref$what = _ref.what,
      what = _ref$what === void 0 ? I : _ref$what,
      _ref$when = _ref.when,
      when = _ref$when === void 0 ? always : _ref$when,
      tag = _ref.tag,
      value = _ref.value,
      effect = _ref.effect;
  if (when(tag, what(value))) {
    effect(tag, what(value));
  }
  return value;
});
var segmentTrace = segment({
  effect: console.log
});

var box = function (x) { return (Array.isArray(x) ? x : [x]); };

var readNestedSignatures = function (agg, xx) {
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
};

var j2 = function (x) { return JSON.stringify(x, null, 2); };
var hasString = ramda.curry(function (a, b) { return ramda.indexOf(a, b) > -1; });
var trim = function (x) { return x.trim(); };

var resolveHMType = ramda.pipe(
  ramda.nth(1),
  ramda.objOf(L.name),
  ramda.mergeRight({ type: TYPES.HM_TYPE })
);

var resolveBlockComments = ramda.map(function (z) { return z[0] === C.asterisk ? z.slice(1, Infinity) : z; }
);
var getGlobalsFromSignature = ramda.curry(function (config, sig) { return ramda.pipe(
    ramda.filter(function (z) { return !!GLOBALS[z]; }),
    config.json ? ramda.map(function (z) { return GLOBALS[z]; }) : ramda.identity,
    ramda.uniq
  )(sig); }
);
var hindleymilnerize = ramda.curry(function (config, str) { return ramda.pipe(
    ramda.split(C.space),
    ramda.map(trim),
    resolveBlockComments,
    ramda.filter(Boolean),
    ramda.reduce(readNestedSignatures, { nested: false, value: [] }),
    ramda.prop(L.value),
    ramda.ifElse(
      function (x) { return x[0] === K.HM_TYPE; },
      resolveHMType,
      ramda.ifElse(
        ramda.pipe(
          ramda.of,
          ramda.ap([ramda.pipe(ramda.nth(0), ramda.equals(K.HM)), ramda.pipe(ramda.nth(2), ramda.equals(C.doubleColon))]),
          ramda.all(function (x) { return x; })
        ),
        function (x) {
          var obj;

          var sig = x.slice(3, Infinity);
          return ( obj = {}, obj[L.type] = TYPES.HM_SIGNATURE, obj[L.name] = ramda.nth(1, x), obj[L.signature] = sig, obj[L.globals] = getGlobalsFromSignature(config, sig), obj )
        },
        trace("This is not a correctly formatted comment?")
      )
    )
  )(str); }
);

// @hm parseWithConfig :: Object -> String -> Array
var parseWithConfig = ramda.curry(function (config, str) { return ramda.pipe(
    recast.parse,
    ramda.pathOr([], [L.program, L.body]),
    ramda.reduce(function (agg, expression) {
      var comments = expression.comments;
      if (
        comments.length &&
        ramda.filter(ramda.pipe(ramda.prop(L.value), hasString(K.HM)), comments).length
      ) {
        return ramda.pipe(
          ramda.map(ramda.prop(L.value)),
          ramda.filter(hasString(K.HM)),
          ramda.map(function (comment) { return ramda.mergeRight(hindleymilnerize(config, comment), { ast: expression }); }
          ),
          ramda.concat(agg)
        )(comments)
      }
      return agg
    }, []),
    ramda.map(
      ramda.when(
        ramda.propEq(L.type, TYPES.HM_TYPE),
        ramda.pipe(function (x) { return ramda.pipe(
            ramda.pathOr([], [L.ast, L.params]),
            ramda.filter(ramda.propEq(L.type, L.Identifier)),
            ramda.map(ramda.prop(L.name)),
            function (params) { return ramda.pipe(ramda.assoc(L.params, params), ramda.assoc(L.arity, params.length))(x); }
          )(x); }
        )
      )
    ),
    ramda.when(function () { return ramda.prop(L.json, config); }, ramda.map(ramda.pipe(ramda.dissoc(L.ast), j2)))
  )(str); }
);

// const cli = pipe(readFile(__, L.utf8), map(parseWithConfig({})))
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
    function (vv) { return nopt(api, shortflags, vv, 2); },
    function (config) { return ramda.pipe(
        ramda.prop("input"),
        torpor.readFile(ramda.__, L.utf8),
        ramda.map(parseWithConfig(config)),
        fluture.fork(trace("bad"))(standardOut)
      )(config); }
  )(xx)
}

cli(process.argv);
