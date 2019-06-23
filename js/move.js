'use strict';

(function () {


  window.createCards.mapPinMain.addEventListener('mousedown', function (evt) {

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
      window.form.activeWindow();

      /* Высота */
      var coordinateYPoint = window.createCards.mapPinMain.offsetTop - shift.y;
      var coordinateXPoint = window.createCards.mapPinMain.offsetLeft - shift.x;
      var isInvalideTop = coordinateYPoint > window.const.Y_MAP_MAX || coordinateYPoint < window.const.Y_MAP_MIN;
      var isInvalideLeft = coordinateXPoint > window.const.MAP_MAX_WIDTH || coordinateXPoint <= window.const.MAP_MIN_WIDTH;

      window.createCards.mapPinMain.style.top = isInvalideTop ? window.createCards.mapPinMain.style.top + 'px' : coordinateYPoint + 'px';
      window.createCards.mapPinMain.style.left = isInvalideLeft ? window.createCards.mapPinMain.style.left + 'px' : coordinateXPoint + 'px';

      /* Записываем данные в поле адрес, когда метка активна */
      window.form.inputAddress.value = window.utilis.getMainPinCoordinates('active');

    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      window.form.activeWindow();
      window.form.inputAddress.value = window.utilis.getMainPinCoordinates('active');

      /* Переменная для удаления данных с исключением основной метки */
      var pinsMap = window.createCards.globalMap.querySelectorAll('.map__pin:not(.map__pin--main)');
      /* При отжатии кнопки удаляем элементы */
      window.utilis.removeItems(pinsMap);
      /* Добавляем новые элементы */
      var fragment = window.createCards.fragment(window.createCards.items);
      window.createCards.globalMap.appendChild(fragment);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  window.utilis.setDefaultValues();

  window.move = {
    mapPinMain: window.createCards.mapPinMain
  };


})();
