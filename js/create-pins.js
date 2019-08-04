'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;
  var COUNT_HOUSE = 5;
  var fieldsFiltersElements = document.querySelectorAll('.map__filters select');
  var fieldsFiltersFeaturesElements = document.querySelectorAll('.map__filters fieldset');
  var mapFiltersFormElement = document.querySelector('.map__filters');
  var filterOptions = Array.from(mapFiltersFormElement.children);
  var typeToMinPrice = {
    'middle': [10000, 50000],
    'low': [0, 10000],
    'high': [50000, Infinity]
  };
  var dataPins = [];
  var lastTimeout;

  /* Item count filter */
  var createPins = function (data) {
    dataPins = data;
    window.pins.render(data.slice(0, COUNT_HOUSE));

    for (var i = 0; i < fieldsFiltersElements.length; i++) {
      fieldsFiltersElements[i].removeAttribute('disabled');
    }
    for (var y = 0; y < fieldsFiltersFeaturesElements.length; y++) {
      fieldsFiltersFeaturesElements[y].removeAttribute('disabled');
    }
    window.form.wrapperFiltersElement.classList.remove('ad-form--disabled');
  };

  var removeCard = function () {
    var cardPinActiveElement = document.querySelector('.map__card');
    if (cardPinActiveElement !== null) {
      cardPinActiveElement.remove();
    }
  };

  var filterRules = {
    'housing-type': function (data, filter) {
      return filter.value === data.offer.type;
    },

    'housing-price': function (data, filter) {
      return data.offer.price >= typeToMinPrice[filter.value][0] && data.offer.price < typeToMinPrice[filter.value][1];
    },

    'housing-rooms': function (data, filter) {
      return filter.value === data.offer.rooms.toString();
    },

    'housing-guests': function (data, filter) {
      return filter.value === data.offer.guests.toString();
    },

    'housing-features': function (data, filter) {
      var filterCheckboxes = Array.from(filter.querySelectorAll('input[type=checkbox]:checked'));
      return filterCheckboxes.every(function (it) {
        return data.offer.features.some(function (feature) {
          return feature === it.value;
        });
      });
    }
  };

  var filterData = function (data) {
    return data.filter(function (item) {
      return filterOptions.every(function (option) {
        return (option.value === 'any') ? true : filterRules[option.id](item, option);
      });
    });
  };

  var onFormFilterClick = function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      removeCard();
      window.pins.remove();
      var filteredPins = filterData(dataPins);
      window.pins.render(filteredPins.slice(0, COUNT_HOUSE));
    }, DEBOUNCE_INTERVAL);

  };

  mapFiltersFormElement.addEventListener('change', onFormFilterClick);

  window.createPins = createPins;

})();
