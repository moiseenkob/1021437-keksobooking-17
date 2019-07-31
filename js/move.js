'use strict';

(function () {

  var MAP_MIN_WIDTH = 0;
  var MAP_MAX_WIDTH = 1135;
  var Y_MAP_MIN = 130;
  var Y_MAP_MAX = 630;


  var OnMouseDragAndDropMove = function (evt) {

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

      /* Height and width */
      var coordinateYPoint = window.mainPin.mapPinMain.offsetTop - shift.y;
      var coordinateXPoint = window.mainPin.mapPinMain.offsetLeft - shift.x;
      var isInvalidedTop = coordinateYPoint > Y_MAP_MAX || coordinateYPoint < Y_MAP_MIN;
      var isInvalidedLeft = coordinateXPoint > MAP_MAX_WIDTH || coordinateXPoint <= MAP_MIN_WIDTH;

      window.mainPin.mapPinMain.style.top = isInvalidedTop ? window.mainPin.mapPinMain.style.top + 'px' : coordinateYPoint + 'px';
      window.mainPin.mapPinMain.style.left = isInvalidedLeft ? window.mainPin.mapPinMain.style.left + 'px' : coordinateXPoint + 'px';

    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      window.mainPin.onMapPinMainClick();

      window.error.removeModalErrorInfo();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  };

  window.move = OnMouseDragAndDropMove;


})();

