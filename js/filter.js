'use strict';

(function () {
  var ANY_TYPE = 'any';
  var filter = document.querySelector('.map__filters');
  var typeInput = filter.querySelector('#housing-type');

  var setTypeFilter = function (value) {
    if (value === ANY_TYPE) {
      window.pins.paintPins(window.activation.offers);
    } else {
      window.desactivate.deletePins();
      window.desactivate.closeOpenedPopup();
      var offersByType = window.activation.offers.filter(function (ad) {
        return ad.offer.type === typeInput.value;
      })
      .slice(0, 5);
      window.pins.paintPins(offersByType);
    }
  };
  typeInput.addEventListener('change', function () {
    setTypeFilter(typeInput.value);
  });
})();
