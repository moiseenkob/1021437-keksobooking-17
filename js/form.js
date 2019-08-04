'use strict';

(function () {

  var MAX_ROOM = 100;
  var MIN_GUEST = 0;
  var ESC_KEYCODE = 27;
  var NUMBER_SYSTEM = 10;
  var STOCK_VALUE_MAIN_PIN = '603, 440';
  var DefaultPositionMainPin = {
    X: 570,
    Y: 375
  };
  var valueToCountRooms = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  var typeHouseToPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var selectTimeInElement = document.querySelector('#timein');
  var selectTimeOutElement = document.querySelector('#timeout');
  var selectTypeHouseElement = document.querySelector('#type');
  var selectMinPriceElement = document.querySelector('#price');
  var selectRoomCounterElement = document.querySelector('#room_number');
  var guestValueElements = document.querySelectorAll('#capacity option');
  var selectGuestElement = document.querySelector('#capacity');
  var titleAdElement = document.querySelector('#title');
  var textDescriptionElement = document.querySelector('#description');
  var wrapperFiltersElement = document.querySelector('.map__filters');
  var comfortElements = wrapperFiltersElement.querySelectorAll('fieldset');
  var selectFiltersElements = wrapperFiltersElement.querySelectorAll('select');
  var timeFormElement = document.querySelector('.ad-form__element--time');
  var fieldsFormElements = document.querySelectorAll('.ad-form fieldset');
  var addressElement = document.querySelector('input[name="address"]');
  var formMainElement = document.querySelector('.ad-form');
  var featuresElement = document.querySelectorAll('.features input');
  var mainScreenElement = document.querySelector('main');
  var buttonResetElement = formMainElement.querySelector('.ad-form__reset');
  var mapElement = document.querySelector('.map');
  var templateSuccessMessage = document.querySelector('#success').content.querySelector('.success');
  var templateErrorMessage = document.querySelector('#error').content.querySelector('.error');
  var dataRooms = [];
  var roomCountStock = '1';
  var guestCountStock = '3';
  var blockMessage;


  /* Disabled count guest else room > guest */
  var setBorderRoomCount = function (option, elements) {
    option.forEach(function (item) {
      item.disabled = elements.indexOf(item.value) === -1;
    });
  };

  var onSetChangeRoomCount = function (evt) {
    roomCountStock = evt.target.value;
    dataRooms = valueToCountRooms[evt.target.value];
    setBorderRoomCount(guestValueElements, dataRooms);
    onSetGuestValidation(roomCountStock, guestCountStock);
  };

  var onSetChangeGuestCount = function (evt) {
    guestCountStock = evt.target.value;
    onSetGuestValidation(roomCountStock, guestCountStock);
  };

  /* Select Room */
  selectRoomCounterElement.addEventListener('change', onSetChangeRoomCount);

  /* Select Guest */
  selectGuestElement.addEventListener('change', onSetChangeGuestCount);

  var onSetGuestValidation = function (countRoom, countGuest) {

    var room = parseInt(countRoom, NUMBER_SYSTEM);
    var guest = parseInt(countGuest, NUMBER_SYSTEM);
    if (room < guest) {
      selectGuestElement.setCustomValidity('Change the number of guests');
    } else if ((room < MAX_ROOM && guest === MIN_GUEST) || (room === MAX_ROOM && guest > MIN_GUEST)) {
      selectGuestElement.setCustomValidity('Change the number of guests');
    } else {
      selectGuestElement.setCustomValidity('');
      selectGuestElement.style.background = 'white';
    }
  };

  // Default value count room and guest
  var setDefaultValueCountGuest = function () {
    selectGuestElement.value = '1';
    guestCountStock = '1';
    onSetGuestValidation(roomCountStock, guestCountStock);
  };
  setDefaultValueCountGuest();

  var onMessageClick = function () {
    blockMessage.remove();
  };

  var setDefaultValueFormAndArea = function () {
    titleAdElement.value = '';
    selectMinPriceElement.value = '';
    textDescriptionElement.value = '';
    window.loadPhotos.setDefaultAvatar();
    formMainElement.classList.add('ad-form--disabled');
    wrapperFiltersElement.classList.add('ad-form--disabled');
    wrapperFiltersElement.reset();
    mapElement.classList.add('map--faded');
    addAttributeDisabled(selectFiltersElements);
    addAttributeDisabled(fieldsFormElements);
    addAttributeDisabled(comfortElements);
    setFeaturesDisabled(featuresElement);
    window.loadPhotos.reset();
    window.initial.pinBase.addEventListener('click', window.initial.onPinMainClick);
  };

  var clearFieldAndPins = function () {
    setDefaultValueFormAndArea();
    /* Default value main pin */
    addressElement.value = STOCK_VALUE_MAIN_PIN;
    window.initial.pinBase.style.left = DefaultPositionMainPin.X + 'px';
    window.initial.pinBase.style.top = DefaultPositionMainPin.Y + 'px';
    // Remove pins
    window.pins.remove();
    // Remove cards
    var firstCardElement = document.querySelector('.map__card');
    if (firstCardElement !== null) {
      firstCardElement.parentNode.removeChild(firstCardElement);
    }
  };

  var getSuccessfulMessage = function () {
    blockMessage = templateSuccessMessage.cloneNode(true);
    mainScreenElement.appendChild(blockMessage);
    clearFieldAndPins();
  };

  var setActiveMap = function () {
    mapElement.classList.remove('map--faded');
  };

  var getErrorMessage = function () {
    blockMessage = templateErrorMessage.cloneNode(true);
    mainScreenElement.appendChild(blockMessage);
  };

  // Close card key ESC
  var onMessageEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      blockMessage.remove();
    }
  };

  formMainElement.addEventListener('submit', function (evt) {
    var formData = new FormData(formMainElement);
    window.backend.uploadDataToServer(formData, getSuccessfulMessage, getErrorMessage);
    document.addEventListener('keydown', onMessageEscPress);
    document.addEventListener('click', onMessageClick);
    evt.preventDefault();
  });

  var setFeaturesDisabled = function (fields) {
    fields.forEach(function (field) {
      if (field.checked) {
        field.checked = false;
      }
      return field;
    });
  };

  /* The function of adding the attribute Disabled*/
  var addAttributeDisabled = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].setAttribute('disabled', '');
    }
  };

  /* Calling Functions to Add Disabled Attributes */
  addAttributeDisabled(selectFiltersElements);
  addAttributeDisabled(fieldsFormElements);
  addAttributeDisabled(comfortElements);

  /* Replacing the price when changing the type of housing */
  var onTypeHouseChange = function (evt) {
    var value = evt.target.value;
    selectMinPriceElement.placeholder = typeHouseToPrice[value];
    selectMinPriceElement.min = typeHouseToPrice[value];
  };

  var setActiveField = function () {
    for (var i = 0; i < fieldsFormElements.length; i++) {
      fieldsFormElements[i].removeAttribute('disabled');
    }
    formMainElement.classList.remove('ad-form--disabled');
  };


  /* Reset function */
  var setDefaultValues = function () {
    selectMinPriceElement.placeholder = typeHouseToPrice['flat'];
    addressElement.value = window.initial.getBaseCoordinates('disabled');
  };

  buttonResetElement.addEventListener('click', function () {
    clearFieldAndPins();
  });

  /* We listen to the event to indicate the price when choosing a type of housing */
  selectTypeHouseElement.addEventListener('change', onTypeHouseChange);

  /* Setting the time when choosing entry or exit */
  var onTimeSetFormChange = function (evt) {
    var target = evt.target;
    if (target.id === selectTimeInElement.id) {
      selectTimeOutElement.options.selectedIndex = target.options.selectedIndex;
    } else {
      selectTimeInElement.options.selectedIndex = target.options.selectedIndex;
    }
  };

  /* Listening event to indicate the time of settlement and departure */
  timeFormElement.addEventListener('change', onTimeSetFormChange);

  setDefaultValues();

  window.form = {
    addressElement: addressElement,
    setActiveField: setActiveField,
    setActiveMap: setActiveMap,
    mapElement: mapElement,
    ESC_KEYCODE: ESC_KEYCODE,
    wrapperFiltersElement: wrapperFiltersElement
  };

})();
