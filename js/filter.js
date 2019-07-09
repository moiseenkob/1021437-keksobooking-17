'use strict';

(function () {

  /* Empty array */
  var newObjectOfFiveItems = [];

  /* Function filter five items */
  var createLimitedObject = function (value) {
    return Array.from(value).slice(0, 5);
  };

  /* Item count filter */
  var createObjectFilterCountItems = function (data) {
    newObjectOfFiveItems = createLimitedObject(data);
    window.cards.dataProcessing(newObjectOfFiveItems);
  };

  window.form.selectTypeHouse.addEventListener('change', function (evt) {
    var filterTypeHouse = newObjectOfFiveItems.filter(function (house) {
      return house['offer']['type'] === evt.target.value;
    });
    window.cards.removeItems();
    window.cards.dataProcessing(filterTypeHouse);
  });


  window.filter = {
    createLimitedObject: createLimitedObject,
    createObjectFilterCountItems: createObjectFilterCountItems
  };

})();
