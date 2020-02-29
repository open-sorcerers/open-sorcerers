#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var ora = _interopDefault(require('ora'));
var ramda = require('ramda');
var FF = require('fluture');
var flexeca = require('flexeca');

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

var freeze = Object.freeze;

var smooth = ramda.filter(ramda.identity);

var memo = ramda.memoizeWith(ramda.identity);

var Future = FF.Future;
var fork = FF.fork;

/**
Takes a Promise-returning function and gives back a Future-returning function.

@function futurizeWithCancel
@param {Function} cancel - a unary function to call and manage async cancellation
@param {String} arity - the number of parameters the given function takes
@param {Function} fn - a Promise-returning function
@returns {Future}
*/
var futurizeWithCancel = ramda.curryN(3, function (cancel, arity, fn) { return ramda.curryN(arity, function promise2Future() {
    var arguments$1 = arguments;

    var this$1 = this;
    var args = [], len = arguments.length;
    while ( len-- ) { args[ len ] = arguments$1[ len ]; }

    return new Future(function (bad, good) {
      fn.apply(this$1, [].concat( args ))
        .catch(bad)
        .then(good);
      return cancel
    })
  }); }
);

// for the lazy seeking to use the lazy
var futurize = futurizeWithCancel(function () {});

/**
Takes a Future-returning function and gives back a Promise-returning function.

@function unfuturize
@param {String} arity - the number of parameters the given function takes
@param {Function} fn - a Promise-returning function
@returns {Function} cancellation function
*/
var unfuturize = ramda.curryN(2, function (arity, fn) { return ramda.curryN(arity, function future2Promise() {
    var arguments$1 = arguments;

    var this$1 = this;
    var args = [], len = arguments.length;
    while ( len-- ) { args[ len ] = arguments$1[ len ]; }

    return new Promise(function (resolve, reject) { return fork(reject)(resolve)(fn.apply(this$1, args)); }
    )
  }); }
);

// not a fan of simple currying at some other library's whims
// especially given that uncurryN doesn't fucking work with it
// and we're not using sanctuary
var tacit = ramda.curryN(2, function (arity, raw) {
  return ramda.curryN(arity, function () {
    var arguments$1 = arguments;

    var args = [], len = arguments.length;
    while ( len-- ) { args[ len ] = arguments$1[ len ]; }

    return ramda.reduce(function (fn, x) { return fn(x); }, raw, args);
  })
});

var hotLookup = memo(function (x) { return ramda.findIndex(ramda.includes(x)); });

// use semiauto if you wanna do tree-shaking
var semiauto = ramda.curryN(2, function (lookup, fn) { return ramda.pipe(hotLookup(lookup), function (arity) { return tacit(arity, fn); })(FLUTURE_METHOD_ARITIES); }
);

var FLUTURE_METHOD_ARITIES = freeze([
  ["swap", "promise"],
  [
    "ap",
    "attempt",
    "attemptP",
    "chain",
    "chainRej",
    "go",
    "isFuture",
    "isNever",
    "map",
    "mapRej",
    "node",
    "pap",
    "reject",
    "resolve"
  ],
  [
    "after",
    "alt",
    "and",
    "both",
    "done",
    "encase",
    "encaseP",
    "lastly",
    "parallel",
    "rejectAfter",
    "value"
  ],
  ["bimap", "coalesce", "fork", "hook"],
  ["forkCatch"]
]);

/* import { every } from "./cron" */

var fork$1 = tacit(2, FF.fork);

var cwd = process.cwd();
var netset = flexeca.flexeca({ cwd: cwd }, "networksetup");

var isOn = function () { return ramda.pipe(netset, ramda.map(ramda.includes("On")))(["-getairportpower", "en0"]); };

var ping = ramda.curry(function (times, what) { return ramda.pipe(
    flexeca.flexeca({ cwd: cwd }, "ping"),
    ramda.map(
      ramda.pipe(
        ramda.split("\n"),
        ramda.filter(ramda.includes("packet loss")),
        ramda.propOr("", 0),
        ramda.split(","),
        ramda.last,
        ramda.trim,
        ramda.split(" "),
        ramda.head,
        ramda.replace("%", ""),
        parseFloat,
        // 1 = perfect connectivity, 0 = shit
        function (z) { return Math.abs(100 - z) / 100; }
      )
    )
  )(["-c" + times, what]); }
);

