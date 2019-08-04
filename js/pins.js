'use strict';


(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var areaElement = document.querySelector('.map__pins');
  var visibleHouseMapElement = document.querySelector('#pin').content.querySelector('.map__pin');

  /* Function remove items */
  var remove = function () {
    var pinsMapElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pinsMapElements.length > 0) {
      for (var i = 0; i < pinsMapElements.length; i++) {
        pinsMapElements[i].remove();
      }
    }
  };

  var render = function (pin) {
    var fragment = document.createDocumentFragment();
    /* Insert data from our function */
    pin.forEach(function (item) {

      /* We clone data from a template */
      var houseElements = visibleHouseMapElement.cloneNode(true);

      if (item['offer'] !== undefined) {
        /* Changing data */
        var imageItemElement = houseElements.querySelector('img');
        imageItemElement.src = item['author']['avatar'];
        imageItemElement.alt = item['offer']['title'];

        houseElements.style.left = item['location']['x'] - (PIN_WIDTH / 2) + 'px';
        houseElements.style.top = item['location']['y'] - PIN_HEIGHT + 'px';

        // Render card
        houseElements.addEventListener('click', function () {

          var firstCardOfMapElement = document.querySelector('.map__card');
          if (firstCardOfMapElement !== null) {
            firstCardOfMapElement.parentNode.removeChild(firstCardOfMapElement);
            window.card(item);
            houseElements.classList.add('map__pin--active');
          } else {
            window.card(item);
            houseElements.classList.add('map__pin--active');
          }
        });

        /* Insert objects into the fragment */
        fragment.appendChild(houseElements);

        areaElement.appendChild(fragment);
      }

    });

    return fragment;
  };

  window.pins = {
    remove: remove,
    render: render,
    areaElement: areaElement
  };

})();

