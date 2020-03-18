'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mainPin = map.querySelector('.map__pin--main');
  var adFormInputs = adForm.querySelectorAll('input');
  var filter = document.querySelector('.map__filters');
  var mapFilters = filter.children;
  var offers = [];

  var undoElementsDisabled = function (elementsCollection) {
    Array.from(elementsCollection).forEach(function (element) {
      element.removeAttribute('disabled');
    });
  };

  var successHandler = function (offers) {
    window.pins.paintPins(offers);
    undoElementsDisabled(mapFilters);
  };

  var activateMap = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    undoElementsDisabled(adFormInputs);
    window.backend.download(successHandler, window.errorHandler.errorHandler);
    mainPin.removeEventListener('mousedown', window.desactivate.mainPinMouseDownHandler);
    mainPin.removeEventListener('keydown', window.desactivate.mainPinKeyDownHandler);
  };

  window.activation = {
    activateMap: activateMap,
    offers: offers
  };

})();
