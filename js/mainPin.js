'use strict';

(function () {

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var mapPinMain = document.querySelector('.map__pin--main');

  /* Functions for setting the value for active action and blocking */
  var getMainPinCoordinates = function (state) {
    var left = mapPinMain.offsetLeft;
    var top = mapPinMain.offsetTop;

    switch (state) {
      case 'active':
        return Math.round(left + (MAIN_PIN_WIDTH / 2)) + ', ' + Math.round(top + MAIN_PIN_HEIGHT);
      case 'disabled':
        return Math.round(left + (MAIN_PIN_WIDTH / 2)) + ', ' + Math.round(top + MAIN_PIN_HEIGHT / 2);
      default:
        return Math.round(left + (MAIN_PIN_WIDTH / 2)) + ', ' + Math.round(top + MAIN_PIN_HEIGHT / 2);
    }
  };

  mapPinMain.addEventListener('mousedown', window.move.OnMouseDragAndDropMove);


  window.mainPin = {
    mapPinMain: mapPinMain,
    getMainPinCoordinates: getMainPinCoordinates
  };

})();
