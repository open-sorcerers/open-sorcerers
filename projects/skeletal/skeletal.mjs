import { once, curry as curry$1, pipe as pipe$1, toPairs, map, replace, when, identity, split, includes, join, chain, __, equals, propOr, pathOr, ap, ifElse, any, reduce, mergeRight, propEq, cond, prop as prop$1, keys as keys$1, unless } from 'ramda';
import { fork as fork$1, mapRej, reject, parallel, resolve, Future } from 'fluture';
import { registerHelper, compile, registerPartial } from 'handlebars';
import { cosmiconfig } from 'cosmiconfig';
import { prompt, ui } from 'inquirer';
import { cyan, bold } from 'kleur';
import { capitalCase, constantCase, camelCase, dotCase, headerCase, noCase, paramCase, pascalCase, pathCase, sentenceCase, snakeCase } from 'change-case';
import { tacit, box, futurizeWithCancel } from 'ensorcel';
import { writeFile, readFile } from 'torpor';
import cleanStack from 'clean-stack';

var name = "skeletal";
var version = "0.0.5-beta.2";
var description = "Build the bones of a project";
var main = "skeletal.js";
var module = "skeletal.mjs";
var bin = {
	bone: "bone-cli.js"
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
	"change-case": "^4.1.1",
	"clean-stack": "^2.2.0",
	cosmiconfig: "^6.0.0",
	ensorcel: "^0.0.2",
	flexeca: "^0.0.1",
	fluture: "^12.2.0",
	handlebars: "^4.7.3",
	inquirer: "^7.0.4",
	kleur: "^3.0.3",
	ora: "^4.0.3",
	ramda: "^0.27.0",
	torpor: "^0.0.4",
	"yargs-parser": "^17.0.0"
};
var files = [
	"skeletal.js",
	"skeletal.mjs",
	"bone-cli.js"
];
var PKG = {
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
	dependencies: dependencies,
	files: files
};

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

var logOnce = once(console.log);

var talker = curry$1(function (conf, bar, text) {
  if (conf.debug) { logOnce(cyan("DEBUG"), conf); }
  if (conf.silent) { return }
  var up = function (txt) {
    if (conf.verbose) { bar.log.write(txt); }
    bar.updateBottomBar(txt);
  };
  if (typeof text === "string") {
    up(text);
  } else if (text.text) {
    up(text.text);
  }
});

var bakedIn = {
  capitalCase: capitalCase,
  constantCase: constantCase,
  camelCase: camelCase,
  dotCase: dotCase,
  headerCase: headerCase,
  noCase: noCase,
  paramCase: paramCase,
  pascalCase: pascalCase,
  pathCase: pathCase,
  sentenceCase: sentenceCase,
  snakeCase: snakeCase
};

var bakeIn = call(function () { return pipe$1(
    toPairs,
    map(function (ref) {
      var k = ref[0];
      var v = ref[1];

      return registerHelper(k, v);
    })
  )(bakedIn); }
);

var obj, obj$1;
var UNSET = "%UNSET%";

var STRINGS = Object.freeze({
  // cli stuff
  debug: "debug",
  force: "force",
  init: "init",
  namespace: "namespace",
  pattern: "pattern",
  silent: "silent",
  threads: "threads",
  verbose: "verbose",
  // errors
  NO_CONFIG: "noConfig"
});

var CLI_OPTIONS = Object.freeze({
  number: ["t"],
  string: ["n", "p", "I"],
  boolean: ["f", "w", "s", "d"],
  default: ( obj = {}, obj[STRINGS.debug] = false, obj[STRINGS.force] = false, obj[STRINGS.init] = "", obj[STRINGS.namespace] = "skeletal", obj[STRINGS.silent] = false, obj[STRINGS.threads] = 10, obj[STRINGS.verbose] = false, obj ),
  alias: ( obj$1 = {}, obj$1[STRINGS.debug] = ["d"], obj$1[STRINGS.force] = ["f"], obj$1[STRINGS.init] = ["I"], obj$1[STRINGS.namespace] = ["n"], obj$1[STRINGS.pattern] = ["p"], obj$1[STRINGS.silent] = ["s"], obj$1[STRINGS.threads] = ["t"], obj$1[STRINGS.verbose] = ["w"], obj$1 )
});

