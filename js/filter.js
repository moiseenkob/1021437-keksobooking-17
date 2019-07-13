'use strict';

(function () {

  var COUNT_HOUSE_OF_MAP = 5;
  var typeHouseFromFilter = document.querySelector('#housing-type');
  var newArrayAllItemsFromServer = [];

  /* Item count filter */
  var createObjectFilterCountItems = function (data) {
    newArrayAllItemsFromServer = data;
    window.cards.renderPins(data.slice(0, COUNT_HOUSE_OF_MAP));
    window.renderCard(data[0]);
  };

  typeHouseFromFilter.addEventListener('change', function (evt) {
    var housingTypeFilter = newArrayAllItemsFromServer.filter(function (houseItems) {
      if (evt.target.value !== 'any') {
        return houseItems['offer']['type'] === evt.target.value;
      } else {
        return houseItems;
      }
    });
    var newArrayFilterCountItems = housingTypeFilter.slice(0, COUNT_HOUSE_OF_MAP);
    window.cards.removePins();
    window.cards.renderPins(newArrayFilterCountItems);
  });

  window.filter = createObjectFilterCountItems;

})();
