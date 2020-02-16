'use strict';

(function () {
  // активация мышкой
  var MAIN_PIN_SIZE = 65;
  var MAIN_PIN_AFTER_HEIGHT = 22;

  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var adFormInputs = adForm.querySelectorAll('input');
  var addressInput = adForm.querySelector('input#address');
  var filter = document.querySelector('.map__filters');
  var mapFilters = filter.children;
  var mainPin = map.querySelector('.map__pin--main');
  var mainPinX = mainPin.offsetLeft;
  var mainPinY = mainPin.offsetTop;


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

  var activateMap = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    undoElementsDisabled(adFormInputs);
    undoElementsDisabled(mapFilters);
  };

  var getActivation = function () {
    activateMap();
    window.pins.paintPins();
    addressInput.value = getAdress(Math.floor(MAIN_PIN_SIZE / 2), MAIN_PIN_SIZE + MAIN_PIN_AFTER_HEIGHT);
  };
  doElementsDisabled(adFormInputs);
  doElementsDisabled(mapFilters);

  mainPin.addEventListener('click', function () {
    getActivation();
  });
  // активация клавиатурой
  mainPin.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, getActivation);
  });
})();
