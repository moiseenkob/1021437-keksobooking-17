'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var COUNT_HOUSE_OF_MAP = 5;
  var mapPinsFilter = document.querySelector('.map__filters');
  var newArrayAllItemsFromServer = [];
  var valueFilters = {
    'housing-type': 'any',
    'housing-price': 'any',
    'housing-rooms': 'any',
    'housing-guests': 'any',
    'wifi': 'false',
    'dishwasher': 'false',
    'parking': 'false',
    'washer': 'false',
    'elevator': 'false',
    'conditioner': 'false'
  };
  var DictionaryPrice = {
    'middle': [10000, 50000],
    'low': [10000],
    'high': [50000]
  };
  var lastTimeout;

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
          if (dict['housing-type'] !== 'any') {
            return houseItems['offer']['type'] === dict['housing-type'];
          }
          return true;
        }).
        filter(function (houseItems) {
          switch (dict['housing-price']) {
            case 'high':
              return houseItems['offer']['price'] > DictionaryPrice[dict['housing-price']];
            case 'middle':
              return houseItems['offer']['price'] > DictionaryPrice[dict['housing-price']][0] && houseItems['offer']['price'] < DictionaryPrice[dict['housing-price']][1];
            case 'low':
              return houseItems['offer']['price'] < DictionaryPrice[dict['housing-price']];
            default:
              return true;
          }
        }).
        filter(function (houseItems) {
          if (dict['housing-rooms'] !== 'any') {
            return houseItems['offer']['rooms'] === parseInt(dict['housing-rooms'], 10);
          }
          return true;
        }).
        filter(function (houseItems) {
          if (dict['housing-guests'] !== 'any') {
            return houseItems['offer']['rooms'] === parseInt(dict['housing-guests'], 10);
          }
          return true;
        }).
        filter(function (houseItems) {
          var visibleFeatures = selectedFeatures(valueFilters);

          var i = 0;
          while (i < 6) {

            if (houseItems['offer']['features'].toString().indexOf(visibleFeatures.toString()) !== -1) {

              return true;
            } else {
              break;
            }
          }
          return false;
        }).
        filter(function (houseItems) {
          var currentFeatures = selectedFeatures(valueFilters);
          var houseItemsFeatures = houseItems['offer']['features'];
          var result = true;

          for (var i = 0; i < currentFeatures.length; i++) {
            var item = currentFeatures[i];
            if (houseItemsFeatures.indexOf(item) === -1) {
              result = false;
              break;
            }
          }

          return result;
        });

      }
    }
    var newArrayFilterCountItems = housingTypeFilter.slice(0, COUNT_HOUSE_OF_MAP);
    window.cards.removePins();
    window.cards.renderPins(newArrayFilterCountItems);

  };

  var selectedFeatures = function (features) {
    var listFeatures = [];
    for (var key in features) {
      if (features[key] === true) {
        listFeatures.push(key);
      }
    }
    return listFeatures;
  };

  var removeCardActivePin = function () {
    var cardPinActive = document.querySelector('.map__card');
    if (cardPinActive !== null) {
      cardPinActive.remove();
    }
  };


  var onFormFilterClick = function (evt) {

    removeCardActivePin();
    var key = evt.target.name !== 'features' ? evt.target.name : evt.target.id.slice(7);
    var value = evt.target.name !== 'features' ? evt.target.value : evt.target.checked;
    valueFilters[key] = value;

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      filterAndRenderPin(valueFilters);
    }, DEBOUNCE_INTERVAL);
  };


  mapPinsFilter.addEventListener('change', onFormFilterClick);

  window.filter = createObjectFilterCountItems;

})();
