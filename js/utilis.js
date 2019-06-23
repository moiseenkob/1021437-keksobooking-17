'use strict';

(function () {
  /* Функция удаления элементов */
  var removeItems = function (elements) {
    if (elements.length > 0) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].remove();
      }
    }
  };

  /* Функция добавление атрибута Disabled */
  var addAttributeFieldsDisabled = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].setAttribute('disabled', '');
    }
  };

  /* Функция удаления атрибута Disabled */
  var removeAttributeFieldsDisabled = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].removeAttribute('disabled');
    }
  };

  /* Функция сброса значений */
  var setDefaultValues = function () {
    window.form.setMinPriceField.placeholder = window.const.PRICE_ONE_NIGHT['flat'];
    window.form.inputAddress.value = getMainPinCoordinates('disabled');
  };

  /* Функиця установки значения при активном действии и блокировке */
  var getMainPinCoordinates = function (state) {
    var left = window.createCards.mapPinMain.offsetLeft;
    var top = window.createCards.mapPinMain.offsetTop;

    switch (state) {
      case 'active':
        return Math.round(left + (window.const.MAP_PIN_MAIN_WIDTH / 2)) + ', ' + Math.round(top + window.const.MAP_PIN_MAIN_HEIGTH);
      case 'disabled':
        return Math.round(left + (window.const.MAP_PIN_MAIN_WIDTH / 2)) + ', ' + Math.round(top + window.const.MAP_PIN_MAIN_HEIGTH / 2);
      default:
        return Math.round(left + (window.const.MAP_PIN_MAIN_WIDTH / 2)) + ', ' + Math.round(top + window.const.MAP_PIN_MAIN_HEIGTH / 2);
    }
  };

  window.utilis = {
    removeItems: removeItems,
    addAttributeFieldsDisabled: addAttributeFieldsDisabled,
    removeAttributeFieldsDisabled: removeAttributeFieldsDisabled,
    setDefaultValues: setDefaultValues,
    getMainPinCoordinates: getMainPinCoordinates
  };

})();
