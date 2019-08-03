'use strict';

(function () {

  var MAP_MIN_WIDTH = 0;
  var MAP_MAX_WIDTH = 1135;
  var Y_MAP_MIN = 130;
  var Y_MAP_MAX = 630;


  var mainPinDrag = function (evt) {

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
      window.initial.onPinMainClick();

      /* Height and width */
      var coordinateYPoint = window.initial.pinBase.offsetTop - shift.y;
      var coordinateXPoint = window.initial.pinBase.offsetLeft - shift.x;
      var isInvalidedTop = coordinateYPoint > Y_MAP_MAX || coordinateYPoint < Y_MAP_MIN;
      var isInvalidedLeft = coordinateXPoint > MAP_MAX_WIDTH || coordinateXPoint <= MAP_MIN_WIDTH;

      window.initial.pinBase.style.top = isInvalidedTop ? window.initial.pinBase.style.top + 'px' : coordinateYPoint + 'px';
      window.initial.pinBase.style.left = isInvalidedLeft ? window.initial.pinBase.style.left + 'px' : coordinateXPoint + 'px';

    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      window.initial.onPinMainClick();

      window.error.removeModal();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  };

  window.mainPinDrag = mainPinDrag;


})();

