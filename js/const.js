'use strict';

(function () {
  var COUNT_AD = 8;
  var TYPE_HOUSE = ['palace', 'flat', 'house', 'bungalo'];
  var Y_MAP_MIN = 130;
  var Y_MAP_MAX = 630;
  var MIN_VALUE = 1;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAP_PIN_MAIN_WIDTH = 65;
  var MAP_PIN_MAIN_HEIGTH = 65;
  var MAP_MAX_WIDTH = 1135;
  var MAP_MIN_WIDTH = 0;
  var PRICE_ONE_NIGHT = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  window.const = {
    COUNT_AD: COUNT_AD,
    TYPE_HOUSE: TYPE_HOUSE,
    Y_MAP_MIN: Y_MAP_MIN,
    Y_MAP_MAX: Y_MAP_MAX,
    MIN_VALUE: MIN_VALUE,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    MAP_PIN_MAIN_WIDTH: MAP_PIN_MAIN_WIDTH,
    MAP_PIN_MAIN_HEIGTH: MAP_PIN_MAIN_HEIGTH,
    MAP_MAX_WIDTH: MAP_MAX_WIDTH,
    MAP_MIN_WIDTH: MAP_MIN_WIDTH,
    PRICE_ONE_NIGHT: PRICE_ONE_NIGHT
  };
})();
