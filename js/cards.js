'use strict';


(function () {

  var globalMap = document.querySelector('.map__pins');
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var visibleHouseMap = document.querySelector('#pin').content.querySelector('.map__pin');

  /* Функция удаления элементов */
  var removeItems = function () {
    var pinsMap = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pinsMap.length > 0) {
      for (var i = 0; i < pinsMap.length; i++) {
        pinsMap[i].remove();
      }
    }
  };

  var getSuccessItems = function (arr) {

    var fragment = document.createDocumentFragment();

    /* С помощью цикла пробегаемся на каждом элементе и вставляем данные из нашей функции */
    for (var i = 0; i < arr.length; i++) {
      /* Клонируем данные из шаблона */
      var houseElements = visibleHouseMap.cloneNode(true);
      /* Меняем изображения и alt на каждом элементе */
      var imageItem = houseElements.querySelector('img');
      imageItem.src = arr[i]['author']['avatar'];
      imageItem.alt = arr[i]['offer']['title'];
      houseElements.style.left = arr[i]['location']['x'] + (PIN_WIDTH / 2) + 'px';
      houseElements.style.top = arr[i]['location']['y'] - PIN_HEIGHT + 'px';
      /* Вставляем объекты в фрагмент */
      fragment.appendChild(houseElements);

      globalMap.appendChild(fragment);
    }
    return fragment;
  };

  window.cards = {
    removeItems: removeItems,
    getSuccessItems: getSuccessItems
  };

})();

