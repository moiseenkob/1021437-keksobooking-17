'use strict';

(function () {

  var COUNT_HOUSE_OF_MAP = 5;
  var typeHouseFromFilter = document.querySelector('#housing-type');
  /* Empty array */
  var newArrayAllItemsFromServer = [];


  var firstElementOffer = [];
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');
  var globalMap2 = document.querySelector('.map__pins');
  var DictionaryHouse = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };
  var DictionaryFeatures = {
    'wifi': 'popup__feature--wifi',
    'dishwasher': 'popup__feature--dishwasher',
    'parking': 'popup__feature--parking',
    'washer': 'popup__feature--washer',
    'elevator': 'popup__feature--elevator',
    'conditioner': 'popup__feature--conditioner'
  };

  var photoCard = function (items, Father, card) {
    var imgElements = card.querySelector('.popup__photo');
    imgElements.src = items[0];
    for (var i = 1; i < items.length; i++) {
      var photoIMG = imgElements.cloneNode(true);
      photoIMG.src = items[i];
      Father.appendChild(photoIMG);
    }
  };

  var featureCard = function (arr, features) {
    for (var i = 0; i < arr.length; i++) {
      if (features[i]) {
        arr[i].className = 'popup__feature ' + DictionaryFeatures[features[i]];
      } else {
        arr[i].remove();
      }
    }
  };

  var itemFirstCards = function () {
    var cardElements = templateCard.cloneNode(true);
    // Find elements cards
    var titleCardsItems = cardElements.querySelector('.popup__title');
    var addressCardsItems = cardElements.querySelector('.popup__text--address');
    var priceCardsItems = cardElements.querySelector('.popup__text--price');
    var typeCardsItems = cardElements.querySelector('.popup__type');
    var roomsAndGuestsCardsItems = cardElements.querySelector('.popup__text--capacity');
    var TimeBookingInAndOutCardsItems = cardElements.querySelector('.popup__text--time');
    var descriptionCardsItems = cardElements.querySelector('.popup__description');
    var avatarCardsItems = cardElements.querySelector('.popup__avatar');
    var photosCardsItems = cardElements.querySelector('.popup__photos');
    var featuresCardsItems = cardElements.querySelector('.popup__features');
    var itemElementsFeatures = featuresCardsItems.querySelectorAll('.popup__feature');

    titleCardsItems.innerText = firstElementOffer.offer.title;
    addressCardsItems.innerText = firstElementOffer.offer.address;
    priceCardsItems.innerText = firstElementOffer.offer.price + '₽/ночь.';
    typeCardsItems.innerText = DictionaryHouse[firstElementOffer.offer.type];
    roomsAndGuestsCardsItems.innerText = firstElementOffer.offer.rooms + ' комнаты для ' + firstElementOffer.offer.guests + ' гостей';
    TimeBookingInAndOutCardsItems.innerText = 'Заезд после ' + firstElementOffer.offer.checkin + ', выезд до ' + firstElementOffer.offer.checkout;
    descriptionCardsItems.innerText = firstElementOffer.offer.description;
    avatarCardsItems.src = firstElementOffer.author.avatar;

    photoCard(firstElementOffer.offer.photos, photosCardsItems, cardElements);
    featureCard(itemElementsFeatures, firstElementOffer.offer.features);

    globalMap2.appendChild(cardElements);
  };

  /* Item count filter */
  var createObjectFilterCountItems = function (data) {
    firstElementOffer = data[0];
    newArrayAllItemsFromServer = data;
    window.cards.dataProcessing(data.slice(0, COUNT_HOUSE_OF_MAP));
    itemFirstCards();
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
    window.cards.removeItems();
    window.cards.dataProcessing(newArrayFilterCountItems);
  });

  window.filter = {
    createObjectFilterCountItems: createObjectFilterCountItems,
    firstElementOffer: firstElementOffer
  };

})();
