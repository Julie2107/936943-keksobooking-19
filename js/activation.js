'use strict';

(function () {
  var map = window.utils.map;
  var adForm = window.utils.adForm;
  var mainPin = window.utils.mainPin;
  var adFormFieldsets = window.utils.adFormFieldsets;
  var filter = window.utils.filter;
  var mapFilters = filter.children;

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
    undoElementsDisabled(adFormFieldsets);
    window.backend.download(successHandler, window.errorHandler.errorHandler);
    mainPin.removeEventListener('mousedown', window.desactivation.mainPinMouseDownHandler);
    mainPin.removeEventListener('keydown', window.desactivation.mainPinKeyDownHandler);
  };

  window.activation = {
    activateMap: activateMap,
    offers: []
  };

})();
