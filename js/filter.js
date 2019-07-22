'use strict';

(function () {

  var COUNT_HOUSE_OF_MAP = 5;
  var typeHouseFromFilter = document.querySelector('#housing-type');
  var typePriceFromFilter = document.querySelector('#housing-price');
  var countRoomsFromFilter = document.querySelector('#housing-rooms');
  var countGuestsFromFilter = document.querySelector('#housing-guests');
  var newArrayAllItemsFromServer = [];
  var valueFilters = {
    'typeHouse': 'any',
    'price': 'any',
    'rooms': 'any',
    'guests': 'any'
  };
  var DictionaryPrice = {
    'middle': [10000, 50000],
    'low': [10000],
    'high': [50000]
  };

  /* Item count filter */
  var createObjectFilterCountItems = function (data) {
    newArrayAllItemsFromServer = data;
    window.cards.renderPins(data.slice(0, COUNT_HOUSE_OF_MAP));
  };

  var filterAndRenderPin = function (dict) {
    var housingTypeFilter;

    for (var key in dict) {
      if (dict[key] !== 'any') {

        housingTypeFilter = newArrayAllItemsFromServer.filter(function (houseItems) {
          if (dict['typeHouse'] !== 'any') {
            return houseItems['offer']['type'] === dict['typeHouse'];
          } else {
            return houseItems;
          }
        }).
        filter(function (houseItems) {
          switch (dict['price']) {
            case 'high':
              return houseItems['offer']['price'] > DictionaryPrice[dict['price']];
            case 'middle':
              return houseItems['offer']['price'] > DictionaryPrice[dict['price']][0] && houseItems['offer']['price'] < DictionaryPrice[dict['price']][1];
            case 'low':
              return houseItems['offer']['price'] < DictionaryPrice[dict['price']];
            default:
              return houseItems;
          }
        }).
        filter(function (houseItems) {
          if (dict['rooms'] !== 'any') {
            return houseItems['offer']['rooms'] === parseInt(dict['rooms'], 10);
          } else {
            return houseItems;
          }
        }).
        filter(function (houseItems) {
          if (dict['guests'] !== 'any') {
            return houseItems['offer']['rooms'] === parseInt(dict['guests'], 10);
          } else {
            return houseItems;
          }
        });
      } else {
        var newArrayFilterCountItems = housingTypeFilter.slice(0, COUNT_HOUSE_OF_MAP);
        window.cards.removePins();
        window.cards.renderPins(newArrayFilterCountItems);
      }
    }
    newArrayFilterCountItems = housingTypeFilter.slice(0, COUNT_HOUSE_OF_MAP);
    window.cards.removePins();
    window.cards.renderPins(newArrayFilterCountItems);

  };


  typeHouseFromFilter.addEventListener('change', function (evt) {
    valueFilters['typeHouse'] = evt.target.value;
    filterAndRenderPin(valueFilters);
  });
  typePriceFromFilter.addEventListener('change', function (evt) {
    valueFilters['price'] = evt.target.value;
    filterAndRenderPin(valueFilters);
  });
  countRoomsFromFilter.addEventListener('change', function (evt) {
    valueFilters['rooms'] = evt.target.value;
    filterAndRenderPin(valueFilters);
  });
  countGuestsFromFilter.addEventListener('change', function (evt) {
    valueFilters['guests'] = evt.target.value;
    filterAndRenderPin(valueFilters);
  });

  window.filter = createObjectFilterCountItems;

})();
