'use strict';

(function () {

  /* Function filter five items */
  var createLimitedObject = function (value) {
    return Array.from(value).slice(0, 4);
  };

  window.filter = {
    createLimitedObject: createLimitedObject
  };

})();