var freeze = Object.freeze;
var own = function (z) { return Object.getOwnPropertyNames(z); };

var deepfreeze = function (o) {
  if (o === Object(o)) {
    if (!Object.isFrozen(o)) { freeze(o); }
    own(o).forEach(function (prop) {
      if (prop !== "constructor") { deepfreeze(o[prop]); }
    });
  }
  return o
};

var NM = "node_modules";

var cutAfterString = curry$1(function (aa, bb) { return bb.slice(bb.indexOf(aa) + aa.length); }
);

var unwrap = replace(")", "");

var austereStack = when(
  identity,
  pipe$1(
    split("\n"),
    map(
      when(
        includes(NM),
        /* z => "    at " + z.slice(z.indexOf(NM) + NM_LENGTH).replace(")", "") */
        function (z) { return "    at " + pipe$1(cutAfterString(NM), unwrap)(z); }
      )
    ),
    join("\n")
  )
);
var fork = tacit(2, fork$1);

var nameAndVersion = function () { return PKG.name + PKG.version; };
var nameVersion = pipe$1(nameAndVersion, bold);

var error = curry$1(function (ns, message, data) {
  var name = (nameVersion()) + "::" + ns;
  var e = new Error(message);
  e.name = name;
  e.data = data;
  e.stack = pipe$1(function (ST) { return cleanStack(ST, { pretty: true }); }, austereStack)(e.stack);
  return e
});
var ERROR = deepfreeze({
  EXPECTED_NAME_AND_MORE: error(
    "pattern",
    "Expected pattern to have {name, prompts, actions} properties."
  ),
  INCOMPLETE_ACTION: error(
    "render",
    "Expected action to have {type, path, template} properties."
  )
});

var processHandlebars = curry$1(function (boneUI, answers, templateFile, templateF) { return map(
    pipe$1(
      compile,
      boneUI.say("Processing handlebars..."),
      function (fn) { return fn(answers); },
      boneUI.say(("Converted " + templateFile))
    )
  )(templateF); }
);

var writeOutput = curry$1(function (flag, outputFile, processedHandlebarsF) { return chain(function (content) { return pipe$1(
      writeFile(outputFile, __, { format: "utf8", flag: flag }),
      map(function () { return ("Generated " + outputFile); }),
      mapRej(
        function () { return ("Unable to write to " + outputFile + ".\n\tYou can use the --force flag, but it may overwrite existing files."); }
      )
    )(content); }
  )(processedHandlebarsF); }
);

var writeTemplate = curry$1(
  function (boneUI, answers, flag, ref) {
      var type = ref[0];
      var templateFile = ref[1];
      var outputFile = ref[2];

      return when(
      function () { return equals(type, "add"); },
      pipe$1(
        boneUI.say(("Reading " + templateFile + "...")),
        readFile(templateFile),
        processHandlebars(boneUI, answers, templateFile),
        writeOutput(flag, outputFile)
      )
    )("utf8");
}
);

var templatizeActions = curry$1(function (answers, actions) { return map(
    map(
      pipe$1(compile, function (temp) {
        try {
          return temp(answers)
        } catch (ee) {
          console.warn(ee);
          process.exit(2);
        }
      })
    )
  )(actions); }
);

