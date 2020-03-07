'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var ramda = require('ramda');
var fluture = require('fluture');
var handlebars = require('handlebars');
var cosmiconfig = require('cosmiconfig');
var inquirer = require('inquirer');
var changeCase = require('change-case');
var ensorcel = require('ensorcel');
var torpor = require('torpor');
var cleanStack = _interopDefault(require('clean-stack'));
var kleur = require('kleur');

var name = "skeletal";
var version = "0.0.5";
var description = "Build the bones of a project";
var main = "skeletal.js";
var module$1 = "skeletal.mjs";
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
	module: module$1,
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

var talker = ramda.curry(function (conf, bar, text) {
  if (conf.silent) { return }
  var up = function (txt) {
    if (conf.verbose) { bar.log.write(txt); }
    bar.updateBottomBar(txt);
  };
  if (text && text.text) {
    up(text.text);
  } else {
    up(text);
  }
});

var bakedIn = {
  capitalCase: changeCase.capitalCase,
  constantCase: changeCase.constantCase,
  camelCase: changeCase.camelCase,
  dotCase: changeCase.dotCase,
  headerCase: changeCase.headerCase,
  noCase: changeCase.noCase,
  paramCase: changeCase.paramCase,
  pascalCase: changeCase.pascalCase,
  pathCase: changeCase.pathCase,
  sentenceCase: changeCase.sentenceCase,
  snakeCase: changeCase.snakeCase
};

var bakeIn = call(function () { return ramda.pipe(
    ramda.toPairs,
    ramda.map(function (ref) {
      var k = ref[0];
      var v = ref[1];

      return handlebars.registerHelper(k, v);
    })
  )(bakedIn); }
);

/* import { trace } from "xtrace" */
var freeze = Object.freeze;
var own = function (z) { return Object.getOwnPropertyNames(z); };

var deepfreeze = function (o) {
  if (o === Object(o)) {
    if (!Object.isFrozen(o)) { freeze(o); }
    own(o).forEach(function (pp) {
      if (pp !== "constructor") { deepfreeze(o[pp]); }
    });
  }
  return o
};

var NM = "node_modules";

var cutAfterStringAdjust = ramda.curry(function (alter, aa, bb) { return bb.slice(bb.indexOf(aa) + aa.length + alter); }
);

var unwrap = ramda.replace(")", "");

var austereStack = ramda.when(
  function (e) { return e && e.stack; },
  function (e) { return ramda.pipe(
      ramda.prop("stack"),
      function (ST) { return cleanStack(ST, { pretty: true }); },
      ramda.split("\n"),
      ramda.map(
        ramda.pipe(
          ramda.when(
            ramda.includes(NM),
            function (z) { return "    at " + ramda.pipe(cutAfterStringAdjust(1, NM), unwrap)(z); }
          ),
          ramda.when(ramda.includes(","), function (z) { return z.slice(0, z.indexOf(",")); })
        )
      ),
      ramda.join("\n"),
      ramda.assoc("stack", ramda.__, e)
    )(e); }
);
var fork = ensorcel.tacit(2, fluture.fork);

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

var nameAndVersion = function () { return PKG.name + PKG.version; };
var nameVersion = ramda.pipe(nameAndVersion, kleur.bold);

