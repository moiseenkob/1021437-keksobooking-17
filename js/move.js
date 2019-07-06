'use strict';

(function () {

  var MAP_MIN_WIDTH = 0;
  var MAP_MAX_WIDTH = 1135;

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

      window.form.activeForm();
      window.map.activeMap();

      /* Height and width */
      var coordinateYPoint = window.mainPin.mapPinMain.offsetTop - shift.y;
      var coordinateXPoint = window.mainPin.mapPinMain.offsetLeft - shift.x;
      var isInvalidedTop = coordinateYPoint > window.const.Y_MAP_MAX || coordinateYPoint < window.const.Y_MAP_MIN;
      var isInvalidedLeft = coordinateXPoint > MAP_MAX_WIDTH || coordinateXPoint <= MAP_MIN_WIDTH;

      window.mainPin.mapPinMain.style.top = isInvalidedTop ? window.mainPin.mapPinMain.style.top + 'px' : coordinateYPoint + 'px';
      window.mainPin.mapPinMain.style.left = isInvalidedLeft ? window.mainPin.mapPinMain.style.left + 'px' : coordinateXPoint + 'px';

      /* Write the data in the address field when the label is active */
      window.form.inputAddress.value = window.mainPin.getMainPinCoordinates('active');

    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      window.form.activeForm();
      window.map.activeMap();

      window.form.inputAddress.value = window.mainPin.getMainPinCoordinates('active');

      /* When the button is pressed, we delete the elements */
      window.cards.removeItems();

      window.backend.loadData(window.cards.getSuccessItems, window.error.createFormErrorInfo);

      window.error.removeFormErrorInfo();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  };

  window.move = {
    OnMouseDragAndDropMove: OnMouseDragAndDropMove
  };


})();

