'use strict';

var COUNT_AD = 8;
var TYPE_HOUSE = ['palace', 'flat', 'house', 'bungalo'];
var Y_MAP_MIN = 130;
var Y_MAP_MAX = 630;
var MIN_VALUE = 1;
var MAP_LEFT = 25;
var MAP_TOP = 70;

/* Забираем данные из шаблона */
var visibleHouseMap = document.querySelector('#pin').content.querySelector('.map__pin');
var mapSurf = document.querySelector('.map__pins');

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
    houseElements.style.left = items[i]['location']['x'] + MAP_LEFT + 'px';
    houseElements.style.top = items[i]['location']['y'] - MAP_TOP + 'px';

    /* Вставляем объекты в фрагмент */
    fragment.appendChild(houseElements);

  }

  return fragment;
};

/* Мы вызвали функцию чтобы создать объекты, которые взяли из базы "COUNT_AD" */
var items = createHouse(COUNT_AD);

/* Module 4 */

/* Блокируем элементы управления формы */
/* Блокировка инпутов */
var fildDisabled = document.querySelectorAll('fieldset');
var createBlockFieldsForm = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].setAttribute('disabled', '');
  }
};
/* Блокировка select */
var selectDisabled = document.querySelector('.map__filters');
var formSelectDisabled = selectDisabled.querySelectorAll('select');
var createBlockSelectForm = function (arr) {

  for (var i = 0; i < arr.length; i++) {
    arr[i].setAttribute('disabled', '');
  }
};

createBlockSelectForm(formSelectDisabled);

/* Вызов функции для прохода по массиву и блокировки */
createBlockFieldsForm(fildDisabled);

/* Функция для активации элементов формы */
var onMapMainClick = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].removeAttribute('disabled');
  }
};

var mainMap = document.querySelector('.map__pin--main');
/* Изначальная вставка координат main PIN */
var mapMainStartPosition = document.querySelector('.map__pin--main');


var inputAddress = document.querySelector('input[name="address"]');
inputAddress.value = (mapMainStartPosition.getBoundingClientRect().left + (mapMainStartPosition.clientWidth / 2)) + ', ' + (mapMainStartPosition.getBoundingClientRect().top + (mapMainStartPosition.clientHeight / 2));

/* Функция для вставления координат в адрес */
mainMap.addEventListener('mouseup', function () {
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  document.querySelector('.map').classList.remove('map--faded');
  onMapMainClick(fildDisabled);

  /* В div вставляем наши сгенерированные DOM элементы */
  var fragment = createFragment(items);
  mapSurf.appendChild(fragment);
  /* Вставляем наши свежие данные */
  inputAddress.value = (mapMainStartPosition.getBoundingClientRect().left + (mapMainStartPosition.clientWidth / 2)) + ', ' + (mapMainStartPosition.getBoundingClientRect().top + (mapMainStartPosition.clientHeight));
});

/* Фунция которая, отключает классы блокировки */
mainMap.addEventListener('click', function () {

});