var on = function () { return ramda.pipe(
    netset,
    ramda.map(function () { return true; })
  )(["-setairportpower", "en0", "on"]); };

var off = function () { return ramda.pipe(
    netset,
    ramda.map(function () { return true; })
  )(["-setairportpower", "en0", "off"]); };

var ipAddress = function () { return ramda.pipe(
    netset,
    ramda.map(
      ramda.pipe(ramda.split("\n"), ramda.filter(ramda.includes("IP address")), ramda.nth(0), function (z) { return z.substr(z.indexOf(":") + 2, Infinity); }
      )
    )
  )(["-getinfo", "Wi-Fi"]); };

var testNetwork = function () { return ramda.pipe(
    netset,
    ramda.map(ramda.pipe(ramda.includes("not associated"), ramda.not))
  )(["-getairportnetwork", "en0"]); };

var connectTo = function (net) { return function () { return ramda.pipe(netset)(["-setairportnetwork", "en0", net]); }; };

var runner = function (network, rawAttempts, wait) {
  if ( rawAttempts === void 0 ) rawAttempts = 1;
  if ( wait === void 0 ) wait = 5000;

  var attempts = rawAttempts;
  var attempt = function () {
    return ramda.ifElse(
      ramda.gt(10),
      ramda.pipe(ramda.range(0), ramda.map(ramda.always(".")), ramda.join("")),
      function (z) { return " - " + z + "th attempt"; }
    )(attempts)
  };
  var spinner = ora(("Connecting to " + network)).start();
  var cancelId = null;
  var timerId = null;
  var slowdown = wait;
  var rece = function () {
    var cancel = ramda.pipe(
      isOn,
      call(function () { return (attempts += 1); }),
      ramda.chain(ramda.ifElse(ramda.identity, function () { return FF.resolve(true); }, on)),
      ramda.chain(ipAddress),
      ramda.chain(ramda.ifElse(ramda.equals("none"), testNetwork, function () { return FF.resolve(true); })),
      call(function (x) {
        spinner.text = "Signal found" + (attempt());
        spinner.color = x ? "cyan" : "magenta";
      }),
      ramda.chain(ramda.ifElse(ramda.identity, function () { return FF.resolve(true); }, connectTo(network))),
      ramda.chain(
        ramda.ifElse(
          function (z) { return ramda.includes("Could not", z) ||
            ramda.includes("Failed to join", z) ||
            ramda.includes("cannot", z); },
          function () { return FF.resolve(false); },
          function () { return FF.resolve(true); }
        )
      ),
      call(function (x) {
        spinner.color = x ? "green" : "yellow";
      }),
      ramda.chain(function (didConnect) {
        if (didConnect) {
          spinner.text = "Connected to " + network;
          return ping(5, "npmjs.com")
        } else {
          spinner.text = "Retrying" + (attempt());
          spinner.color = "yellow";
          return FF.resolve(false)
        }
      }),
      ramda.chain(function (didResolve) {
        if (didResolve > 1 / 4) {
          spinner.succeed(
            ("Got " + (didResolve *
              100) + "% internet from " + network + " after " + attempts + " tries.")
          );
          clearTimeout(timerId);
          clearTimeout(cancelId);
          return FF.resolve(true)
        } else {
          spinner.color = "red";
          spinner.text = "Cycling wifi" + (attempt());
          clearTimeout(timerId);
          clearTimeout(cancelId);
          slowdown = wait + attempts * 3;
          timerId = setTimeout(rece, slowdown);
          return off()
        }
      }),
      fork$1(ramda.identity, ramda.identity)
    )();
    cancelId = setTimeout(cancel, 60e3);
  };
  timerId = setTimeout(rece, slowdown);
};

runner(process.argv.slice(2));
