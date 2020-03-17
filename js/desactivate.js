'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var pinsList = document.querySelector('.map__pins');
  var adFormInputs = adForm.querySelectorAll('input');
  var filter = document.querySelector('.map__filters');
  var mapFilters = filter.children;
  var doElementsDisabled = function (elementsCollection) {
    Array.from(elementsCollection).forEach(function (element) {
      element.setAttribute('disabled', '');
    });
  };

  var deletePins = function () {
    var pins = pinsList.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pins.length !== 0) {
      pins.forEach(function (item) {
        item.remove();
      });
    }
  };

  // Помощник, переводящий страницу в активный режим по нажатию левой кнопки мыши
  var mainPinMouseDownHandler = function (evt) {
    if (evt.buttons === 1) {
      window.activation.activateMap();
    }
  };

  // Помощник, переводящий страницу в активный режим по нажатию клавиши Энтер
  var mainPinKeyDownHandler = function (evt) {
    window.utils.isEnterEvent(evt, window.activation.activateMap);
  };

  var closeOpenedPopup = function () {
    if (map.querySelector('article')) {
      window.cards.closePopup();
    }
  };

  var deactivateMap = function () {
    adForm.reset();
    filter.reset();
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    doElementsDisabled(adFormInputs);
    doElementsDisabled(mapFilters);
    deletePins();
    closeOpenedPopup();
    mainPin.addEventListener('mousedown', mainPinMouseDownHandler);
    mainPin.addEventListener('keydown', mainPinKeyDownHandler);
  };

  deactivateMap();

  window.desactivate = {
    deactivateMap: deactivateMap,
    mainPinMouseDownHandler: mainPinMouseDownHandler,
    mainPinKeyDownHandler: mainPinKeyDownHandler
  };

})();