var error = ramda.curry(function (ns, message, data) {
  var name = (nameVersion()) + "::" + ns;
  var e = new Error(message);
  e.name = name;
  e.data = data;
  return e
  /* return austereStack(e) */
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

var processHandlebars = ramda.curry(
  function (boneUI, answers, templateFile, templateF) { return ramda.map(
      ramda.pipe(
        handlebars.compile,
        boneUI.say("Processing handlebars..."),
        function (fn) {
          try {
            return fn(answers)
          } catch (ee) {
            return ramda.pipe(austereStack, fluture.reject)(ee)
          }
        },
        boneUI.say(("Converted " + templateFile))
      )
    )(templateF); }
);

var writeOutput = ramda.curry(function (flag, outputFile, processedHandlebarsF) { return ramda.chain(function (content) { return ramda.pipe(
      torpor.writeFile(outputFile, ramda.__, { format: "utf8", flag: flag }),
      ramda.map(function () { return ("Generated " + outputFile); }),
      fluture.mapRej(
        function () { return ("Unable to write to " + outputFile + ".\n\tYou can use the --force flag, but it may overwrite existing files."); }
      )
    )(content); }
  )(processedHandlebarsF); }
);

var writeTemplate = ramda.curry(
  function (boneUI, answers, flag, ref) {
      var type = ref[0];
      var templateFile = ref[1];
      var outputFile = ref[2];

      return ramda.when(
      function () { return ramda.equals(type, "add"); },
      ramda.pipe(
        boneUI.say(("Reading " + templateFile + "...")),
        torpor.readFile(templateFile),
        processHandlebars(boneUI, answers, templateFile),
        writeOutput(flag, outputFile)
      )
    )("utf8");
}
);

var templatizeActions = ramda.curry(function (answers, actions) { return ramda.map(
    ramda.map(
      ramda.pipe(handlebars.compile, function (temp) {
        try {
          return temp(answers)
        } catch (ee) {
          ramda.pipe(austereStack, fluture.reject)(ee);
          process.exit(2);
        }
      })
    )
  )(actions); }
);

var render = ramda.curry(function (config, boneUI, ligament, filled) {
  var threads = ramda.propOr(10, "threads", ligament);
  var forceWrite = ramda.pathOr(false, ["config", "force"], ligament);
  var answers = filled.answers;
  var actions = filled.actions;
  var flag = forceWrite ? "w" : "wx";
  return ramda.pipe(
    templatizeActions(answers),
    ramda.map(
      ramda.pipe(
        ensorcel.box,
        ramda.ap([
          ramda.propOr(UNSET, "type"),
          ramda.propOr(UNSET, "template"),
          ramda.propOr(UNSET, "path")
        ]),
        ramda.ifElse(
          ramda.any(ramda.equals(UNSET)),
          ramda.pipe(ERROR.INCOMPLETE_ACTION, fluture.reject),
          writeTemplate(boneUI, answers, flag)
        )
      )
    ),
    boneUI.say("Processing..."),
    fluture.parallel(threads),
    ramda.map(
      ramda.pipe(
        ramda.join("\n\t- "),
        function (z) { return "🦴 " + (nameVersion()) + " - bone-setting complete!\n\t- " + z; }
      )
    )
  )(actions)
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

var getChoiceValue = ramda.when(
  ramda.is(Object),
  ramda.cond([
    [ramda.propOr(false, "value"), ramda.prop("value")],
    [ramda.propOr(false, "name"), ramda.prop("name")],
    [ramda.propOr(false, "key"), ramda.prop("key")]
  ])
);

var propIsString = ramda.propSatisfies(ramda.is(String));
var casedEqual = ramda.curry(function (a, b) { return ramda.toLower(a) === ramda.toLower(b); });

var choiceMatchesValue = ramda.curry(function (cx, ix, val) {
  var cv = getChoiceValue(cx);
  var matchesChoice = cv && casedEqual(cv, val);
  /* const matchesKey = is(String, cx.key) && casedEqual(cx.key, val) */
  /* const matchesName = is(String, cx.name) && casedEqual(cx.name, val) */
  var matchesIndex = casedEqual(ix.toString(), val);
  return matchesChoice || matchesIndex
});

var isFlag = ramda.curry(function (list, v) { return ramda.pipe(ramda.includes(ramda.toLower(v)))(list); });

var flag = {
  isTrue: isFlag(["yes", "y", "true", "t"]),
  isFalse: isFlag(["no", "n", "false", "f"]),
  isPrompt: function (vv) { return /^_+$/.test(vv); }
};

var listTypeBypass = ramda.curry(function (val, prompt) {
  var choice = prompt.choices.find(function (cx, ix) { return choiceMatchesValue(cx, ix, val); }
  );
  if (!choice) { return getChoiceValue(choice) }
  return new Error("Invalid choice")
});
var ifind = ramda.addIndex(ramda.find);

var typeBypass = {
  confirm: function (v) { return flag.isTrue(v)
      ? true
      : flag.isFalse(v)
      ? false
      : new Error("Invalid input"); },
  checkbox: function (v, prompt) { return ramda.pipe(
      ramda.split(","),
      ramda.ifElse(
        ramda.pipe(
          ramda.filter(
            function (vv) { return !prompt.choices.some(function (cx, ix) { return choiceMatchesValue(cx, ix, vv); }); }
          ),
          function (found) { return found.length !== 0; }
        ),
        function (xx) { return new Error(("No match for \"" + (xx.join('", "')) + "\"")); },
        ramda.map(function (vv) { return ramda.pipe(
            ifind(function (cx, ix) { return choiceMatchesValue(cx, ix, vv); }),
            getChoiceValue
          )(prompt.choices); }
        )
      )
    )(v); },
  list: listTypeBypass,
  rawlist: listTypeBypass,
  expand: listTypeBypass
};

var iforEach = ramda.addIndex(ramda.forEach);

var bypass = ramda.curryN(2, function (prompts, arr) {
  var noop = [prompts, {}];
  var arrLength = ramda.length(arr);
  if (!Array.isArray(prompts) || !Array.isArray(arr) || arrLength === 0) {
    return noop
  }
  var inqPrompts = inquirer.prompt.prompts;
  var answers = {};
  var failures = [];

  iforEach(function (pr, ix) {
    if (ix >= arrLength) { return false }
    var val = arr[ix].toString();
    if (flag.isPrompt(val)) { return false }
    if (ramda.is(Function, pr.when)) {
      failures.push("You cannot bypass conditional prompts.");
      return false
    }
    try {
      var iq = ramda.propOr({}, pr.type, inqPrompts);
      var bypassFn = pr.bypass || iq.bypass || typeBypass[pr.type];
      var value = ramda.is(Function, bypassFn) ? bypassFn(val, pr) : val;
      var answer = pr.filter ? pr.filter(value) : value;
      if (pr.validate) {
        var valid = pr.validate(value);
        if (!valid) {
          failures.push(new Error(("\"" + (pr.name) + "\" did not pass validation.")));
          return false
        }
      }
      answers[pr.name] = answer;
    } catch (err) {
      failures.push(
        ("The \"" + (pr.name) + "\" prompt didn't recognize \"" + val + "\" as a valid " + (pr.type) + " value. (ERROR: " + (err.message) + ")")
      );
      return false
    }
  })(prompts);
  var postBypassPrompts = ramda.map(
    ramda.when(
      function (x) { return !!answers[x.name]; },
      function (x) { return ramda.mergeRight(x, { default: answers[x.name], when: false }); }
    )
  )(prompts);
  if (failures.length > 0) {
    throw new Error(failures[0])
  } else {
    return [postBypassPrompts, answers]
  }
});

var getName = ramda.propOr(UNSET, "name");
var getPrompts = ramda.propOr(UNSET, "prompts");
var getActions = ramda.propOr(UNSET, "actions");

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

var reduceFutures = ramda.curry(function (fn, list) { return ramda.reduce(
    function (left, right) { return ramda.chain(function (ll) { return ramda.map(fn(ll), right); }, left); },
    fluture.resolve({})
  )(list); }
);
var sequentialResolve = reduceFutures(ramda.mergeRight);

var handleUnpromptedAnswers = ramda.curry(function (ligature, rawF) {
  var answers = ramda.pathOr([], ["config", "_"], ligature);
  return ramda.map(function (x) {
    var givenPrompts = ramda.propOr([], "prompts", x);
    var ref = bypass(givenPrompts, answers);
    var prompts = ref[0];
    var preAnswered = ref[1];
    return ramda.mergeRight(x, {
      prompts: prompts,
      preAnswered: preAnswered
    })
  })(rawF)
});

var mergePreAnswers = ramda.curry(function (given, answers) { return ramda.mergeRight(given, {
    answers: ramda.mergeRight(given.preAnswered ? given.preAnswered : {}, answers)
  }); }
);
var pattern = ramda.curry(function (ligature, raw) {
  var cancel = ramda.propOr(ramda.identity, "cancel", ligature);
  var willPrompt = ensorcel.futurizeWithCancel(cancel, 1, inquirer.prompt);
  var build = function (xxx) { return new fluture.Future(function (bad, good) {
      validatePatternAndSubmit(bad, good, xxx);
      return cancel
    }); };

  return [
    raw.name,
    ramda.pipe(
      build,
      handleUnpromptedAnswers(ligature),
      ramda.chain(function (given) { return ramda.pipe(
          ramda.propOr([], "prompts"),
          ramda.map(willPrompt),
          sequentialResolve,
          ramda.map(mergePreAnswers(given))
        )(given); }
      )
    )(raw)
  ]
});

var NO_CONFIG = STRINGS.NO_CONFIG;

var configure = ramda.curry(function (state, ligament, xxx) { return ramda.pipe(
    ramda.propOr(function () {
      var obj;

      return (( obj = {}, obj[NO_CONFIG] = true, obj ));
    }, "config"),
    function (z) {
      try {
        z(ligament);
        return state.patterns
      } catch (err) {
        throw austereStack(err)
      }
    }
  )(xxx); }
);

var cosmicConfigurate = ramda.curry(function (state, boneUI, ligament, cosmic) {
  var cancel = ramda.propOr(ramda.identity, "cancel", ligament);
  var futurize = ensorcel.futurizeWithCancel(cancel);
  var cosmicLoad = futurize(1, cosmic.load);
  var cosmicSearch = futurize(0, cosmic.search);
  return ramda.pipe(
    ramda.ifElse(ramda.pathOr(false, ["config", "configFile"]), cosmicLoad, function () { return cosmicSearch(); }
    ),
    ramda.map(configure(state, ligament))
  )(ligament)
});

var INITIAL_BONEFILE = "// 🦴 " + (nameAndVersion()) + " autogenerated bonefile \n\nmodule.exports = bones => {\n  console.log(\"runtime bones.config\", bones.config)\n  bones.pattern({\n    name: \"madlib\",\n    prompts: [\n      { type: \"input\", name: \"name\", message: \"A name?\" },\n      { type: \"input\", name: \"adjective1\", message: \"An adjective?\" },\n      { type: \"input\", name: \"noun1\", message: \"A noun?\" },\n      { type: \"input\", name: \"verb1\", message: \"A verb?\" },\n      { type: \"input\", name: \"verb2\", message: \"Another verb?\" },\n      { type: \"input\", name: \"group\", message: \"A group noun?\" },\n      { type: \"input\", name: \"verb3\", message: \"Yet another verb?\" },\n    ],\n    actions: [\n      {\n        type: \"add\",\n        template: \"templates/example-madlib.hbs\",\n        path: \"{{paramCase adjective1}}-{{paramCase noun1}}.md\"\n      }\n   ]\n  })\n}\n\n";

var UTF8_NO_OVERWRITE = { format: "utf8", flag: "wx" };

// Skeletal is a very cool library. If you use it and like it, please tell others about it.
var MADLIB = "// a 🦴 " + (nameAndVersion()) + " madlib\n\n{{name}} is a very {{adjective1}} {{noun1}}.\nIf you {{verb1}} it and {{verb2}} it,\nplease {{verb3}} {{#if group}}{{group}}{{else}}others{{/if}} about it. \n\n";

var initialBoneFile = function (config) {
  var ns = ramda.propOr("skeletal", "init", config);
  var templatePath = ramda.propOr(
    "templates/example-madlib.hbs",
    "templatePath",
    config
  );
  var outPath = ramda.propOr((ns + ".config.js"), "outPath", config);
  return ramda.pipe(
    torpor.writeFile(templatePath, MADLIB),
    ramda.chain(function () { return torpor.writeFile(outPath, INITIAL_BONEFILE, UTF8_NO_OVERWRITE); }),
    fluture.mapRej(function () { return ("Unable to write file to " + outPath + ", it may already exist?"); }),
    ramda.map(
      function () { return ("🦴 " + (nameVersion()) + " - Wrote initial config file to " + ns + ".config.js!\n\tRun 'bone " + (ns !== "skeletal" ? "-n " + ns + " " : "") + "-p madlib' :)"); }
    )
  )({ format: "utf8", flag: "w" })
};

var NO_CONFIG$1 = STRINGS.NO_CONFIG;

var hasNoConfig = ramda.propEq(NO_CONFIG$1, true);

var getPattern = ramda.propOr(false, "pattern");

var boneDance = ramda.curry(
  function (config, ref, boneUI, ligament, configF) {
      var patterns = ref.patterns;

      return ramda.pipe(
      ramda.chain(
        ramda.cond([
          [
            ligament.checkCancelled,
            ramda.pipe(boneUI.say("Aborting..."), function () { return fluture.reject("Aborted"); })
          ],
          [
            hasNoConfig,
            ramda.pipe(boneUI.say("No config found!"), function () {
              var ns = ramda.propOr("skeletal", "namespace", config);
              return fluture.reject(
                ("No config file found for namespace: \"" + ns + "\". Try \"bone --init " + ns + "\"?")
              )
            })
          ],
          [
            function () { return getPattern(config); },
            function () {
              var which = getPattern(config);
              return ramda.pipe(
                boneUI.say(("Using \"" + which + "\" pattern...\n")),
                ramda.prop(which),
                ramda.chain(render(config, boneUI, ligament))
              )(patterns)
            }
          ],
          [
            function () { return true; },
            function () { return fluture.resolve(
                ("🦴 " + (nameVersion()) + " - Available patterns:\n\t- " + (ramda.keys(
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
  var init = ramda.propOr(false, "init", config);
  if (init) { return initialBoneFile(config) }
  // STATE
  var patterns = {};
  var state = { patterns: patterns };
  // UI
  var bar = new inquirer.ui.BottomBar();
  var talk = talker(config, bar);
  var say = function (x) { return call(function () { return talk(x + "\n"); }); };
  var boneUI = { bar: bar, talk: talk, say: say };
  var threads = ramda.propOr(10, "threads", config);
  // CANCELLATION
  var isCancelled = false;
  var cancel = function () {
    isCancelled = true;
    process.exit(1);
  };
  // closured, for your safety
  var checkCancelled = function () { return isCancelled; };
  // wrap our composition steps with this so we can barf early
  var cancellable = ramda.unless(checkCancelled);
  // this is what the consumer sees as "bones" in the config file
  var ligament = {
    threads: threads,
    cancel: cancel,
    checkCancelled: checkCancelled,
    config: deepfreeze(config),
    registerPartial: handlebars.registerPartial,
    registerHelper: handlebars.registerHelper
  };
  // inject ligament consuming functions into ligament
  // js: a wild beast of dynamism
  ligament.pattern = saveKeyed(patterns, pattern(ligament));
  return ramda.pipe(
    ramda.propOr("skeletal", "namespace"),
    cosmiconfig.cosmiconfig,
    cancellable(cosmicConfigurate(state, boneUI, ligament)),
    bakeIn,
    boneDance(config, state, boneUI, ligament),
    fluture.mapRej(function (ee) {
      console.warn(("🤕 " + (nameVersion()) + " failed!"));
      return austereStack(ee)
    })
  )(config)
};

exports.austereStack = austereStack;
exports.boneDance = boneDance;
exports.cutAfterStringAdjust = cutAfterStringAdjust;
exports.deepfreeze = deepfreeze;
exports.fork = fork;
exports.getPattern = getPattern;
exports.name = name;
exports.skeletal = skeletal;
exports.version = version;
