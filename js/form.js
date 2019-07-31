'use strict';

(function () {

  var MAX_ROOM = 100;
  var MIN_GUEST = 0;
  var ESC_KEYCODE = 27;
  var NUMBER_SYSTEM = 10;
  var STOCK_VALUE_MAIN_PIN = '603, 440';
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
  var setBorderValueCount = function (option, elements) {
    option.forEach(function (item) {
      item.disabled = elements.indexOf(item.value) === -1;
    });
  };

  var onSelectChangeRoomCount = function (evt) {
    roomCountStock = evt.target.value;
    dataRooms = DictionaryValueCountRooms[evt.target.value];
    setBorderValueCount(guestValue, dataRooms);
    onSelectGuestCountValidation(roomCountStock, guestCountStock);
  };

  var onSelectChangeGuestCount = function (evt) {
    guestCountStock = evt.target.value;
    onSelectGuestCountValidation(roomCountStock, guestCountStock);
  };

  /* Select Room */
  roomCounter.addEventListener('change', onSelectChangeRoomCount);

  /* Select Guest */
  selectGuestField.addEventListener('change', onSelectChangeGuestCount);

  var onSelectGuestCountValidation = function (countRoom, countGuest) {

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
    onSelectGuestCountValidation(roomCountStock, guestCountStock);
  };
  setDefaultValueCountGuest();

  var onMessageClick = function () {
    blockMessage.remove();
  };

  var clearMapOfSuccessSendDataToServer = function () {
    titleAd.value = '';
    setMinPriceField.value = '';
    textDescription.value = '';
    window.loadPhotos.avatarPreview.src = window.loadPhotos.SRC_AVATAR;
    formMain.classList.add('ad-form--disabled');
    wrapperFilters.classList.add('ad-form--disabled');
    map.classList.add('map--faded');
    addAttributeFieldsDisabled(allSelectFromFilters);
    addAttributeFieldsDisabled(allFieldFromForm);
    addAttributeFieldsDisabled(allComfort);
    checkedFieldFeaturesDisabled(fieldFeatures);
    window.loadPhotos.resetPhotos();
    window.mainPin.mapPinMain.addEventListener('click', window.mainPin.onMapPinMainClick);
  };

  var clearFieldAndPins = function () {
    clearMapOfSuccessSendDataToServer();
    /* Default value main pin */
    fieldAddress.value = STOCK_VALUE_MAIN_PIN;
    window.mainPin.mapPinMain.style.left = DefaultPositionMainPin.x + 'px';
    window.mainPin.mapPinMain.style.top = DefaultPositionMainPin.y + 'px';
    // Remove pins
    window.handlerPins.removePins();
    // Remove cards
    var firstCardOfMap = document.querySelector('.map__card');
    if (firstCardOfMap !== null) {
      firstCardOfMap.parentNode.removeChild(firstCardOfMap);
    }
  };

  var messageSuccessfulDataToServer = function () {
    blockMessage = templateSuccessMessage.cloneNode(true);
    allViewScreen.appendChild(blockMessage);
    clearFieldAndPins();
  };

  var activeMap = function () {
    map.classList.remove('map--faded');
  };

  var messageErrorDataToServer = function () {
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
    window.backend.uploadDataToServer(formData, messageSuccessfulDataToServer, messageErrorDataToServer);
    document.addEventListener('keydown', onMessageKeyPress);
    document.addEventListener('click', onMessageClick);
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
  addAttributeFieldsDisabled(allSelectFromFilters);
  addAttributeFieldsDisabled(allFieldFromForm);
  addAttributeFieldsDisabled(allComfort);

  /* Replacing the price when changing the type of housing */
  var onTypeHouseChange = function (evt) {
    var value = evt.target.value;
    setMinPriceField.placeholder = PRICE_ONE_NIGHT[value];
    setMinPriceField.min = PRICE_ONE_NIGHT[value];
  };

  var activeForm = function () {
    for (var i = 0; i < allFieldFromForm.length; i++) {
      allFieldFromForm[i].removeAttribute('disabled');
    }
    formMain.classList.remove('ad-form--disabled');
  };


  /* Reset function */
  var setDefaultValues = function () {
    setMinPriceField.placeholder = PRICE_ONE_NIGHT['flat'];
    fieldAddress.value = window.mainPin.getMainPinCoordinates('disabled');
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
    activeForm: activeForm,
    activeMap: activeMap,
    map: map,
    ESC_KEYCODE: ESC_KEYCODE,
    wrapperFilters: wrapperFilters
  };

})();
