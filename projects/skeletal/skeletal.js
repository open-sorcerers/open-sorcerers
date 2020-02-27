'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ramda = require('ramda');
var fluture = require('fluture');
var ensorcel = require('ensorcel');
require('handlebars');
var cosmiconfig = require('cosmiconfig');
var inquirer = require('inquirer');

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

var name = "skeletal";
var version = "0.0.0";
var description = "Build the bones of a project";
var main = "skeletal.js";
var module$1 = "skeletal.mjs";
var bin = {
	skeletal: "skeletal.js"
};
var repository = {
	type: "git",
	url: "https://github.com/open-sorcerers/skeletal.git"
};
var keywords = [
	"generator",
	"generate",
	"scaffolding",
	"scaffold",
	"template",
	"build",
	"pattern",
	"gen",
	"plop",
	"bones",
	"structure"
];
var author = "brekk";
var license = "MIT";
var devDependencies = {
	eslint: "^6.8.0",
	"eslint-config-sorcerers": "^0.0.2",
	jest: "^25.1.0",
	nps: "^5.9.12",
	prettier: "^1.19.1",
	"prettier-eslint": "^9.0.1",
	rollup: "^1.31.1"
};
var dependencies = {
	chalk: "^1.1.3",
	cosmiconfig: "^6.0.0",
	ensorcel: "^0.0.2",
	flexeca: "^0.0.1",
	fluture: "^12.2.0",
	handlebars: "^4.7.3",
	inquirer: "^7.0.4",
	ora: "^4.0.3",
	ramda: "^0.27.0",
	torpor: "^0.0.4",
	"yargs-parser": "^17.0.0"
};
var pkg = {
	name: name,
	version: version,
	description: description,
	main: main,
	module: module$1,
	bin: bin,
	repository: repository,
	keywords: keywords,
	author: author,
	license: license,
	devDependencies: devDependencies,
	dependencies: dependencies
};

var freeze = Object.freeze;
var own = function (z) { return Object.getOwnPropertyNames(z); };

function deepfreeze(o) {
  if (o === Object(o)) {
    if (!Object.isFrozen(o)) { freeze(o); }
    own(o).forEach(function (prop) {
      if (prop !== "constructor") { deepfreeze(o[prop]); }
    });
  }
  return o
}

var fork = ensorcel.tacit(2, fluture.fork);

var cosmicConfigurate = ramda.curry(function (ligament, cosmic) {
  var cancel = ramda.propOr(ramda.identity, "cancel", ligament);
  var futurize = ensorcel.futurizeWithCancel(cancel);
  var cosmicLoad = futurize(1, cosmic.load);
  var cosmicSearch = futurize(0, cosmic.search);
  return ramda.pipe(
    ramda.ifElse(ramda.pathOr(false, ["config", "configFile"]), cosmicLoad, function () { return cosmicSearch(); }
    ),
    ramda.map(
      ramda.pipe(
        ramda.propOr(ramda.identity, "config"),
        // ligasure ^^
        function (z) { return z(ligament); }
      )
    )
  )(ligament)
});

var UNSET = "%UNSET%";

var error = ramda.curry(function (ns, message, data) {
  var name = (pkg.name) + "@" + (pkg.version) + "-" + ns;
  var e = new Error(message);
  e.name = name;
  e.data = data;
  throw e
});

var getName = ramda.propOr(UNSET, "name");
var getPrompts = ramda.propOr(UNSET, "prompts");
var getActions = ramda.propOr(UNSET, "actions");
var ERROR = deepfreeze({
  EXPECTED_NAME_AND_MORE: error(
    "pattern__badinputs",
    "Expected name, prompts and actions properties to be given."
  )
});

var validatePatternAndSubmit = ramda.curry(function (bad, good, raw) { return ramda.pipe(
    ensorcel.box,
    ramda.ap([getName, getPrompts, getActions]),
    ramda.ifElse(
      ramda.any(ramda.equals(UNSET)),
      ramda.pipe(ERROR.EXPECTED_NAME_AND_MORE, bad),
      function (ref) {
        var name = ref[0];
        var prompts = ref[1];
        var actions = ref[2];

        return ({ name: name, prompts: prompts, actions: actions });
    }
    ),
    good
  )(raw); }
);

var pattern = ramda.curry(function (config, raw) {
  var cancel = ramda.propOr(ramda.identity, "cancel", config);
  var willPrompt = ensorcel.futurizeWithCancel(cancel, 1, inquirer.prompt);
  return [
    raw.name,
    ramda.pipe(
      ramda.chain(function (futurePattern) { return ramda.pipe(
          ramda.propOr([], "prompts"),
          ramda.map(willPrompt),
          ramda.reduce(
            function (left, right) { return ramda.chain(function (ll) { return ramda.map(ramda.mergeRight(ll), right); }, left); },
            fluture.resolve({})
          ),
          ramda.map(function (prompts) { return ramda.mergeRight(futurePattern, { prompts: prompts }); })
        )(futurePattern); }
      )
    )(
      new fluture.Future(function (bad, good) {
        validatePatternAndSubmit(bad, good, raw);
        return cancel
      })
    )
  ]
});

var pushInto = ramda.curry(function (into, fn) { return ramda.pipe(
    fn,
    call(function (x) { return into.push(x); })
  ); }
);

var saveKeyed = ramda.curry(function (struct, fn, input) {
  var ref = fn(input);
  var key = ref[0];
  var ff = ref[1];
  struct[key] = ff;
  return ff
});

var skeletal = function (config) {
  var parallelThreadMax = ramda.propOr(10, "threads", config);
  var isCancelled = false;
  /* const patterns = [] */
  var patterns = {};
  var cancel = function () {
    isCancelled = true;
  };
  // closured, for your safety
  var checkCancelled = function () { return isCancelled; };
  // wrap our composition steps with this so we can barf early
  var cancellable = ramda.unless(checkCancelled);
  // this is what the consumer sees as "bones" in the config file
  var ligament = {
    parallelThreadMax: parallelThreadMax,
    done: cancellable(function () { return ramda.pipe(
        ramda.toPairs,
        ramda.filter(function (ref) {
          var k = ref[0];

          return ramda.equals(ramda.propOr(false, "pattern", config), k);
        }),
        ramda.map(ramda.nth(1)),
        ramda.head
      )(patterns); }
    ),
    cancel: cancel,
    checkCancelled: checkCancelled,
    config: deepfreeze(config)
  };
  /* ligament.pattern = pushInto(patterns, pattern(ligament)) */
  ligament.pattern = saveKeyed(patterns, pattern(ligament));
  return ramda.pipe(
    ramda.propOr("skeletal", "namespace"),
    cosmiconfig.cosmiconfig,
    cancellable(cosmicConfigurate(ligament)),
    ramda.chain(
      ramda.cond([
        [checkCancelled, function () { return fluture.reject(new Error("CANCELLED")); }],
        [function () { return ramda.propOr(false, "pattern", config); }, ligament.done],
        [function () { return true; }, function () { return fluture.resolve({ patterns: ramda.keys(patterns) }); }]
      ])
    )
  )(config)
};

exports.cosmicConfigurate = cosmicConfigurate;
exports.deepfreeze = deepfreeze;
exports.fork = fork;
exports.pattern = pattern;
exports.pushInto = pushInto;
exports.saveKeyed = saveKeyed;
exports.skeletal = skeletal;
