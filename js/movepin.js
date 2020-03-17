'use strict';

(function () {
  var MAIN_PIN_SIZE = 65;
  var MAIN_PIN_AFTER_HEIGHT = 22;
  var TOP_MAX = 630;
  var TOP_MIN = 130;

  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mainPin = map.querySelector('.map__pin--main');
  var mapWidth = map.offsetWidth;
  var addressInput = adForm.querySelector('input#address');
  var filter = document.querySelector('.map__filters');
  var mainPinX = mainPin.offsetLeft;
  var mainPinY = mainPin.offsetTop;

  var getPinLeftValue = function (coord) {
    if (coord < 0 - Math.floor(MAIN_PIN_SIZE / 2)) {
      mainPin.style.left = -Math.floor(MAIN_PIN_SIZE / 2) + 'px';
    } else if (coord > mapWidth) {
      mainPin.style.left = (mapWidth - Math.floor(MAIN_PIN_SIZE / 2)) + 'px';
    } else {
      mainPin.style.left = coord + 'px';
    }
  };

  var getPinTopValue = function (coord) {
    if (coord < TOP_MIN - MAIN_PIN_SIZE - MAIN_PIN_AFTER_HEIGHT) {
      mainPin.style.top = (TOP_MIN - MAIN_PIN_SIZE - MAIN_PIN_AFTER_HEIGHT) + 'px';
    } else if (coord > TOP_MAX) {
      mainPin.style.top = TOP_MAX + 'px';
    } else {
      mainPin.style.top = coord + 'px';
    }
  };

  var getAdress = function (pinParameterX, pinParameterY) {
    var addressX = mainPinX + pinParameterX;
    var addressY = mainPinY + pinParameterY;
    var adressValue = addressX + ', ' + addressY;
    return adressValue;
  };

  addressInput.value = getAdress(Math.floor(MAIN_PIN_SIZE / 2), MAIN_PIN_SIZE + MAIN_PIN_AFTER_HEIGHT);


  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var leftFin = mainPin.offsetLeft - shift.x;
      var topFin = mainPin.offsetTop - shift.y;

      getPinLeftValue(leftFin);
      getPinTopValue(topFin);

      addressInput.value = (leftFin + Math.floor(MAIN_PIN_SIZE / 2)) + ', ' + (topFin + MAIN_PIN_SIZE + MAIN_PIN_AFTER_HEIGHT);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  // активация клавиатурой
})();
