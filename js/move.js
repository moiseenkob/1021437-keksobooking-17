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

      window.form.activeForm();
      window.map.activeMap();

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

      window.form.activeForm();
      window.map.activeMap();

      window.form.inputAddress.value = window.mainPin.getMainPinCoordinates('active');

      /* При отжатии кнопки удаляем элементы */
      window.cards.removeItems();
      /* Добавляем новые элементы */
      window.cards.renderElements();

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  };

  window.move = {
    OnMouseDragAndDromMove: OnMouseDragAndDromMove
  };


})();

