(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.throttleDebounce = {}));
}(this, (function (exports) { 'use strict';

  var delayFn = function delayFn(debounce) {
    return function (trailing, delay, fn) {
      var timeoutID;
      var cancelled = false;
      var lastExec = 0;

      var clearExistingTimeout = function clearExistingTimeout() {
        return timeoutID && clearTimeout(timeoutID);
      };

      var cancel = function cancel() {
        clearExistingTimeout();
        cancelled = true;
      };

      function delayed() {
        if (cancelled) return;
        var args = arguments;
        var self = this;
        var elapsed = Date.now() - lastExec;

        var execute = function execute() {
          lastExec = Date.now();
          fn.apply(self, args);
        };

        var clear = function clear() {
          timeoutID = null;
        };

        if (debounce && !timeoutID) execute();
        clearExistingTimeout();

        if (!debounce && elapsed > delay) {
          execute();
        } else if (!trailing) {
          timeoutID = setTimeout(debounce ? clear : execute, debounce ? delay - elapsed : delay);
        }
      }

      delayed.cancel = cancel;
      return delayed;
    };
  };

  var throttle = delayFn(false);

  var debounce = delayFn(true);

  exports.debounce = debounce;
  exports.throttle = throttle;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.umd.js.map
