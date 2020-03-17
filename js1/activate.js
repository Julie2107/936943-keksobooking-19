'use strict';

(function () {
  // активация мышкой
  var MAIN_PIN_SIZE = 65;
  var MAIN_PIN_AFTER_HEIGHT = 22;
  var TOP_MAX = 630;
  var TOP_MIN = 130;

  var main = document.querySelector('main');
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
    window.pins.deletePins();
    window.data.offers = offers;
    console.log(offers);
    window.pins.paintPins(offers);
  };

  window.activate = {
    errorHandler: function (errorText) {
      console.log(errorText);
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      var errorMessage = errorTemplate.cloneNode(true);
      var hideErrorMessage = function () {
        errorMessage.classList.add('visually-hidden');
      }
      if (main.querySelector('.error')) {
        main.querySelector('.error').classList.remove('visually-hidden');
      } else {
        main.appendChild(errorMessage);
      }
      errorMessage.addEventListener('click', function () {
        hideErrorMessage();
      });
      document.addEventListener('keydown', function (evt) {
        window.utils.isEscEvent(evt, hideErrorMessage);
      });
      errorMessage.querySelector('.error__message').textContent = errorText;
    },

    deactivateMap: function () {
      map.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      doElementsDisabled(adFormInputs);
      doElementsDisabled(mapFilters);
      window.pins.deletePins();
    }
  };
  var activateMap = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    undoElementsDisabled(adFormInputs);
    undoElementsDisabled(mapFilters);
  };

  var getActivation = function () {
    activateMap();
    //window.pins.paintPins();
    window.backend.download(successHandler, window.activate.errorHandler);
    addressInput.value = getAdress(Math.floor(MAIN_PIN_SIZE / 2), MAIN_PIN_SIZE + MAIN_PIN_AFTER_HEIGHT);
  };
  doElementsDisabled(adFormInputs);
  doElementsDisabled(mapFilters);


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
      getActivation();
      if (map.querySelector('article')) {
        window.cards.closePopup();
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  // активация клавиатурой
  mainPin.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, getActivation);
  });
})();
