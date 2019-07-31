'use strict';

(function () {

  var templateCard = document.querySelector('#card').content.querySelector('.map__card');
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

      var fragment = document.createDocumentFragment();
      for (var i = 1; i < items.length; i++) {
        var ImageElement = photoElement.cloneNode(true);
        ImageElement.src = items[i];
        fragment.appendChild(ImageElement);
      }
      element.appendChild(fragment);
    }
  };

  var setFeatureCard = function (items, elements) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < items.length; i++) {
      var element = document.createElement('li');
      element.className = 'popup__feature popup__feature--' + [items[i]];
      fragment.appendChild(element);
    }
    elements.appendChild(fragment);
  };

  var removeActivePin = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin !== null) {
      activePin.classList.remove('map__pin--active');
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
      removeActivePin();
    });

    var onKeyPress = function (evt) {
      if (evt.keyCode === window.form.ESC_KEYCODE) {
        cardElements.remove();
        removeActivePin();
      }
    };
    // Close card key ESC
    document.addEventListener('keydown', onKeyPress);

    // Set value of card
    var filingTheFieldsFromServer = function (fieldCard, fieldDataOfServer) {
      if (fieldDataOfServer !== '') {
        fieldCard.textContent = fieldDataOfServer;
      } else {
        fieldCard.remove();
      }
    };

    var filingTheAvatarFromServer = function (fieldCard, fieldDataOfServer) {
      if (fieldDataOfServer !== '') {
        fieldCard.src = fieldDataOfServer;
      } else {
        fieldCard.remove();
      }
    };

    filingTheFieldsFromServer(titleCardsItems, item.offer.title);
    filingTheFieldsFromServer(addressCardsItems, item.offer.address);
    filingTheFieldsFromServer(priceCardsItems, item.offer.price + '₽/ночь.');
    filingTheFieldsFromServer(typeCardsItems, DictionaryHouse[item.offer.type]);
    filingTheFieldsFromServer(roomsAndGuestsCardsItems, item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей');
    filingTheFieldsFromServer(timeBookingInAndOutCardsItems, 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout);
    filingTheFieldsFromServer(descriptionCardsItems, item.offer.description);
    filingTheFieldsFromServer(descriptionCardsItems, item.offer.description);
    filingTheAvatarFromServer(avatarCardsItems, item.author.avatar);
    setPhotosCard(item.offer.photos, photosCardsItems);
    setFeatureCard(item.offer.features, featuresCardsItems);
    window.form.map.insertBefore(cardElements, window.handlerPins.pinsArea.nextSibling);
  };

  window.renderCard = {
    renderCard: renderCard,
    removeActivePin: removeActivePin
  };

})();
