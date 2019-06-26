'use strict';

(function () {

  var map = document.querySelector('.map');

  /* Функция удаления лишних классов и атрибутов*/
  var activeMap = function () {
    map.classList.remove('map--faded');
  };

  window.map = {
    activeMap: activeMap
  };

})();

