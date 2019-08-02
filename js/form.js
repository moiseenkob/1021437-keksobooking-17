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
  var selectDateTimeIn = document.querySelector('#timein');
  var selectDateTimeOut = document.querySelector('#timeout');
  var selectTypeHouse = document.querySelector('#type');
  var setMinPriceField = document.querySelector('#price');
  var roomCounter = document.querySelector('#room_number');
  var guestValue = document.querySelectorAll('#capacity option');
  var selectGuestField = document.querySelector('#capacity');
  var titleAd = document.querySelector('#title');
  var textDescription = document.querySelector('#description');
  var wrapperFilters = document.querySelector('.map__filters');
  var allComfort = wrapperFilters.querySelectorAll('fieldset');
  var allSelectFromFilters = wrapperFilters.querySelectorAll('select');
  var setTimeForm = document.querySelector('.ad-form__element--time');
  var allFieldFromForm = document.querySelectorAll('.ad-form fieldset');
  var fieldAddress = document.querySelector('input[name="address"]');
  var formMain = document.querySelector('.ad-form');
  var fieldFeatures = document.querySelectorAll('.features input');
  var allViewScreen = document.querySelector('main');
  var buttonReset = formMain.querySelector('.ad-form__reset');
  var map = document.querySelector('.map');
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
    setBorderRoomCount(guestValue, dataRooms);
    onSetGuestValidation(roomCountStock, guestCountStock);
  };

  var onSetChangeGuestCount = function (evt) {
    guestCountStock = evt.target.value;
    onSetGuestValidation(roomCountStock, guestCountStock);
  };

  /* Select Room */
  roomCounter.addEventListener('change', onSetChangeRoomCount);

  /* Select Guest */
  selectGuestField.addEventListener('change', onSetChangeGuestCount);

  var onSetGuestValidation = function (countRoom, countGuest) {

    var room = parseInt(countRoom, NUMBER_SYSTEM);
    var guest = parseInt(countGuest, NUMBER_SYSTEM);
    if (room < guest) {
      selectGuestField.setCustomValidity('Change the number of guests');
    } else if ((room < MAX_ROOM && guest === MIN_GUEST) || (room === MAX_ROOM && guest > MIN_GUEST)) {
      selectGuestField.setCustomValidity('Change the number of guests');
    } else {
      selectGuestField.setCustomValidity('');
      selectGuestField.style.background = 'white';
    }
  };

  // Default value count room and guest
  var setDefaultValueCountGuest = function () {
    selectGuestField.value = '1';
    guestCountStock = '1';
    onSetGuestValidation(roomCountStock, guestCountStock);
  };
  setDefaultValueCountGuest();

  var onMessageClick = function () {
    blockMessage.remove();
  };

  var setDefaultValueFormAndArea = function () {
    titleAd.value = '';
    setMinPriceField.value = '';
    textDescription.value = '';
    window.loadPhotos.setDefaultAvatar();
    formMain.classList.add('ad-form--disabled');
    wrapperFilters.classList.add('ad-form--disabled');
    map.classList.add('map--faded');
    addAttributeDisabled(allSelectFromFilters);
    addAttributeDisabled(allFieldFromForm);
    addAttributeDisabled(allComfort);
    setFeaturesDisabled(fieldFeatures);
    window.loadPhotos.reset();
    window.initial.pinBase.addEventListener('click', window.initial.onPinMainClick);
  };

  var clearFieldAndPins = function () {
    setDefaultValueFormAndArea();
    /* Default value main pin */
    fieldAddress.value = STOCK_VALUE_MAIN_PIN;
    window.initial.pinBase.style.left = DefaultPositionMainPin.X + 'px';
    window.initial.pinBase.style.top = DefaultPositionMainPin.Y + 'px';
    // Remove pins
    window.pins.remove();
    // Remove cards
    var firstCardOfMap = document.querySelector('.map__card');
    if (firstCardOfMap !== null) {
      firstCardOfMap.parentNode.removeChild(firstCardOfMap);
    }
  };

  var getSuccessfulMessage = function () {
    blockMessage = templateSuccessMessage.cloneNode(true);
    allViewScreen.appendChild(blockMessage);
    clearFieldAndPins();
  };

  var setActiveMap = function () {
    map.classList.remove('map--faded');
  };

  var getErrorMessage = function () {
    blockMessage = templateErrorMessage.cloneNode(true);
    allViewScreen.appendChild(blockMessage);
  };

  // Close card key ESC
  var onMessageKeyPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      blockMessage.remove();
    }
  };

  formMain.addEventListener('submit', function (evt) {
    var formData = new FormData(formMain);
    window.backend.uploadDataToServer(formData, getSuccessfulMessage, getErrorMessage);
    document.addEventListener('keydown', onMessageKeyPress);
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
  addAttributeDisabled(allSelectFromFilters);
  addAttributeDisabled(allFieldFromForm);
  addAttributeDisabled(allComfort);

  /* Replacing the price when changing the type of housing */
  var onTypeHouseChange = function (evt) {
    var value = evt.target.value;
    setMinPriceField.placeholder = typeHouseToPrice[value];
    setMinPriceField.min = typeHouseToPrice[value];
  };

  var setActiveField = function () {
    for (var i = 0; i < allFieldFromForm.length; i++) {
      allFieldFromForm[i].removeAttribute('disabled');
    }
    formMain.classList.remove('ad-form--disabled');
  };


  /* Reset function */
  var setDefaultValues = function () {
    setMinPriceField.placeholder = typeHouseToPrice['flat'];
    fieldAddress.value = window.initial.getBaseCoordinates('disabled');
  };

  buttonReset.addEventListener('click', function () {
    clearFieldAndPins();
  });

  /* We listen to the event to indicate the price when choosing a type of housing */
  selectTypeHouse.addEventListener('change', onTypeHouseChange);

  /* Setting the time when choosing entry or exit */
  var onTimeSetFormChange = function (evt) {
    var target = evt.target;
    if (target.id === selectDateTimeIn.id) {
      selectDateTimeOut.options.selectedIndex = target.options.selectedIndex;
    } else {
      selectDateTimeIn.options.selectedIndex = target.options.selectedIndex;
    }
  };

  /* Listening event to indicate the time of settlement and departure */
  setTimeForm.addEventListener('change', onTimeSetFormChange);

  setDefaultValues();

  window.form = {
    fieldAddress: fieldAddress,
    setActiveField: setActiveField,
    setActiveMap: setActiveMap,
    map: map,
    ESC_KEYCODE: ESC_KEYCODE,
    wrapperFilters: wrapperFilters
  };

})();
