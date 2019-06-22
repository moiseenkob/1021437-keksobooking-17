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
var MAP_MAX_WIDTH = 1135;
var MAP_MIN_WIDTH = 0;
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

/* Функция удаления элементов */
var removeItems = function (elements) {
  if (elements.length > 0) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].remove();
    }
  }
};

/* Функиця установки значения при активном действии и блокировке */
var getMainPinCoordinates = function (state) {
  var left = mapPinMain.offsetLeft;
  var top = mapPinMain.offsetTop;

  switch (state) {
    case 'active':
      return Math.round(left + (MAP_PIN_MAIN_WIDTH / 2)) + ', ' + Math.round(top + MAP_PIN_MAIN_HEIGTH);
    case 'disabled':
      return Math.round(left + (MAP_PIN_MAIN_WIDTH / 2)) + ', ' + Math.round(top + MAP_PIN_MAIN_HEIGTH / 2);
    default:
      return Math.round(left + (MAP_PIN_MAIN_WIDTH / 2)) + ', ' + Math.round(top + MAP_PIN_MAIN_HEIGTH / 2);
  }
};

/* Функция сброса значений */
var setDefaultValues = function () {
  setMinPriceField.placeholder = PRICE_ONE_NIGHT['flat'];
  inputAddress.value = getMainPinCoordinates('disabled');
};

/* Замена цены при смене типа жилья */
var onSelectTypeHouse = function (evt) {
  var value = evt.target.value;
  setMinPriceField.placeholder = PRICE_ONE_NIGHT[value];
  setMinPriceField.min = PRICE_ONE_NIGHT[value];
};

/* Прослушиваем событие для указания цены при выборе типа жилья */
selectTypeHouse.addEventListener('change', onSelectTypeHouse);

/* Установка времени при выборе въезда или выезда */
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
    activeWindow();

    /* Высота */
    var coordinateYPoint = mapPinMain.offsetTop - shift.y;
    var coordinateXPoint = mapPinMain.offsetLeft - shift.x;
    var isInvalideTop = coordinateYPoint > Y_MAP_MAX || coordinateYPoint < Y_MAP_MIN;
    var isInvalideLeft = coordinateXPoint > MAP_MAX_WIDTH || coordinateXPoint <= MAP_MIN_WIDTH;

    mapPinMain.style.top = isInvalideTop ? mapPinMain.style.top + 'px' : coordinateYPoint + 'px';
    mapPinMain.style.left = isInvalideLeft ? mapPinMain.style.left + 'px' : coordinateXPoint + 'px';

    /* Записываем данные в поле адрес, когда метка активна */
    inputAddress.value = getMainPinCoordinates('active');

  };
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    activeWindow();
    inputAddress.value = getMainPinCoordinates('active');

    /* Переменная для удаления данных с исключением основной метки */
    var pinsMap = globalMap.querySelectorAll('.map__pin:not(.map__pin--main)');
    /* При отжатии кнопки удаляем элементы */
    removeItems(pinsMap);
    /* Добавляем новые элементы */
    var fragment = createFragment(items);
    globalMap.appendChild(fragment);

  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

});

setDefaultValues();
