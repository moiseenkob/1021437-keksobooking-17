'use strict';

(function () {


  var MAX_ROOM = 100;
  var MIN_GUEST = 0;
  var ESC_KEYCODE = 27;
  var DEFAULT_VALUE_MAIN_PIN = '603, 449';
  var DefaultPositionMainPin = {
    x: 570,
    y: 375
  };
  var DictionaryValueCountRooms = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  var PRICE_ONE_NIGHT = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var selectDateTimeIn = document.querySelector('#timein');
  var selectDateTimeOut = document.querySelector('#timeout');
  var setTimeForm = document.querySelector('.ad-form__element--time');
  var selectTypeHouse = document.querySelector('#type');
  var setMinPriceField = document.querySelector('#price');
  var adMapFilters = document.querySelector('.map__filters');
  var adMapFieldFilters = adMapFilters.querySelectorAll('select');
  var adMapFieldFiltersFeatures = adMapFilters.querySelectorAll('fieldset');
  var adFormField = document.querySelectorAll('.ad-form fieldset');
  var inputAddress = document.querySelector('input[name="address"]');
  var adFormMain = document.querySelector('.ad-form');
  var roomCounter = document.querySelector('#room_number');
  var guestValue = document.querySelectorAll('#capacity option');
  var selectGuestField = document.querySelector('#capacity');
  var dataRoom = [];
  var roomCountValue = '1';
  var guestCountValue = '3';
  var form = document.querySelector('.ad-form');
  var templateSuccessMessage = document.querySelector('#success').content.querySelector('.success');
  var templateErrorMessage = document.querySelector('#error').content.querySelector('.error');
  var inputTitle = document.querySelector('#title');
  var textDescription = document.querySelector('#description');
  var blockMessage;
  var fieldFeatures = document.querySelectorAll('.features input');


  /* Disabled count guest else room > guest */
  var setBorderValueCount = function (option, elements) {
    option.forEach(function (item) {
      item.disabled = elements.indexOf(item.value) === -1;
    });
  };

  var onSelectChangeRoomCount = function (evt) {
    roomCountValue = evt.target.value;
    dataRoom = DictionaryValueCountRooms[evt.target.value];
    setBorderValueCount(guestValue, dataRoom);
    onSelectGuestCountValidation(roomCountValue, guestCountValue);
  };

  var onSelectChangeGuestCount = function (evt) {
    guestCountValue = evt.target.value;
    onSelectGuestCountValidation(roomCountValue, guestCountValue);
  };

  /* Select Room */
  roomCounter.addEventListener('change', onSelectChangeRoomCount);

  /* Select Guest */
  selectGuestField.addEventListener('change', onSelectChangeGuestCount);

  var onSelectGuestCountValidation = function (countRoom, countGuest) {

    var room = parseInt(countRoom, 10);
    var guest = parseInt(countGuest, 10);
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
    guestCountValue = '1';
    onSelectGuestCountValidation(roomCountValue, guestCountValue);
  };
  setDefaultValueCountGuest();

  var onClickCloseMessage = function () {
    blockMessage.remove();
  };

  var clearMapOfSuccessSendDataToServer = function () {
    inputTitle.value = '';
    setMinPriceField.value = '';
    textDescription.value = '';
    checkedFieldFeaturesDisabled(fieldFeatures);
  };

  var messageSuccessfulDataToServer = function () {
    blockMessage = templateSuccessMessage.cloneNode(true);
    form.appendChild(blockMessage);
    clearMapOfSuccessSendDataToServer();

    /* Default value main pin */
    inputAddress.value = DEFAULT_VALUE_MAIN_PIN;
    window.mainPin.mapPinMain.style.left = DefaultPositionMainPin.x + 'px';
    window.mainPin.mapPinMain.style.top = DefaultPositionMainPin.y + 'px';

    // Remove pins
    window.cards.removePins();
    // Remove cards
    var firstCardOfMap = document.querySelector('.map__card');
    if (firstCardOfMap !== null) {
      firstCardOfMap.parentNode.removeChild(firstCardOfMap);
    }
  };

  var messageErrorDataToServer = function () {
    blockMessage = templateErrorMessage.cloneNode(true);
    form.appendChild(blockMessage);
  };

  // Close card key ESC
  var onKeyPressCloseMessage = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      blockMessage.remove();
    }
  };

  form.addEventListener('submit', function (evt) {
    var formData = new FormData(form);
    window.backend.uploadDataToServer(formData, messageSuccessfulDataToServer, messageErrorDataToServer);

    document.addEventListener('keydown', onKeyPressCloseMessage);
    document.addEventListener('click', onClickCloseMessage);
    evt.preventDefault();
  });

  var checkedFieldFeaturesDisabled = function (fields) {
    fields.forEach(function (field) {
      if (field.checked) {
        field.checked = false;
      }
      return field;
    });
  };

  /* The function of adding the attribute Disabled*/
  var addAttributeFieldsDisabled = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].setAttribute('disabled', '');
    }
  };

  /* Calling Functions to Add Disabled Attributes */
  addAttributeFieldsDisabled(adMapFieldFilters);
  addAttributeFieldsDisabled(adFormField);
  addAttributeFieldsDisabled(adMapFieldFiltersFeatures);

  /* Replacing the price when changing the type of housing */
  var onSelectTypeHouse = function (evt) {
    var value = evt.target.value;
    setMinPriceField.placeholder = PRICE_ONE_NIGHT[value];
    setMinPriceField.min = PRICE_ONE_NIGHT[value];
  };

  var activeForm = function () {
    for (var i = 0; i < adFormField.length; i++) {
      adFormField[i].removeAttribute('disabled');
    }
    for (var y = 0; y < adMapFieldFilters.length; y++) {
      adMapFieldFilters[y].removeAttribute('disabled');
    }
    for (var j = 0; j < adMapFieldFiltersFeatures.length; j++) {
      adMapFieldFiltersFeatures[j].removeAttribute('disabled');
    }
    adFormMain.classList.remove('ad-form--disabled');
  };

  /* Reset function */
  var setDefaultValues = function () {
    setMinPriceField.placeholder = PRICE_ONE_NIGHT['flat'];
    inputAddress.value = window.mainPin.getMainPinCoordinates('disabled');
  };

  /* We listen to the event to indicate the price when choosing a type of housing */
  selectTypeHouse.addEventListener('change', onSelectTypeHouse);

  /* Setting the time when choosing entry or exit */
  var onSetTimeFormChange = function (evt) {
    var target = evt.target;
    if (target.id === selectDateTimeIn.id) {
      selectDateTimeOut.options.selectedIndex = target.options.selectedIndex;
    } else {
      selectDateTimeIn.options.selectedIndex = target.options.selectedIndex;
    }
  };

  /* Listening event to indicate the time of settlement and departure */
  setTimeForm.addEventListener('change', onSetTimeFormChange);

  setDefaultValues();

  window.form = {
    inputAddress: inputAddress,
    activeForm: activeForm
  };

})();
