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

  /* Функция удаления лишних классов и атрибутов*/
  var activeWindow = function () {
    removeAttributeFieldsDisabled(window.form.adFormField);
    removeAttributeFieldsDisabled(window.form.adMapFieldFilters);
    removeAttributeFieldsDisabled(window.form.adMapFieldFiltersFeatures);
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    document.querySelector('.map').classList.remove('map--faded');
  };

  window.utilis = {
    removeItems: removeItems,
    activeWindow: activeWindow,
    addAttributeFieldsDisabled: addAttributeFieldsDisabled,
    removeAttributeFieldsDisabled: removeAttributeFieldsDisabled
  };

})();
