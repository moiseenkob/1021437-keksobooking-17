'use strict';

var COUNTHOUSE = 8;
var TYPEHOUSE = ['palace', 'flat', 'house', 'bungalo'];
var objectHouse = [];
var MAP_SURF = document.querySelector('.map__pins');

/* Создал функцию генерации 8 объектов */
var createHouse = function (val) {
  for (var i = 1; i <= val; i++) {
    /* Добавил рандом типа жилья */
    var randomTypeHoue = Math.round(0 + Math.random() * (TYPEHOUSE.length - 1));
    var createHome = {
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
      },
      'offer': {
        'type': TYPEHOUSE[randomTypeHoue]
      },
      'location': {
        'x': (Math.round(1 - 0.5 + Math.random() * (MAP_SURF.clientWidth - 50)) + 'px'),
        'y': (Math.round(130 - 0.5 + Math.random() * (630 - 130 + 1)) + 'px')
      }
    };
    /* Добаввляем наши объекты в массив */
    objectHouse.push(createHome);
  }

  return objectHouse;
};

/* Удаляем лишний класс, для удобной работы (ВРЕМЕННО) */
document.querySelector('.map').classList.remove('map--faded');

/* Мы вызвали функцию чтобы создать объекты, которые взяли из базы "COUNTHOUSE" */
createHouse(COUNTHOUSE);

/* Забираем данные из шаблона */
var visibleHouseMap = document.querySelector('#pin').content.querySelector('.map__pin');

/* Создали фрагмент для добавление наших домов */
var fragment = document.createDocumentFragment();


/* С помощью цикла пробегаемся на каждом элементе и вставляем данные из нашей функции */
for (var i = 1; i < COUNTHOUSE; i++) {

  /* Клонируем данные из шаблона */
  var houseElements = visibleHouseMap.cloneNode(true);

  /* Вставляем объекты в фрагмент */
  fragment.appendChild(houseElements);

  /* Меняем изображения на каждом элементе */
  houseElements.querySelector('img[draggable="false"]').src = objectHouse[i]['author']['avatar'];

  /* Меняем alt */
  houseElements.querySelector('img[draggable="false"]').alt = 'Заголовок будущего объявления';

  /* Меняем координаты */
  houseElements.style.left = objectHouse[i]['location']['x'];
  houseElements.style.top = objectHouse[i]['location']['y'];

}

/* В div вставляем наши сгенерированные DOM элементы */
MAP_SURF.appendChild(fragment);
