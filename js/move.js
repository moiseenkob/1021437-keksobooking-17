'use strict';

(function () {

  var MAP_MIN_WIDTH = 0;
  var MAP_MAX_WIDTH = 1135;

  var OnMouseDragAndDromMove = function (evt) {

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
      window.map.activeWindow();

      /* Высота */
      var coordinateYPoint = window.mainPin.mapPinMain.offsetTop - shift.y;
      var coordinateXPoint = window.mainPin.mapPinMain.offsetLeft - shift.x;
      var isInvalideTop = coordinateYPoint > window.const.Y_MAP_MAX || coordinateYPoint < window.const.Y_MAP_MIN;
      var isInvalideLeft = coordinateXPoint > MAP_MAX_WIDTH || coordinateXPoint <= MAP_MIN_WIDTH;

      window.mainPin.mapPinMain.style.top = isInvalideTop ? window.mainPin.mapPinMain.style.top + 'px' : coordinateYPoint + 'px';
      window.mainPin.mapPinMain.style.left = isInvalideLeft ? window.mainPin.mapPinMain.style.left + 'px' : coordinateXPoint + 'px';

      /* Записываем данные в поле адрес, когда метка активна */
      window.form.inputAddress.value = window.mainPin.getMainPinCoordinates('active');

    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      window.map.activeWindow();
      window.form.inputAddress.value = window.mainPin.getMainPinCoordinates('active');

      /* Переменная для удаления данных с исключением основной метки */
      var pinsMap = window.createCards.globalMap.querySelectorAll('.map__pin:not(.map__pin--main)');
      /* При отжатии кнопки удаляем элементы */
      window.map.removeItems(pinsMap);
      /* Добавляем новые элементы */
      var fragment = window.createCards.createFragment(window.createCards.items);
      window.createCards.globalMap.appendChild(fragment);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  };

  window.move = {
    OnMouseDragAndDromMove: OnMouseDragAndDromMove
  };


})();

