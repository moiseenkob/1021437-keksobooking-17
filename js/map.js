'use strict';

(function () {

  var map = document.querySelector('.map');

  /* Function remove class and attribute*/
  var activeMap = function () {
    map.classList.remove('map--faded');
  };

  window.map = {
    activeMap: activeMap
  };

})();

