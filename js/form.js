'use strict';

(function () {

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
  // var selectGuestField = document.querySelector('#capacity');
  // var buttonSendDataToServer = document.querySelector('.ad-form__submit');
  var newEmptyArr = [];
  // var roomCountValue = '1';
  // var guestCountValue = '3';

  var DictionaryValueCountRooms = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var setBorderValueCount = function (option, elements) {
    option.forEach(function (item) {
      if (elements.indexOf(item.value) !== -1) {
        item.removeAttribute('disabled');
      } else {
        item.setAttribute('disabled', '');
      }
    });
  };

  var onSelectChangeRoomCount = function (evt) {
    newEmptyArr = evt.target.value;
    newEmptyArr = DictionaryValueCountRooms[newEmptyArr];
    setBorderValueCount(guestValue, newEmptyArr);
  };

  roomCounter.addEventListener('change', onSelectChangeRoomCount);


  // var onSelectChangeRoomCount = function (evt) {
  //   newEmptyArr = evt.target.value;
  //   roomCountValue = newEmptyArr;
  //   // console.log(roomCountValue + ' roomCountValue');
  //   newEmptyArr = DictionaryValueCountRooms[newEmptyArr];
  //   setBorderValueCount(guestValue, roomCountValue);
  //   // onSelectGuestCountValidation();
  //   // buttonSendDataToServer.removeEventListener('click', onSelectGuestCountValidation);
  // };

  // var onSelectChangeGuestCount = function (evt) {
  //   guestCountValue = evt.target.value;
  //   // console.log(guestCountValue + ' guestCountValue');
  //   // onSelectGuestCountValidation();
  //   // buttonSendDataToServer.removeEventListener('click', onSelectGuestCountValidation);
  // };

  // var onSelectGuestCountValidation = function () {
  //   console.log('roomCountValue ' + roomCountValue + ' guestCountValue ' + guestCountValue)
  //   if (roomCountValue < guestCountValue) {
  //     selectGuestField.setCustomValidity('Change the number of guests');
  //     selectGuestField.style.background = '#ff000052';
  //     buttonSendDataToServer.removeEventListener('click', onSelectGuestCountValidation);
  //   } else if (roomCountValue >= guestCountValue) {
  //     console.log('Мы тут?');
  //     selectGuestField.setCustomValidity('');
  //     selectGuestField.style.background = 'white';
  //   }
  //   selectGuestField.removeEventListener('change', onSelectChangeGuestCount);
  // };

  /* Select Room */

  /* Select Guest */
  // selectGuestField.addEventListener('change', onSelectChangeGuestCount);
  /* Button */
  // buttonSendDataToServer.addEventListener('click', onSelectGuestCountValidation);


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
