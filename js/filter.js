'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;
  var COUNT_HOUSE = 5;
  var NUMBER_SYSTEM = 10;
  var NUMBER_OF_LETTERS = 7;
  var fieldsFilters = document.querySelectorAll('select');
  var fieldsFiltersFeatures = document.querySelectorAll('fieldset');
  var dataPins = [];
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
  var createVisiblePins = function (data) {
    dataPins = data;
    window.handlerPins.renderPins(data.slice(0, COUNT_HOUSE));

    for (var i = 0; i < fieldsFilters.length; i++) {
      fieldsFilters[i].removeAttribute('disabled');
    }
    for (var y = 0; y < fieldsFiltersFeatures.length; y++) {
      fieldsFiltersFeatures[y].removeAttribute('disabled');
    }
    window.form.wrapperFilters.classList.remove('ad-form--disabled');
  };

  var visiblePinsWithFilters = function (dict) {
    var housingTypeFilter;

    for (var key in dict) {
      if (dict[key] !== 'any') {
        housingTypeFilter = dataPins.filter(function (houseItems) {
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
            return houseItems['offer']['rooms'] === parseInt(dict['housing-rooms'], NUMBER_SYSTEM);
          }
          return true;
        }).
        filter(function (houseItems) {
          if (dict['housing-guests'] !== 'any') {
            return houseItems['offer']['rooms'] === parseInt(dict['housing-guests'], NUMBER_SYSTEM);
          }
          return true;
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
    var blockPins = housingTypeFilter.slice(0, COUNT_HOUSE);
    window.handlerPins.removePins();
    window.handlerPins.renderPins(blockPins);
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
    var key = evt.target.name !== 'features' ? evt.target.name : evt.target.id.slice(NUMBER_OF_LETTERS);
    var value = evt.target.name !== 'features' ? evt.target.value : evt.target.checked;
    valueFilters[key] = value;

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(function () {
      visiblePinsWithFilters(valueFilters);
    }, DEBOUNCE_INTERVAL);
  };

  window.form.wrapperFilters.addEventListener('change', onFormFilterClick);

  window.filter = createVisiblePins;

})();
