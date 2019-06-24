'use strict';

(function () {

  var selectDateTimeIn = document.querySelector('#timein');
  var selectDateTimeOut = document.querySelector('#timeout');
  var setTimeForm = document.querySelector('.ad-form__element--time');
  var selectTypeHouse = document.querySelector('#type');
  var setMinPriceField = document.querySelector('#price');
  var adMapFilters = document.querySelector('.map__filters');
  var adMapFieldFilters = adMapFilters.querySelectorAll('select');
  var adMapFieldFiltersFeatures = adMapFilters.querySelectorAll('fieldset');
  var adFormField = document.querySelectorAll('.ad-form fieldset');
  var inputAddress = document.querySelector('input[name="address"]');
  var PRICE_ONE_NIGHT = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  /* Вызов функций для добавления атрибутов Disabled*/
  window.utilis.addAttributeFieldsDisabled(adMapFieldFilters);
  window.utilis.addAttributeFieldsDisabled(adFormField);
  window.utilis.addAttributeFieldsDisabled(adMapFieldFiltersFeatures);

  /* Замена цены при смене типа жилья */
  var onSelectTypeHouse = function (evt) {
    var value = evt.target.value;
    setMinPriceField.placeholder = PRICE_ONE_NIGHT[value];
    setMinPriceField.min = PRICE_ONE_NIGHT[value];
  };

  /* Функция сброса значений */
  var setDefaultValues = function () {
    setMinPriceField.placeholder = PRICE_ONE_NIGHT['flat'];
    inputAddress.value = window.mainPin.getMainPinCoordinates('disabled');
  };

  /* Прослушиваем событие для указания цены при выборе типа жилья */
  selectTypeHouse.addEventListener('change', onSelectTypeHouse);

  /* Установка времени при выборе въезда или выезда */
  var onSetTimeFormChange = function (evt) {
    var target = evt.target;
    if (target.id === selectDateTimeIn.id) {
      selectDateTimeOut.options.selectedIndex = target.options.selectedIndex;
    } else {
      selectDateTimeIn.options.selectedIndex = target.options.selectedIndex;
    }
  };

  /* Прослушиваем событие для указания время заселения и выезда */
  setTimeForm.addEventListener('change', onSetTimeFormChange);

  setDefaultValues();

  window.form = {
    setMinPriceField: setMinPriceField,
    inputAddress: inputAddress,
    PRICE_ONE_NIGHT: PRICE_ONE_NIGHT,
    setDefaultValues: setDefaultValues,
    adFormField: adFormField,
    adMapFieldFilters: adMapFieldFilters,
    adMapFieldFiltersFeatures: adMapFieldFiltersFeatures
  };

})();
