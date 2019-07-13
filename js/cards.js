'use strict';


(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var globalMap = document.querySelector('.map__pins');
  var visibleHouseMap = document.querySelector('#pin').content.querySelector('.map__pin');

  /* Function remove items */
  var removePins = function () {
    var pinsMap = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pinsMap.length > 0) {
      for (var i = 0; i < pinsMap.length; i++) {
        pinsMap[i].remove();
      }
    }
  };

  var renderPins = function (arr) {

    var fragment = document.createDocumentFragment();

    /* Insert data from our function */
    for (var i = 0; i < arr.length; i++) {
      /* We clone data from a template */
      var houseElements = visibleHouseMap.cloneNode(true);
      /* Changing data */
      var imageItem = houseElements.querySelector('img');
      imageItem.src = arr[i]['author']['avatar'];
      imageItem.alt = arr[i]['offer']['title'];
      houseElements.style.left = arr[i]['location']['x'] + (PIN_WIDTH / 2) + 'px';
      houseElements.style.top = arr[i]['location']['y'] - PIN_HEIGHT + 'px';
      /* Insert objects into the fragment */
      fragment.appendChild(houseElements);

      globalMap.appendChild(fragment);

    }
    return fragment;
  };

  window.cards = {
    removePins: removePins,
    renderPins: renderPins
  };

})();

