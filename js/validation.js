'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var inputRoomsNumber = adForm.querySelector('#room_number');
  var inputGuestsNumber = adForm.querySelector('#capacity');

  var typeInput = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');

  var getCapacityValidationMessage = function (evt) {
    var guestValue = +inputGuestsNumber.value;
    var roomsValue = +inputRoomsNumber.value;
    if ((guestValue === 0 && roomsValue !== 100) || (guestValue !== 0 && roomsValue === 100)) {
      evt.preventDefault();
      inputRoomsNumber.setCustomValidity('опция "100 комнат" предназначена не для гостей');
    } else if (guestValue > roomsValue) {
      evt.preventDefault();
      inputRoomsNumber.setCustomValidity('Количество гостей не должно превышать количество комнат');
    } else {
      inputRoomsNumber.setCustomValidity('');
    }
  };


  var getPriceValidation = function () {
    var typeValue = typeInput.value;
    priceInput.setAttribute('min', window.data.typesList[typeValue].minprice);
    priceInput.setAttribute('placeholder', window.data.typesList[typeValue].minprice);
  };

  var checkInInput = adForm.querySelector('#timein');
  var checkOutInput = adForm.querySelector('#timeout');

  var checkInOutValidation = function () {
    checkOutInput.addEventListener('change', function () {
      checkInInput.value = checkOutInput.value;
    });

    checkInInput.addEventListener('change', function () {
      checkOutInput.value = checkInInput.value;
    });
  };

  adForm.addEventListener('input', function (evt) {
    getCapacityValidationMessage(evt);
    getPriceValidation();
    checkInOutValidation();
  });
})();
