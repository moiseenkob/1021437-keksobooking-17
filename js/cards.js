'use strict';


(function () {

  /* Функция удаления элементов */
  var removeItems = function () {
    var pinsMap = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pinsMap.length > 0) {
      for (var i = 0; i < pinsMap.length; i++) {
        pinsMap[i].remove();
      }
    }
  };

  var visibleHouseMap = document.querySelector('#pin').content.querySelector('.map__pin');
  /* Переменная для удаления данных с исключением основной метки */

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var COUNT_AD = 8;

  /* Мы вызвали функцию чтобы создать объекты, которые взяли из базы "COUNT_AD" */
  var items = window.generationElements.createHouse(COUNT_AD);

  var createFragment = function (arr) {

    /* Создали фрагмент для добавление наших домов */
    var fragment = document.createDocumentFragment();

    /* С помощью цикла пробегаемся на каждом элементе и вставляем данные из нашей функции */
    for (var i = 0; i < arr.length; i++) {

      /* Клонируем данные из шаблона */
      var houseElements = visibleHouseMap.cloneNode(true);

      /* Меняем изображения и alt на каждом элементе */
      var imageItem = houseElements.querySelector('img');
      imageItem.src = items[i]['author']['avatar'];
      imageItem.alt = 'Заголовок будущего объявления';

      /* Меняем координаты */
      houseElements.style.left = items[i]['location']['x'] + (PIN_WIDTH / 2) + 'px';
      houseElements.style.top = items[i]['location']['y'] - PIN_HEIGHT + 'px';

      /* Вставляем объекты в фрагмент */
      fragment.appendChild(houseElements);

    }

    return fragment;
  };

  var renderElements = function () {
    var fragment = createFragment(items);
    window.generationElements.globalMap.appendChild(fragment);
  };

  window.cards = {
    removeItems: removeItems,
    renderElements: renderElements
  };

})();

