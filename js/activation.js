'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mainPin = map.querySelector('.map__pin--main');
  var adFormInputs = adForm.querySelectorAll('input');
  var addressInput = adForm.querySelector('input#address');
  var filter = document.querySelector('.map__filters');
  var mapFilters = filter.children;

  var undoElementsDisabled = function (elementsCollection) {
    Array.from(elementsCollection).forEach(function (element) {
      element.removeAttribute('disabled');
    });
  };

  var successHandler = function (offers) {
    console.log(offers);
    window.pins.paintPins(offers);
  };

  var activateMap = function () {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      undoElementsDisabled(adFormInputs);
      undoElementsDisabled(mapFilters);
      window.backend.download(successHandler, window.errorHandler.errorHandler);
      mainPin.removeEventListener('mouseup', activateMap);
      mainPin.removeEventListener('keydown', activateMap);
    }
  mainPin.addEventListener('mouseup', function (evt) {
    activateMap();
  });
  mainPin.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, activateMap);
  });
})();
