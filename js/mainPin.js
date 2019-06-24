'use strict';

(function () {

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGTH = 65;
  var mapPinMain = document.querySelector('.map__pin--main');

  /* Функиця установки значения при активном действии и блокировке */
  var getMainPinCoordinates = function (state) {
    var left = mapPinMain.offsetLeft;
    var top = mapPinMain.offsetTop;

    switch (state) {
      case 'active':
        return Math.round(left + (MAIN_PIN_WIDTH / 2)) + ', ' + Math.round(top + MAIN_PIN_HEIGTH);
      case 'disabled':
        return Math.round(left + (MAIN_PIN_WIDTH / 2)) + ', ' + Math.round(top + MAIN_PIN_HEIGTH / 2);
      default:
        return Math.round(left + (MAIN_PIN_WIDTH / 2)) + ', ' + Math.round(top + MAIN_PIN_HEIGTH / 2);
    }
  };

  mapPinMain.addEventListener('mousedown', window.move.OnMouseDragAndDromMove);

  window.mainPin = {
    mapPinMain: mapPinMain,
    getMainPinCoordinates: getMainPinCoordinates
  };

})();
