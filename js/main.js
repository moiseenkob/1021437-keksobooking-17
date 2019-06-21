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
var PRICE_ONE_NIGHT = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

/* Забираем данные из шаблона */
var visibleHouseMap = document.querySelector('#pin').content.querySelector('.map__pin');
var globalMap = document.querySelector('.map__pins');
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
var setTimeForm = document.querySelector('.ad-form__element--time');

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

/* Функция удаления элементов */
var removeItems = function (elements) {
  if (elements.length > 0) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].remove();
    }
  }
};


var getMoveCoordinates = function (y, x) {
  if (y > Y_MAP_MAX) {
    mapPinMain.style.top = Y_MAP_MAX + 'px';
  } else if (y > Y_MAP_MIN <= 0) {
    mapPinMain.style.top = Y_MAP_MIN + 'px';
  } else {
    mapPinMain.style.top = y + 'px';
  }

  if (x >= 1135) {
    mapPinMain.style.left = 1135 + 'px';
  } else if (x <= 0) {
    mapPinMain.style.left = 0 + 'px';
  } else {
    mapPinMain.style.left = x + 'px';
  }
};

/* Вызов функции */
var mapMainCoordinates = getMainPinCoordinates(mapPinMain);
/* Запись данных в input */
inputAddress.value = Math.round(mapMainCoordinates.left) + ', ' + Math.round(mapMainCoordinates.top);


/* Модуль два */
var onSelectTypeHouse = function (evt) {
  var target = evt.target;
  setMinPriceField.placeholder = PRICE_ONE_NIGHT[target.value];
  setMinPriceField.min = PRICE_ONE_NIGHT[target.value];
};
/* Прослушиваем событие для указания цены при выборе типа жилья */
selectTypeHouse.addEventListener('change', onSelectTypeHouse);

var onSetTimeFormChange = function (evt) {
  var target = evt.target;
  if (target.id === selectDateTimeIn.id) {
    selectDateTimeOut.options.selectedIndex = target.options.selectedIndex;
  } else {
    selectDateTimeIn.options.selectedIndex = target.options.selectedIndex;
  }
};

/* Прослушиваем событие для указания время заселения и выезда */
setTimeForm.addEventListener('change', onSetTimeFormChange);

mapPinMain.addEventListener('mousedown', function (evt) {

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };


  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    /* Высота */
    var coordinateYPoint = parseInt(mapPinMain.offsetTop - shift.y, 10);
    var coordinateXPoint = parseInt(mapPinMain.offsetLeft - shift.x, 10);

    /* Вызов функции по ограничению */
    getMoveCoordinates(coordinateYPoint, coordinateXPoint);

    var mainPinsCoordinates = getMainPinCoordinates(mapPinMain);
    inputAddress.value = Math.round(mainPinsCoordinates.left + (MAP_PIN_MAIN_WIDTH / 2)) + ', ' + Math.round(mainPinsCoordinates.top + MAP_PIN_MAIN_HEIGTH);

    /* Переменная для удаления данных с исключением основной метки */
    var pinsMap = globalMap.querySelectorAll('.map__pin:not(.map__pin--main)');
    removeItems(pinsMap);

  };
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    activeWindow();
    var fragment = createFragment(items);
    globalMap.appendChild(fragment);

  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

});
