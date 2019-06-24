'use strict';

(function () {

  var map = document.querySelector('.map');
  var adFormMain = document.querySelector('.ad-form');

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

  /* Функция удаления лишних классов и атрибутов*/
  var activeWindow = function () {
    removeAttributeFieldsDisabled(window.form.adFormField);
    removeAttributeFieldsDisabled(window.form.adMapFieldFilters);
    removeAttributeFieldsDisabled(window.form.adMapFieldFiltersFeatures);
    map.classList.remove('map--faded');
    adFormMain.classList.remove('ad-form--disabled');
  };

  window.map = {
    activeWindow: activeWindow,
    removeItems: removeItems,
    addAttributeFieldsDisabled: addAttributeFieldsDisabled,
    removeAttributeFieldsDisabled: removeAttributeFieldsDisabled
  };

})();

