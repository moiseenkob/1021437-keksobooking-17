'use strict';

(function () {

  var MAX_ROOM = 100;
  var MIN_GUEST = 0;
  var ESC_KEYCODE = 27;
  var NUMBER_SYSTEM = 10;
  var STOCK_VALUE_MAIN_PIN = '603, 445';
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
  var mainScreenElement = document.querySelector('main');
  var mapElement = mainScreenElement.querySelector('.map');
  var wrapperFiltersElement = mapElement.querySelector('.map__filters');
  var comfortElements = wrapperFiltersElement.querySelectorAll('fieldset');
  var selectFiltersElements = wrapperFiltersElement.querySelectorAll('select');
  var formMainElement = document.querySelector('.ad-form');
  var selectTimeInElement = formMainElement.querySelector('#timein');
  var selectTimeOutElement = formMainElement.querySelector('#timeout');
  var selectTypeHouseElement = formMainElement.querySelector('#type');
  var selectMinPriceElement = formMainElement.querySelector('#price');
  var selectRoomCounterElement = formMainElement.querySelector('#room_number');
  var guestValueElements = formMainElement.querySelectorAll('#capacity option');
  var selectGuestElement = formMainElement.querySelector('#capacity');
  var titleAdElement = formMainElement.querySelector('#title');
  var textDescriptionElement = formMainElement.querySelector('#description');
  var timeFormElement = formMainElement.querySelector('.ad-form__element--time');
  var fieldsFormElements = formMainElement.querySelectorAll('.ad-form fieldset');
  var addressElement = formMainElement.querySelector('input[name="address"]');
  var buttonResetElement = formMainElement.querySelector('.ad-form__reset');
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
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
    setBorderRoomCount(guestValueElements, valueToCountRooms[evt.target.value]);
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
    selectMinPriceElement.placeholder = '1000';
    selectMinPriceElement.min = '1000';
    textDescriptionElement.value = '';
    window.loadPhotos.setDefaultAvatar();
    formMainElement.classList.add('ad-form--disabled');
    wrapperFiltersElement.classList.add('ad-form--disabled');
    mapElement.classList.add('map--faded');
    addAttributeDisabled(selectFiltersElements);
    addAttributeDisabled(fieldsFormElements);
    addAttributeDisabled(comfortElements);
    formMainElement.reset();
    window.loadPhotos.reset();
    wrapperFiltersElement.reset();
    setDefaultValueCountGuest();
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
    if (firstCardElement) {
      firstCardElement.parentNode.removeChild(firstCardElement);
    }
  };

  var getSuccessfulMessage = function () {
    blockMessage = successMessageTemplate.cloneNode(true);
    mainScreenElement.appendChild(blockMessage);
    clearFieldAndPins();
  };

  var setActiveMap = function () {
    mapElement.classList.remove('map--faded');
  };

  var getErrorMessage = function () {
    blockMessage = errorMessageTemplate.cloneNode(true);
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

  /* The function of adding the attribute Disabled*/
  var addAttributeDisabled = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = true;
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
      fieldsFormElements[i].disabled = false;
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
