'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var pinsList = document.querySelector('.map__pins');
  var adFormInputs = adForm.querySelectorAll('input');
  var addressInput = adForm.querySelector('input#address');
  var filter = document.querySelector('.map__filters');

  var mapFilters = filter.children;

  var doElementsDisabled = function (elementsCollection) {
    Array.from(elementsCollection).forEach(function (element) {
      element.setAttribute('disabled', '');
    });
  };

  var deletePins = function () {
    var pins = pinsList.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pins.length !== 0 ) {
      pins.forEach(function (item) {
        item.remove();
      })
    }
  };

  window.desactivate = {
    deactivateMap: function () {
      map.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      doElementsDisabled(adFormInputs);
      doElementsDisabled(mapFilters);
      deletePins();
      if (map.querySelector('#article')) {
      window.cards.closePopup();
    }
    }
  }
})();