var render = curry$1(function (boneUI, ligament, filled) {
  var threads = propOr(10, "threads", ligament);
  var forceWrite = pathOr(false, ["config", "force"], ligament);
  var answers = filled.answers;
  var actions = filled.actions;
  var flag = forceWrite ? "w" : "wx";
  return pipe$1(
    templatizeActions(answers),
    map(
      pipe$1(
        box,
        ap([
          propOr(UNSET, "type"),
          propOr(UNSET, "template"),
          propOr(UNSET, "path")
        ]),
        ifElse(
          any(equals(UNSET)),
          pipe$1(ERROR.INCOMPLETE_ACTION, reject),
          writeTemplate(boneUI, answers, flag)
        )
      )
    ),
    boneUI.say("Processing..."),
    parallel(threads),
    map(
      pipe$1(
        join("\n\t- "),
        function (z) { return "🦴 " + (nameVersion()) + " - bone-setting complete!\n\t- " + z; }
      )
    )
  )(actions)
});

var pushInto = curry$1(function (into, fn) { return pipe$1(
    fn,
    call(function (x) { return into.push(x); })
  ); }
);

var saveKeyed = curry$1(function (struct, fn, input) {
  var ref = fn(input);
  var key = ref[0];
  var ff = ref[1];
  struct[key] = ff;
  return ff
});

var getName = propOr(UNSET, "name");
var getPrompts = propOr(UNSET, "prompts");
var getActions = propOr(UNSET, "actions");

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
  return [
    raw.name,
    pipe$1(
      chain(function (futurePattern) { return pipe$1(
          propOr([], "prompts"),
          map(willPrompt),
          reduce(
            function (left, right) { return chain(function (ll) { return map(mergeRight(ll), right); }, left); },
            resolve({})
          ),
          map(function (answers) { return mergeRight(futurePattern, { answers: answers }); })
        )(futurePattern); }
      )
    )(
      new Future(function (bad, good) {
        validatePatternAndSubmit(bad, good, raw);
        return cancel
      })
    )
  ]
});

var NO_CONFIG = STRINGS.NO_CONFIG;

var configure = curry$1(function (state, ligament, xxx) { return pipe$1(
    propOr(function () {
      var obj;

      return (( obj = {}, obj[NO_CONFIG] = true, obj ));
    }, "config"),
    function (z) { return z(ligament) || state.patterns; }
  )(xxx); }
);

var cosmicConfigurate = curry$1(function (state, boneUI, ligament, cosmic) {
  var cancel = propOr(identity, "cancel", ligament);
  var futurize = futurizeWithCancel(cancel);
  var cosmicLoad = futurize(1, cosmic.load);
  var cosmicSearch = futurize(0, cosmic.search);
  return pipe$1(
    ifElse(pathOr(false, ["config", "configFile"]), cosmicLoad, function () { return cosmicSearch(); }
    ),
    map(configure(state, ligament))
  )(ligament)
});

var INITIAL_BONEFILE = "// 🦴 " + (nameAndVersion()) + " autogenerated bonefile \n\nmodule.exports = bones => {\n  console.log(\"runtime bones.config\", bones.config)\n  bones.pattern({\n    name: \"madlib\",\n    prompts: [\n      { type: \"input\", name: \"name\", message: \"A name?\" },\n      { type: \"input\", name: \"adjective1\", message: \"An adjective?\" },\n      { type: \"input\", name: \"noun1\", message: \"A noun?\" },\n      { type: \"input\", name: \"verb1\", message: \"A verb?\" },\n      { type: \"input\", name: \"verb2\", message: \"Another verb?\" },\n      { type: \"input\", name: \"group\", message: \"A group noun?\" },\n      { type: \"input\", name: \"verb3\", message: \"Yet another verb?\" },\n    ],\n    actions: [\n      {\n        type: \"add\",\n        template: \"templates/example-madlib.hbs\",\n        path: \"{{paramCase adjective1}}-{{paramCase noun1}}.md\"\n      }\n   ]\n  })\n}\n\n";

var UTF8_NO_OVERWRITE = { format: "utf8", flag: "wx" };

// Skeletal is a very cool library. If you use it and like it, please tell others about it.
var MADLIB = "// a 🦴 " + (nameAndVersion()) + " madlib\n\n{{name}} is a very {{adjective1}} {{noun1}}.\nIf you {{verb1}} it and {{verb2}} it,\nplease {{verb3}} {{#if group}}{{group}}{{else}}others{{/if}} about it. \n\n";

