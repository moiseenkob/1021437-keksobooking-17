'use strict';

var COUNT_AD = 8;
var TYPE_HOUSE = ['palace', 'flat', 'house', 'bungalo'];
var Y_MAP_MIN = 130;
var Y_MAP_MAX = 630;
var MIN_VALUE = 1;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAP_PIN_MAIN_WIDTH = 65;
var MAP_PIN_MAIN_HEIGTH = 65;
var PRICE_ONE_NIGHT = [0, 1000, 5000, 10000];

/* Забираем данные из шаблона */
var visibleHouseMap = document.querySelector('#pin').content.querySelector('.map__pin');
var mapSurf = document.querySelector('.map__pins');
/* Переменная элементов формы */
var adFormField = document.querySelectorAll('.ad-form fieldset');
/* Переменная Блокировка select */
var adMapFilters = document.querySelector('.map__filters');
var adMapFieldFilters = adMapFilters.querySelectorAll('select');
var adMapFieldFiltersFeatures = adMapFilters.querySelectorAll('fieldset');

/* Изначальная вставка координат main PIN */
var mapPinMain = document.querySelector('.map__pin--main');
var inputAddress = document.querySelector('input[name="address"]');

/* Переменные для вставления данных */
var selectTypeHouse = document.querySelector('#type');
var setMinPriceField = document.querySelector('#price');

/* Переменные для синхронизации */
var selectDateTimeIn = document.querySelector('#timein');
var selectDateTimeOut = document.querySelector('#timeout');

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
        'x': getRandomNumber(MIN_VALUE, mapSurf.clientWidth),
        'y': getRandomNumber(Y_MAP_MIN, Y_MAP_MAX)
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
    houseElements.style.left = items[i]['location']['x'] + (PIN_WIDTH / 2) + 'px';
    houseElements.style.top = items[i]['location']['y'] - PIN_HEIGHT + 'px';

    /* Вставляем объекты в фрагмент */
    fragment.appendChild(houseElements);

  }

  return fragment;
};

/* Мы вызвали функцию чтобы создать объекты, которые взяли из базы "COUNT_AD" */
var items = createHouse(COUNT_AD);

/* Module 4 */

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

/* Вызов функций для добавления атрибутов Disabled*/
addAttributeFieldsDisabled(adMapFieldFilters);
addAttributeFieldsDisabled(adFormField);
addAttributeFieldsDisabled(adMapFieldFiltersFeatures);

/* Функция удаления лишних классов и атрибутов*/
var activeWindow = function () {
  removeAttributeFieldsDisabled(adFormField);
  removeAttributeFieldsDisabled(adMapFieldFilters);
  removeAttributeFieldsDisabled(adMapFieldFiltersFeatures);
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  document.querySelector('.map').classList.remove('map--faded');
};

/* Функция которая возращает координаты */
var getMainPinCoordinates = function (map) {
  var coordinatesMap = {
    left: map.offsetLeft,
    top: map.offsetTop
  };
  return coordinatesMap;
};

/* Вызов функции */
var mapMainCoordinates = getMainPinCoordinates(mapPinMain);
/* Запись данных в input */
inputAddress.value = (mapMainCoordinates.left + (MAP_PIN_MAIN_WIDTH / 2)) + ', ' + (mapMainCoordinates.top + (MAP_PIN_MAIN_HEIGTH / 2));

/* Функция для вставления координат в адрес */
mapPinMain.addEventListener('mouseup', function () {
  /* Удаляем лишние классы и аттрибуты */
  activeWindow();
  /* В div вставляем наши сгенерированные DOM элементы */
  var fragment = createFragment(items);
  mapSurf.appendChild(fragment);
  /* Вставляем наши свежие данные */
  var getMainPin = getMainPinCoordinates(mapPinMain);
  inputAddress.value = (getMainPin.left + (mapPinMain.clientWidth / 2)) + ', ' + (getMainPin.top + MAP_PIN_MAIN_HEIGTH);
});

/* Модуль два */

/* Установка данных при загрузке страницы */
var setPriceField = function () {
  var activeSelectedTypeHouse = selectTypeHouse.options[selectTypeHouse.selectedIndex].value;
  for (var i = 0; i < selectTypeHouse.length; i++) {
    if (activeSelectedTypeHouse === selectTypeHouse[i].value) {
      setMinPriceField.min = PRICE_ONE_NIGHT[i];
      setMinPriceField.placeholder = PRICE_ONE_NIGHT[i];
    }
  }
};
setPriceField();

selectTypeHouse.addEventListener('change', setPriceField);

/* Время заезда */
selectDateTimeIn.addEventListener('change', function () {
  selectDateTimeOut.options.selectedIndex = selectDateTimeIn.options.selectedIndex;
});
/* Время выезда */
selectDateTimeOut.addEventListener('change', function () {
  selectDateTimeIn.options.selectedIndex = selectDateTimeOut.options.selectedIndex;
});
