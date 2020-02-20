import path from 'path';
import 'ramda';
import 'flexeca';
import { fork as fork$1 } from 'fluture';
import { tacit } from 'ensorcel';
import 'isomorphic-git';
import 'date-fns';
import GitServer from 'node-git-server';

var fork = tacit(3, fork$1);

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

export { server, shadow };
