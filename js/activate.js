'use strict';

(function () {
  // активация мышкой
  var MAIN_PIN_SIZE = 65;
  var MAIN_PIN_AFTER_HEIGHT = 22;
  var TOP_MAX = 630;
  var TOP_MIN = 130;

  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mapWidth = map.offsetWidth;
  var adFormInputs = adForm.querySelectorAll('input');
  var addressInput = adForm.querySelector('input#address');
  var filter = document.querySelector('.map__filters');
  var mapFilters = filter.children;
  var mainPin = map.querySelector('.map__pin--main');
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

  var doElementsDisabled = function (elementsCollection) {
    Array.from(elementsCollection).forEach(function (element) {
      element.setAttribute('disabled', '');
    });
  };

  var undoElementsDisabled = function (elementsCollection) {
    Array.from(elementsCollection).forEach(function (element) {
      element.removeAttribute('disabled');
    });
  };

  var getAdress = function (pinParameterX, pinParameterY) {
    var addressX = mainPinX + pinParameterX;
    var addressY = mainPinY + pinParameterY;
    var adressValue = addressX + ', ' + addressY;
    return adressValue;
  };

  var successHandler = function (offers) {
    window.data.offers = offers;
    window.pins.paintPins();
  };

  var errorHandler = function (errorMessage) {
    var errorBlock = document.createElement('div');
    errorBlock.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: tomato;';
    errorBlock.style.position = 'absolute';
    errorBlock.style.left = 0;
    errorBlock.style.top = 0;
    errorBlock.style.fontSize = '30px';

    errorBlock.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorBlock);
  };

  var activateMap = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    undoElementsDisabled(adFormInputs);
    undoElementsDisabled(mapFilters);
  };

  var getActivation = function () {
    activateMap();
    window.backend.download(successHandler, errorHandler);
    window.pins.paintPins();
    addressInput.value = getAdress(Math.floor(MAIN_PIN_SIZE / 2), MAIN_PIN_SIZE + MAIN_PIN_AFTER_HEIGHT);
  };
  doElementsDisabled(adFormInputs);
  doElementsDisabled(mapFilters);

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    getActivation();

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
  mainPin.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, getActivation);
  });
})();
