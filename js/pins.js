'use strict';


(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var area = document.querySelector('.map__pins');
  var visibleHouseMap = document.querySelector('#pin').content.querySelector('.map__pin');

  /* Function remove items */
  var remove = function () {
    var pinsMap = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pinsMap.length > 0) {
      for (var i = 0; i < pinsMap.length; i++) {
        pinsMap[i].remove();
      }
    }
  };

  var render = function (pin) {
    var fragment = document.createDocumentFragment();
    /* Insert data from our function */
    pin.forEach(function (item) {

      /* We clone data from a template */
      var houseElements = visibleHouseMap.cloneNode(true);

      if (item['offer'] !== undefined) {
        /* Changing data */
        var imageItem = houseElements.querySelector('img');
        imageItem.src = item['author']['avatar'];
        imageItem.alt = item['offer']['title'];

        houseElements.style.left = item['location']['x'] - (PIN_WIDTH / 2) + 'px';
        houseElements.style.top = item['location']['y'] - PIN_HEIGHT + 'px';

        // Render card
        houseElements.addEventListener('click', function () {

          var firstCardOfMap = document.querySelector('.map__card');
          if (firstCardOfMap !== null) {
            firstCardOfMap.parentNode.removeChild(firstCardOfMap);
            window.card(item);
            houseElements.classList.add('map__pin--active');
          } else {
            window.card(item);
            houseElements.classList.add('map__pin--active');
          }
        });

        /* Insert objects into the fragment */
        fragment.appendChild(houseElements);

        area.appendChild(fragment);
      }

    });

    return fragment;
  };

  window.pins = {
    remove: remove,
    render: render,
    area: area
  };

})();

