'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  var lastTimeout2;
  var debounce = function (cb) {
    if (lastTimeout2) {
      window.clearTimeout(lastTimeout2);
    }
    lastTimeout2 = window.setTimeout(function () {
      cb;
    }, DEBOUNCE_INTERVAL);
  };

  window.debounce = debounce;
})();
