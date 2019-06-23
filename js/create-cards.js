'use strict';


(function () {
  var TYPE_HOUSE = ['palace', 'flat', 'house', 'bungalo'];
  var globalMap = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var visibleHouseMap = document.querySelector('#pin').content.querySelector('.map__pin');
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var COUNT_AD = 8;
  var MIN_VALUE = 1;

  /* Функция рандомного числа */
  var getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + MIN_VALUE - min));
  };

  /* Создал функцию с объявлениями 8 объектов */
  var createHouse = function (val) {
    var objectHouse = [];
    for (var i = 1; i <= val; i++) {

      /* Добавил рандом типа жилья */
      var item = {
        'author': {
          'avatar': 'img/avatars/user0' + i + '.png'
        },
        'offer': {
          'type': TYPE_HOUSE[getRandomNumber(0, TYPE_HOUSE.length - MIN_VALUE)]
        },
        'location': {
          'x': getRandomNumber(MIN_VALUE, globalMap.clientWidth),
          'y': getRandomNumber(window.const.Y_MAP_MIN, window.const.Y_MAP_MAX)
        }
      };

      /* Добаввляем наши объекты в массив */
      objectHouse.push(item);
    }
    return objectHouse;
  };

  /* Мы вызвали функцию чтобы создать объекты, которые взяли из базы "COUNT_AD" */
  var items = createHouse(COUNT_AD);

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

  window.createCards = {
    fragment: createFragment,
    items: items,
    globalMap: globalMap,
    mapPinMain: mapPinMain,
    TYPE_HOUSE: TYPE_HOUSE
  };

})();
