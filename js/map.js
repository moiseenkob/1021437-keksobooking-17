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

  var map = document.querySelector('.map');
  var adFormMain = document.querySelector('.ad-form');

  /* Функция удаления лишних классов и атрибутов*/
  var activeWindow = function () {
    window.form.removeAttributeFieldsDisabled();
    map.classList.remove('map--faded');
    adFormMain.classList.remove('ad-form--disabled');
  };


  window.map = {
    removeItems: removeItems,
    activeWindow: activeWindow
  };

})();

