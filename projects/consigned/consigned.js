'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('path'));
require('ramda');
require('flexeca');
var fluture = require('fluture');
var ensorcel = require('ensorcel');
require('isomorphic-git');
require('date-fns');
var GitServer = _interopDefault(require('node-git-server'));

var fork = ensorcel.tacit(3, fluture.fork);

var shadow = function (ref) {
  var cwd = ref.cwd; if ( cwd === void 0 ) cwd = process.cwd();
  var interval = ref.interval;
  var port = ref.port; if ( port === void 0 ) port = 6699;

  /* const GG = git(cwd) */
};

var server = function (config) {
  if ( config === void 0 ) config = {};

  var PORT = config.port; if ( PORT === void 0 ) PORT = process.env.PORT || 6699;
  var basepath = config.basepath; if ( basepath === void 0 ) basepath = path.resolve(process.cwd(), "tmp");
  var autoCreate = config.autoCreate; if ( autoCreate === void 0 ) autoCreate = true;
  var log = config.log; if ( log === void 0 ) log = console.log;
  var GG = new GitServer(basepath, { autoCreate: autoCreate });
  GG.on("push", function (push) {
    log(("PUSHED " + (push.repo) + "/" + (push.commit) + " (" + (push.branch) + ")"), push);
    push.accept();
  });
  GG.on("fetch", function (fetch) {
    log(("FETCHED " + (fetch.commit)), fetch);
    fetch.accept();
  });
  GG.listen(PORT, function () { return log("CONSIGNED"); });
};

exports.server = server;
exports.shadow = shadow;
