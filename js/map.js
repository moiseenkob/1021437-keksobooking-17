'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters');

  /* Function remove class and attribute*/
  var activeMap = function () {
    map.classList.remove('map--faded');
    mapFilters.classList.remove('ad-form--disabled');
  };

  window.map = activeMap;

})();

