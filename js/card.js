'use strict';

(function () {

  var templateCardElement = document.querySelector('#card').content.querySelector('.map__card');
  var typesToValues = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var removeActivePin = function () {
    var activePinElements = document.querySelector('.map__pin--active');
    if (activePinElements !== null) {
      activePinElements.classList.remove('map__pin--active');
    }
  };

  var setPhotosCard = function (items, element) {
    if (items.length <= 0) {
      element.remove();
    } else {
      var photoElement = element.querySelector('.popup__photo');
      photoElement.src = items[0];

      var fragment = document.createDocumentFragment();
      for (var i = 1; i < items.length; i++) {
        var imageElement = photoElement.cloneNode(true);
        imageElement.src = items[i];
        fragment.appendChild(imageElement);
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

  var closeCard = function (elements) {
    elements.remove();
    removeActivePin();
  };

  var renderInfo = function (item) {

    removeActivePin();
    var cardElements = templateCardElement.cloneNode(true);

    // Find elements cards
    var titleCardsElement = cardElements.querySelector('.popup__title');
    var addressCardsElement = cardElements.querySelector('.popup__text--address');
    var priceCardsElement = cardElements.querySelector('.popup__text--price');
    var typeCardsElement = cardElements.querySelector('.popup__type');
    var roomsAndGuestsCardsElement = cardElements.querySelector('.popup__text--capacity');
    var timeBookingInAndOutCardsElement = cardElements.querySelector('.popup__text--time');
    var descriptionCardsElement = cardElements.querySelector('.popup__description');
    var avatarCardsElement = cardElements.querySelector('.popup__avatar');
    var photosCardsElement = cardElements.querySelector('.popup__photos');
    var featuresCardsElement = cardElements.querySelector('.popup__features');

    // Close card
    var buttonCardCloseElement = cardElements.querySelector('.popup__close');
    var onButtonCardClose = function () {
      closeCard(cardElements);
    };

    buttonCardCloseElement.addEventListener('click', onButtonCardClose);

    var onEscKeyPress = function (evt) {
      if (evt.keyCode === window.form.ESC_KEYCODE) {
        closeCard(cardElements);
      }
    };

    // Close card key ESC
    document.addEventListener('keydown', onEscKeyPress);

    // Set value of card
    var setFieldsWithData = function (fieldCard, fieldDataOfServer) {
      if (fieldDataOfServer !== '') {
        fieldCard.textContent = fieldDataOfServer;
      } else {
        fieldCard.remove();
      }
    };

    var setAvatarCard = function (fieldCard, fieldDataOfServer) {
      if (fieldDataOfServer !== '') {
        fieldCard.src = fieldDataOfServer;
      } else {
        fieldCard.remove();
      }
    };
    // offer.rooms > 0 ? formatCapacity(offer) : ''
    setFieldsWithData(titleCardsElement, item.offer.title);
    setFieldsWithData(addressCardsElement, item.offer.address);
    setFieldsWithData(priceCardsElement, item.offer.price + '₽/ночь.');
    setFieldsWithData(typeCardsElement, typesToValues[item.offer.type]);
    setFieldsWithData(roomsAndGuestsCardsElement, item.offer.rooms > 0 ? item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей' : '');
    setFieldsWithData(timeBookingInAndOutCardsElement, 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout);
    setFieldsWithData(descriptionCardsElement, item.offer.description);
    setFieldsWithData(descriptionCardsElement, item.offer.description);
    setAvatarCard(avatarCardsElement, item.author.avatar);
    setPhotosCard(item.offer.photos, photosCardsElement);
    setFeatureCard(item.offer.features, featuresCardsElement);
    window.form.mapElement.insertBefore(cardElements, window.pins.areaElement.nextSibling);
  };

  window.card = renderInfo;

})();
