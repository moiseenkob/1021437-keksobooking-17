'use strict';

(function () {

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var mapPinMain = document.querySelector('.map__pin--main');
  var flagRenderPins = false;

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


  var onMapPinMainClick = function () {
    var blockMap = document.querySelector('.map--faded');
    if (blockMap !== null) {
      flagRenderPins = false;
    }
    window.form.activeMap();
    window.form.activeForm();

    /* Write the data in the address field when the label is active */
    window.form.fieldAddress.value = window.mainPin.getMainPinCoordinates('active');

    if (!flagRenderPins) {
      window.handlerPins.removePins();
      window.backend.loadDataFromServer(window.filter, window.error.createModalErrorInfo);
    }
    flagRenderPins = true;

    mapPinMain.removeEventListener('click', onMapPinMainClick);
  };

  mapPinMain.addEventListener('click', onMapPinMainClick);
  mapPinMain.addEventListener('mousedown', window.move);

  window.mainPin = {
    mapPinMain: mapPinMain,
    getMainPinCoordinates: getMainPinCoordinates,
    onMapPinMainClick: onMapPinMainClick
  };

})();
