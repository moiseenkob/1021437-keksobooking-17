'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');
  var mapPins = document.querySelector('.map');
  var allPinsAdt = mapPins.querySelector('.map__pins');
  var DictionaryHouse = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var setPhotosCard = function (items, element) {

    if (items.length <= 0) {
      element.remove();
    } else {
      var photoElement = element.querySelector('.popup__photo');
      photoElement.src = items[0];
      for (var i = 1; i < items.length; i++) {
        var newImgElement = photoElement.cloneNode(true);
        newImgElement.src = items[i];
        element.appendChild(newImgElement);
      }
    }
  };

  var setFeatureCard = function (items, elements) {
    for (var i = 0; i < items.length; i++) {
      var element = document.createElement('li');
      element.className = 'popup__feature popup__feature--' + [items[i]];
      elements.appendChild(element);
    }
  };

  var renderCard = function (item) {
    var cardElements = templateCard.cloneNode(true);

    // Find elements cards
    var titleCardsItems = cardElements.querySelector('.popup__title');
    var addressCardsItems = cardElements.querySelector('.popup__text--address');
    var priceCardsItems = cardElements.querySelector('.popup__text--price');
    var typeCardsItems = cardElements.querySelector('.popup__type');
    var roomsAndGuestsCardsItems = cardElements.querySelector('.popup__text--capacity');
    var timeBookingInAndOutCardsItems = cardElements.querySelector('.popup__text--time');
    var descriptionCardsItems = cardElements.querySelector('.popup__description');
    var avatarCardsItems = cardElements.querySelector('.popup__avatar');
    var photosCardsItems = cardElements.querySelector('.popup__photos');
    var featuresCardsItems = cardElements.querySelector('.popup__features');

    // Close card
    var buttonCardClose = cardElements.querySelector('.popup__close');
    buttonCardClose.addEventListener('click', function () {
      cardElements.remove();
    });
    // Close card key ESC
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        cardElements.remove();
        document.removeEventListener('keydown', function () {

        });
      }
    });

    // Set value of card
    titleCardsItems.textContent = item.offer.title;
    addressCardsItems.textContent = item.offer.address;
    priceCardsItems.textContent = item.offer.price + '₽/ночь.';
    typeCardsItems.textContent = DictionaryHouse[item.offer.type];
    roomsAndGuestsCardsItems.textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
    timeBookingInAndOutCardsItems.textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
    descriptionCardsItems.textContent = item.offer.description;
    avatarCardsItems.src = item.author.avatar;

    setPhotosCard(item.offer.photos, photosCardsItems);
    setFeatureCard(item.offer.features, featuresCardsItems);

    mapPins.insertBefore(cardElements, allPinsAdt.nextSibling);
  };

  window.renderCard = renderCard;

})();
