#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ramda = require('ramda');
var fluture = require('fluture');
var ensorcel = require('ensorcel');
require('handlebars');
var cosmiconfig = require('cosmiconfig');

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

var fork = ensorcel.tacit(2, fluture.fork);

var cosmicConfigurate = ramda.curry(function (ligament, cancel, conf) {
  var futurize = ensorcel.futurizeWithCancel(cancel);
  var cosmicLoad = futurize(1, conf.load);
  var cosmicSearch = futurize(0, conf.search);

  return ramda.pipe(
    function (z) { return z || {}; },
    ramda.ifElse(ramda.propOr(false, "configFile"), cosmicLoad, function () { return cosmicSearch(); }),
    ramda.map(ramda.pipe(ramda.propOr(ramda.identity, "config"), function (z) { return z(ligament); }))
  )(conf)
});

var skeletal = function (config) {
  var isCancelled = false;
  var cancel = function () {
    isCancelled = true;
  };
  var ligament = {
    cancel: cancel,
    isCancelled: isCancelled,
    pattern: config.pattern || ramda.identity,
    config: Object.freeze(config)
  };
  var run = ramda.unless(function () { return isCancelled; });
  return ramda.pipe(
    ramda.propOr("skeletal", "namespace"),
    cosmiconfig.cosmiconfig,
    run(cosmicConfigurate(ligament, cancel))
  )(config)
};

var freeze = Object.freeze;
var own = function (z) { return Object.getOwnPropertyNames(z); };

function deepfreeze(o) {
  if (o === Object(o)) {
    if (!Object.isFrozen(o)) { Object.freeze(o); }
    Object.getOwnPropertyNames(o).forEach(function (prop) {
      if (prop !== "constructor") { deepfreeze(o[prop]); }
    });
  }
  return o
}
function icy(xx) {
  return ramda.when(
    function (z) { return z === Object(z); },
    ramda.pipe(freeze, function (frozen) {
      ramda.pipe(own, ramda.forEach(ramda.unless(ramda.equals("constructor"), icy)))(frozen);
      return frozen
    })
  )(xx)
}

exports.cosmicConfigurate = cosmicConfigurate;
exports.deepfreeze = deepfreeze;
exports.fork = fork;
exports.icy = icy;
exports.skeletal = skeletal;
