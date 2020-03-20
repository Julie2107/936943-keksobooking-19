'use strict';

(function () {
  var ADS_AMOUNT = 5;
  var FilterMap = {
    ANY_TYPE: 'any',
    priceValues: {
      middle: 10000 - 50000,
      low: 10000,
      high: 50000
    }
  };

  var filter = window.utils.filter;
  var typeFilter = filter.querySelector('#housing-type');
  var priceFilter = filter.querySelector('#housing-price');
  var roomsFilter = filter.querySelector('#housing-rooms');
  var guestsFilter = filter.querySelector('#housing-guests');
  var featuresList = filter.querySelector('#housing-features');
  var filteredAds = [];

  var setTypeFilter = function (ad) {
    return (typeFilter.value === FilterMap.ANY_TYPE) ? true : ad.offer.type === typeFilter.value;
  };

  var setPriceFilter = function (ad) {
    var priceMap = {
      'high': ad.offer.price > FilterMap.priceValues.high,
      'low': ad.offer.price < FilterMap.priceValues.low,
      'middle': ad.offer.price >= 10000 && ad.offer.price <= 50000
    };
    return (priceFilter.value === FilterMap.ANY_TYPE) ? true : priceMap[priceFilter.value];
  };

  var setRoomsFilter = function (ad) {
    return (roomsFilter.value === FilterMap.ANY_TYPE) ? true : ad.offer.rooms.toString() === roomsFilter.value;
  };

  var setGuestsFilter = function (ad) {
    return (guestsFilter.value === FilterMap.ANY_TYPE) ? true : ad.offer.guests.toString() === guestsFilter.value;
  };

  var setFeaturesFilter = function (ad) {
    var checkedFeatures = featuresList.querySelectorAll('input:checked');
    var featureValues = [];
    if (checkedFeatures.length <= 0) {
      return true;
    } else {
      checkedFeatures.forEach(function (feature) {
        featureValues.push(feature.value);
      });
      return featureValues.every(function (value) {
        return ad.offer.features.includes(value);
      });
    }
  };

  var setFilter = function () {
    filteredAds = window.activation.offers.filter(function (ad) {
      return setTypeFilter(ad) &&
             setPriceFilter(ad) &&
             setRoomsFilter(ad) &&
             setGuestsFilter(ad) &&
             setFeaturesFilter(ad);
    })
    .slice(0, ADS_AMOUNT);
    window.desactivation.deletePins();
    window.desactivation.closeOpenedPopup();
    window.pins.paintPins(filteredAds);
  };

  filter.addEventListener('change', window.debounce(setFilter));
})();
