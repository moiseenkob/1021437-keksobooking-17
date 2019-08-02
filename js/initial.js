'use strict';

(function () {

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var pinBase = document.querySelector('.map__pin--main');
  var flagRenderPins = false;

  /* Functions for setting the value for active action and blocking */
  var getBaseCoordinates = function (state) {
    var left = pinBase.offsetLeft;
    var top = pinBase.offsetTop;

    switch (state) {
      case 'active':
        return Math.round(left + (MAIN_PIN_WIDTH / 2)) + ', ' + Math.round(top + MAIN_PIN_HEIGHT);
      case 'disabled':
        return Math.round(left + (MAIN_PIN_WIDTH / 2)) + ', ' + Math.round(top + MAIN_PIN_HEIGHT / 2);
      default:
        return Math.round(left + (MAIN_PIN_WIDTH / 2)) + ', ' + Math.round(top + MAIN_PIN_HEIGHT / 2);
    }
  };


  var onPinMainClick = function () {
    var blockMap = document.querySelector('.map--faded');
    if (blockMap !== null) {
      flagRenderPins = false;
    }
    window.form.setActiveMap();
    window.form.setActiveField();

    /* Write the data in the address field when the label is active */
    window.form.fieldAddress.value = window.initial.getBaseCoordinates('active');

    if (!flagRenderPins) {
      window.pins.remove();
      window.backend.loadDataFromServer(window.createPins, window.error.createModal);
    }
    flagRenderPins = true;

    pinBase.removeEventListener('click', onPinMainClick);
  };

  pinBase.addEventListener('click', onPinMainClick);
  pinBase.addEventListener('mousedown', window.mainPinDrag);

  window.initial = {
    pinBase: pinBase,
    getBaseCoordinates: getBaseCoordinates,
    onPinMainClick: onPinMainClick
  };

})();
