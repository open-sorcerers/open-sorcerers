import { curry as curry$1, propOr, identity, pipe as pipe$1, ifElse, pathOr, map, chain, ap, any, equals, reduce, mergeRight, unless } from 'ramda';
import { fork as fork$1, resolve, Future, parallel } from 'fluture';
import { tacit, futurizeWithCancel, box, j2 } from 'ensorcel';
import 'handlebars';
import { cosmiconfig } from 'cosmiconfig';
import { prompt } from 'inquirer';

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
var module = "skeletal.mjs";
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
	module: module,
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

var fork = tacit(2, fork$1);

var cosmicConfigurate = curry$1(function (ligament, cosmic) {
  var cancel = propOr(identity, "cancel", ligament);
  var futurize = futurizeWithCancel(cancel);
  var cosmicLoad = futurize(1, cosmic.load);
  var cosmicSearch = futurize(0, cosmic.search);
  return pipe$1(
    ifElse(pathOr(false, ["config", "configFile"]), cosmicLoad, function () { return cosmicSearch(); }
    ),
    map(
      pipe$1(
        propOr(identity, "config"),
        // ligasure ^^
        function (z) { return z(ligament); }
      )
    ),
    chain(ligament.done)
  )(ligament)
});

var UNSET = "%UNSET%";

var error = curry$1(function (ns, message, data) {
  var name = (pkg.name) + "@" + (pkg.version) + "-" + ns;
  var e = new Error(message);
  e.name = name;
  e.data = data;
  throw e
});

var getName = propOr(UNSET, "name");
var getPrompts = propOr(UNSET, "prompts");
var getActions = propOr(UNSET, "actions");
var ERROR = deepfreeze({
  EXPECTED_NAME_AND_MORE: error(
    "pattern__badinputs",
    "Expected name, prompts and actions properties to be given."
  )
});

var validatePatternAndSubmit = curry$1(function (bad, good, raw) { return pipe$1(
    box,
    ap([getName, getPrompts, getActions]),
    ifElse(
      any(equals(UNSET)),
      pipe$1(ERROR.EXPECTED_NAME_AND_MORE, bad),
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

var pattern = curry$1(function (config, raw) {
  var cancel = propOr(identity, "cancel", config);
  var willPrompt = futurizeWithCancel(cancel, 1, prompt);
  return pipe$1(
    chain(function (futurePattern) { return pipe$1(
        propOr([], "prompts"),
        map(willPrompt),
        reduce(function (left, right) {
          return chain(function (leftVal) {
            return map(function (rightVal) {
              return mergeRight(leftVal, rightVal)
            }, right)
          }, left)
        }, resolve({})),
        map(function (prompts) { return mergeRight(futurePattern, { prompts: prompts }); })
      )(futurePattern); }
    )
  )(
    new Future(function (bad, good) {
      validatePatternAndSubmit(bad, good, raw);
      return cancel
    })
  )
});

var pushInto = curry$1(function (into, fn) { return pipe$1(
    fn,
    call(function (x) { return into.push(x); })
  ); }
);

var skeletal = function (config) {
  var parallelThreadMax = propOr(10, "threads", config);
  var isCancelled = false;
  var patterns = [];
  var cancel = function () {
    isCancelled = true;
  };
  // closured, for your safety
  var checkCancelled = function () { return isCancelled; };
  // wrap our composition steps with this so we can barf early
  var cancellable = unless(checkCancelled);
  // this is what the consumer sees as "bones" in the config file
  var ligament = {
    parallelThreadMax: parallelThreadMax,
    done: cancellable(function () {
      var allPatterns = parallel(parallelThreadMax)(patterns);
      return allPatterns
    }),
    cancel: cancel,
    checkCancelled: checkCancelled,
    config: deepfreeze(config)
  };
  ligament.pattern = pushInto(patterns, pattern(ligament));
  return pipe$1(
    propOr("skeletal", "namespace"),
    cosmiconfig,
    cancellable(cosmicConfigurate(ligament)),
    map(call(function (x) { return console.log("what dis?", j2(x)); }))
  )(config)
};

export { cosmicConfigurate, deepfreeze, fork, pattern, pushInto, skeletal };
