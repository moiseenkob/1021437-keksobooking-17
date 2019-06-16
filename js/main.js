'use strict';

var COUNT_AD = 8;
var TYPE_HOUSE = ['palace', 'flat', 'house', 'bungalo'];
var Y_MAP_MIN = 130;
var Y_MAP_MAX = 630;
var MIN_VALUE = 1;
var MAP_WIDTH = 50;
var MAP_HEIGHT = 70;
var MAP_MAIN_WIDTH = 65;
var MAP_MAIN_HEIGTH = 65;

/* Забираем данные из шаблона */
var visibleHouseMap = document.querySelector('#pin').content.querySelector('.map__pin');
var mapSurf = document.querySelector('.map__pins');
/* Переменная элементов формы */
var adFormField = document.querySelectorAll('.ad-form fieldset');
/* Переменная Блокировка select */
var adFormSelect = document.querySelector('.map__filters');
var adFormFieldSelect = adFormSelect.querySelectorAll('select');

/* Изначальная вставка координат main PIN */
var mapMainStartPosition = document.querySelector('.map__pin--main');
var inputAddress = document.querySelector('input[name="address"]');
/* var selectDateTimeIn = document.querySelector('#timein');
var selectDateTimeOut = document.querySelector('#timeout'); */


/* Функция рандомного числа */
var randomCount = function (min, max) {
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
        'type': TYPE_HOUSE[randomCount(0, TYPE_HOUSE.length - MIN_VALUE)]
      },
      'location': {
        'x': randomCount(MIN_VALUE, mapSurf.clientWidth),
        'y': randomCount(Y_MAP_MIN, Y_MAP_MAX)
      }
    };

    /* Добаввляем наши объекты в массив */
    objectHouse.push(item);
  }

  return objectHouse;
};

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
    houseElements.style.left = items[i]['location']['x'] + (MAP_WIDTH / 2) + 'px';
    houseElements.style.top = items[i]['location']['y'] - MAP_HEIGHT + 'px';

    /* Вставляем объекты в фрагмент */
    fragment.appendChild(houseElements);

  }

  return fragment;
};

/* Мы вызвали функцию чтобы создать объекты, которые взяли из базы "COUNT_AD" */
var items = createHouse(COUNT_AD);

/* Module 4 */

/* Блокировка инпутов */

var addAttributeFieldsDisabled = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].setAttribute('disabled', '');
  }
};

var removeAttributeFormSelect = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].removeAttribute('disabled');
  }
};

var addAttributeFields = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].setAttribute('disabled', '');
  }
};

addAttributeFields(adFormFieldSelect);

/* Вызов функции для прохода по массиву и блокировки */
addAttributeFieldsDisabled(adFormField);

/* Функция удаления лишних классов */
var activeWindow = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].removeAttribute('disabled');
  }
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  document.querySelector('.map').classList.remove('map--faded');
};

/* Функция которая возращает координат */
var viewCoordinatesMap = function (map) {
  var coordinatesMap = {
    left: map.offsetLeft,
    top: map.offsetTop
  };
  return coordinatesMap;
};

/* Вызов функции */
var mapMainCoordinates = viewCoordinatesMap(mapMainStartPosition);
/* Запись данных в input */
inputAddress.value = (mapMainCoordinates.left + (MAP_MAIN_WIDTH / 2)) + ', ' + (mapMainCoordinates.top + (MAP_MAIN_HEIGTH / 2));

/* Функция для вставления координат в адрес */
mapMainStartPosition.addEventListener('mouseup', function () {
  /* Удаляем лишние классы и аттрибуты */
  activeWindow(adFormField);
  removeAttributeFormSelect(adFormSelect);
  /* В div вставляем наши сгенерированные DOM элементы */
  var fragment = createFragment(items);
  mapSurf.appendChild(fragment);
  /* Вставляем наши свежие данные */
  inputAddress.value = (mapMainCoordinates.left + (mapMainStartPosition.clientWidth / 2)) + ', ' + (mapMainCoordinates.top + MAP_MAIN_HEIGTH);
});
