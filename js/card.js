'use strict';

(function () {

  var templateCard = document.querySelector('#card').content.querySelector('.map__card');
  var typesToValues = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var removeActivePin = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin !== null) {
      activePin.classList.remove('map__pin--active');
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
    var onButtonCardClose = function () {
      closeCard(cardElements);
    };

    buttonCardClose.addEventListener('click', onButtonCardClose);

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
    setFieldsWithData(titleCardsItems, item.offer.title);
    setFieldsWithData(addressCardsItems, item.offer.address);
    setFieldsWithData(priceCardsItems, item.offer.price + '₽/ночь.');
    setFieldsWithData(typeCardsItems, typesToValues[item.offer.type]);
    setFieldsWithData(roomsAndGuestsCardsItems, item.offer.rooms > 0 ? item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей' : '');
    setFieldsWithData(timeBookingInAndOutCardsItems, 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout);
    setFieldsWithData(descriptionCardsItems, item.offer.description);
    setFieldsWithData(descriptionCardsItems, item.offer.description);
    setAvatarCard(avatarCardsItems, item.author.avatar);
    setPhotosCard(item.offer.photos, photosCardsItems);
    setFeatureCard(item.offer.features, featuresCardsItems);
    window.form.map.insertBefore(cardElements, window.pins.area.nextSibling);
  };

  window.card = renderInfo;

})();