var initialBoneFile = function (config) {
  var ns = propOr("skeletal", "init", config);
  return pipe$1(
    writeFile("templates/example-madlib.hbs", MADLIB),
    chain(function () { return writeFile((ns + ".config.js"), INITIAL_BONEFILE, UTF8_NO_OVERWRITE); }
    ),
    mapRej(
      function () { return ("Unable to write file to " + ns + ".config.js, it may already exist?"); }
    ),
    map(
      function () { return ("🦴 " + (nameVersion()) + " - Wrote initial config file to " + ns + ".config.js!\n\tRun 'bone " + (ns !== "skeletal" ? "-n " + ns : "") + " -p madlib' :)"); }
    )
  )({ format: "utf8", flag: "w" })
};

var NO_CONFIG$1 = STRINGS.NO_CONFIG;

var hasNoConfig = propEq(NO_CONFIG$1, true);

var getPattern = propOr(false, "pattern");

var boneDance = curry$1(function (config, ref, boneUI, ligament, configF) {
    var patterns = ref.patterns;

    return pipe$1(
    chain(
      cond([
        [
          ligament.checkCancelled,
          pipe$1(boneUI.say("Aborting..."), function () { return reject("Aborted"); })
        ],
        [
          hasNoConfig,
          pipe$1(boneUI.say("No config found!"), function () {
            var ns = propOr("skeletal", "namespace", config);
            return reject(
              ("No config file found for namespace: \"" + ns + "\". Try \"bone --init " + ns + "\"?")
            )
          })
        ],
        [
          function () { return getPattern(config); },
          function () {
            var which = getPattern(config);
            return pipe$1(
              boneUI.say(("Using \"" + which + "\" pattern...\n")),
              prop$1(which),
              chain(render(boneUI, ligament))
            )(patterns)
          }
        ],
        [
          function () { return true; },
          function () { return resolve(
              ("🦴 " + (nameVersion()) + " - Available patterns:\n\t- " + (keys$1(
                patterns
              ).join("\n\t- ")))
            ); }
        ]
      ])
    )
  )(configF);
}
);

var skeletal = function (config) {
  var init = propOr(false, "init", config);
  if (init) { return initialBoneFile(config) }
  // STATE
  var patterns = {};
  var state = { patterns: patterns };
  // UI
  var bar = new ui.BottomBar();
  var talk = talker(config, bar);
  var say = function (x) { return call(function () { return talk(x + "\n"); }); };
  var boneUI = { bar: bar, talk: talk, say: say };
  var threads = propOr(10, "threads", config);
  // CANCELLATION
  var isCancelled = false;
  var cancel = function () {
    isCancelled = true;
    process.exit(1);
  };
  // closured, for your safety
  var checkCancelled = function () { return isCancelled; };
  // wrap our composition steps with this so we can barf early
  var cancellable = unless(checkCancelled);
  // this is what the consumer sees as "bones" in the config file
  var ligament = {
    threads: threads,
    cancel: cancel,
    checkCancelled: checkCancelled,
    config: deepfreeze(config),
    registerPartial: registerPartial,
    registerHelper: registerHelper
  };
  // inject ligament consuming functions into ligament
  // js: a wild beast of dynamism
  ligament.pattern = saveKeyed(patterns, pattern(ligament));
  return pipe$1(
    propOr("skeletal", "namespace"),
    cosmiconfig,
    cancellable(cosmicConfigurate(state, boneUI, ligament)),
    bakeIn,
    boneDance(config, state, boneUI, ligament),
    mapRej(function (ee) {
      if (ee && ee.stack) { ee.stack = austereStack(ee.stack); }
      console.warn(("🤕 " + (nameVersion()) + " failed!"));
      return ee
    })
  )(config)
};

export { austereStack, cutAfterString, deepfreeze, fork, name, skeletal, version };
