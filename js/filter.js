'use strict';

(function () {

  var COUNT_HOUSE_OF_MAP = 5;
  var formFilter = document.querySelector('.map__filters');
  var newArrayAllItemsFromServer = [];
  var valueFilters = {
    'housing-type': 'any',
    'housing-price': 'any',
    'housing-rooms': 'any',
    'housing-guests': 'any',
    'features-wifi': '',
    'features-dishwasher': '',
    'features-parking': '',
    'features-washer': '',
    'features-elevator': '',
    'features-conditioner': ''
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
          var newItemFilterFeatures;
          houseItems['offer']['features'].forEach(function (item) {

            switch (item) {
              case dict['features' + '-' + item]:
                newItemFilterFeatures = item === dict['features' + '-' + item];
                return newItemFilterFeatures;
              default:
                return houseItems;
            }
          });

          return newItemFilterFeatures;


        });

      }
    }
    var newArrayFilterCountItems = housingTypeFilter.slice(0, COUNT_HOUSE_OF_MAP);
    window.cards.removePins();
    window.cards.renderPins(newArrayFilterCountItems);

  };

  formFilter.addEventListener('change', function (evt) {
    for (var key in valueFilters) {
      if (evt.target.name === key || evt.target.name + '-' + evt.target.value === key) {
        if (evt.target.name === 'features') {
          valueFilters['features' + '-' + evt.target.value] = evt.target.value;
          filterAndRenderPin(valueFilters);
        }
        valueFilters[evt.target.name] = evt.target.value;
        filterAndRenderPin(valueFilters);
      }
    }
  });

  window.filter = createObjectFilterCountItems;

})();
