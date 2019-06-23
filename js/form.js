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

  /* Вызов функций для добавления атрибутов Disabled*/
  window.utilis.addAttributeFieldsDisabled(adMapFieldFilters);
  window.utilis.addAttributeFieldsDisabled(adFormField);
  window.utilis.addAttributeFieldsDisabled(adMapFieldFiltersFeatures);

  /* Замена цены при смене типа жилья */
  var onSelectTypeHouse = function (evt) {
    var value = evt.target.value;
    setMinPriceField.placeholder = window.const.PRICE_ONE_NIGHT[value];
    setMinPriceField.min = window.const.PRICE_ONE_NIGHT[value];
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

  /* Функция удаления лишних классов и атрибутов*/
  var activeWindow = function () {
    window.utilis.removeAttributeFieldsDisabled(adFormField);
    window.utilis.removeAttributeFieldsDisabled(adMapFieldFilters);
    window.utilis.removeAttributeFieldsDisabled(adMapFieldFiltersFeatures);
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    document.querySelector('.map').classList.remove('map--faded');
  };

  window.form = {
    setMinPriceField: setMinPriceField,
    activeWindow: activeWindow,
    inputAddress: inputAddress
  };

})();
