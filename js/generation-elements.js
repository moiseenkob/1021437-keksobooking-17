'use strict';

(function () {

  var MAX_VALUE = 1135;
  var MIN_VALUE = 1;
  var TYPE_HOUSE = ['palace', 'flat', 'house', 'bungalo'];

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
          'x': getRandomNumber(MIN_VALUE, MAX_VALUE),
          'y': getRandomNumber(window.const.Y_MAP_MIN, window.const.Y_MAP_MAX)
        }
      };

      /* Добаввляем наши объекты в массив */
      objectHouse.push(item);
    }
    return objectHouse;
  };

  window.generationElements = {
    createHouse: createHouse
  };

})();
