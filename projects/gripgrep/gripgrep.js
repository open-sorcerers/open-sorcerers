'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var execa = _interopDefault(require('execa'));
var F = _interopDefault(require('fluture'));
var ramda = require('ramda');

var KEYS = Object.freeze({
  CWD: "cwd",
  REGEX: "regex",
  GLOBS: "globs",
  STRING: "string"
});

var NIL = "nil";

var box = function (x) { return [x]; };
var orNil = ramda.propOr(NIL);
var isNil = ramda.equals(NIL);
var KΩ = ramda.once(function (x) { return function () { return x; }; });
var wrap = ramda.curryN(2, function (ab, x) { return ramda.length(ab) === 2 ? ab[0] + x + ab[1] : ab + x + ab; }
);
var quote = wrap("'");
// eslint-disable-next-line valid-typeof
var expectType = ramda.curryN(2, function (type, xx) { return typeof xx === type; });
var expectWhat = ramda.curryN(
  2,
  function (expected, what) { return ("Expected to be given " + expected + " but instead received (" + (typeof what) + ")"); }
);
var yellUnless = ramda.curryN(3, function (yell, expected, what) {
  if (!expectType(expected, what)) {
    yell(expectWhat(expected, what));
    return false
  }
  return true
});

/*
const {
  after,
  attempt,
  attemptP,
  bimap,
  chain,
  chainRej,
  coalesce,
  encase,
  encaseP,
  mapRej,
  node,
  reject,
  rejectAfter,
  resolve,
  swap
} = F
const UNARY = { attempt, attemptP, resolve, reject, swap }
const BINARY = map(curryN(2), {
  after,
  chain,
  chainRej,
  encase,
  encaseP,
  mapRej,
  node,
  rejectAfter
})
const TERNARY = map(curryN(3), { bimap, coalesce })
export const BACK_TO_THE_OLD_FLUTURE = {
  UNARY,
  BINARY,
  TERNARY
}
*/

var futurizeWithCancel = ramda.curryN(3, function (arity, fn, cancel) { return ramda.curryN(arity, function promise2Future() {
    var this$1 = this;
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    return new F(function (bad, good) {
      fn.apply(this$1, [].concat( args ))
        .catch(bad)
        .then(good);
      return cancel
    })
  }); }
);

var unfuturize = ramda.curryN(2, function (arity, fn) { return ramda.curryN(arity, function future2Promise() {
    var this$1 = this;
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    return new Promise(function (resolve, reject) { return F.fork(reject)(resolve)(fn.apply(this$1, args)); }
    )
  }); }
);

var flag = ramda.curryN(2, function (key, value) { return [key, value]; });
var regexFlag = flag("-e");
var stringFlag = flag("-F");
var globFlag = flag("-g");

var reject = F.reject;

var CALLS = Object.freeze({
  raw: ramda.always(["rg", ["--column", "--line-number", "--color", "never"]]),
  regex: regexFlag,
  string: stringFlag,
  globs: ramda.curry(function (globs, flags) { return ramda.reduce(function (agg, c) { return agg.concat(ramda.pipe(quote, globFlag)(c)); }, flags, globs); }
  )
});

var handleCalls = ramda.curry(function (regex, string, globs) {
  var ref = CALLS.raw();
  var cmd = ref[0];
  var flags = ref[1];
  var otherFlags = regex ? CALLS.regex(regex) : CALLS.string(string);
  var globbed = CALLS.globs(globs, []);
  var allFlags = flags.concat(otherFlags, globbed);
  return [cmd, allFlags]
});

/* istanbul-ignore */
var hardOut = function () { return console.log("quitting...") || process.exit(1); };

// execa fxeca -- (fxeca might be a module on its own someday)
var fxeca = futurizeWithCancel(2, execa, hardOut);

var hasErrorOrIsCancelled = ramda.either(
  ramda.propEq("stderr", ""),
  ramda.propEq("isCancelled", true)
);

var formatResults = ramda.map(
  ramda.pipe(ramda.split(":"), function (ref) {
    var file = ref[0];
    var line = ref[1];
    var column = ref[2];
    var match = ref[3];

    return ({
    file: file,
    line: parseInt(line),
    column: parseInt(column),
    match: match
  });
})
);

var handleCancelledCaseOr = ramda.ifElse(ramda.propEq("isCancelled", true), function () { return reject("Process was killed!"); }
);
var handleGoodCase = ramda.pipe(ramda.prop("stdout"), ramda.split("\n"), formatResults);
var handleError = ramda.pipe(ramda.prop("stderr"), reject);

var futureCall = ramda.curry(function (search, ref) {
  var cwd = ref[0];
  var rx = ref[1];
  var globs = ref[2];

  var ref$1 = handleCalls(rx, search, globs);
  var cmd = ref$1[0];
  var args = ref$1[1];
  return cwd ? fxeca(cmd, args, { cwd: cwd }) : fxeca(cmd, args)
});

var manipulate = ramda.ifElse(
  hasErrorOrIsCancelled,
  handleCancelledCaseOr(handleGoodCase),
  handleError
);

var gripgrep = ramda.curry(function (opts, search) { return ramda.pipe(
    // force object
    function (x) { return x || {}; },
    // force array
    box,
    // grab keys safely
    ramda.ap([
      // ripgrep-js required CWD, but because we're using execa we don't need to
      orNil(KEYS.CWD),
      // TODO: Right now since we're basing our API on ripgrep-js, this is set up as a boolean | regex
      // but we could make this boolean only, and then have the search term be potentially a regex
      ramda.propOr(false, KEYS.REGEX),
      ramda.propOr([], KEYS.GLOBS)
    ]),
    // do stuff with the options now that we have them
    ramda.pipe(
      // search => Future(execa)
      futureCall(search),
      // use map b/c we're changing a monad now
      ramda.map(manipulate)
    )
  )(opts); }
);

module.exports = gripgrep;
