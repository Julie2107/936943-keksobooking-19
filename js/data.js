'use strict';

(function () {
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var ADS_QUANTITY = 8;

  var prices = window.utils.getRandomArray(ADS_QUANTITY, 0, 1000);
  var rooms = window.utils.getRandomArray(ADS_QUANTITY, 1, 4);
  var guests = window.utils.getRandomArray(ADS_QUANTITY, 1, ADS_QUANTITY);

  var getAvatarUrl = function (quantity) {
    var urls = [];
    for (var i = 0; i < quantity; i++) {
      var urlIndex = i + 1;
      urls[i] = 'img/avatars/user0' + urlIndex + '.png';
    }
    return urls;
  };
  var avatarsUrls = getAvatarUrl(ADS_QUANTITY);
  var getOffer = function (objNumber) {
    var offersArray = [];
    for (var i = 0; i < objNumber; i++) {
      var locationX = window.utils.getRandomInteger(20, 940);
      var locationY = window.utils.getRandomInteger(130, 630);
      offersArray[i] = {
        author: {
          avatar: avatarsUrls[i]
        },
        offer: {
          title: 'Название объявления',
          adress: locationX + ', ' + locationY,
          price: prices[i],
          type: TYPES[window.utils.getRandomInteger(0, 3)],
          rooms: rooms[i],
          guests: guests[i],
          checkin: CHECKIN_TIMES[window.utils.getRandomInteger(0, 2)],
          checkout: CHECKOUT_TIMES[window.utils.getRandomInteger(0, 2)],
          features: window.utils.getRandomElementsArray(1, 6, FEATURES),
          description: 'Описание предложения',
          photos: window.utils.getRandomElementsArray(1, 3, PHOTOS)
        },
        location: {
          x: locationX,
          y: locationY
        }
      };
    }
    return offersArray;
  };
  window.data = {
    offers: getOffer(ADS_QUANTITY),
    typesList: {
      palace: {
        type: 'Дворец',
        minprice: '10000'
      },
      flat: {
        type: 'Квартира',
        minprice: '1000'
      },
      house: {
        type: 'Дом',
        minprice: '5000'
      },
      bungalo: {
        type: 'Бунгало',
        minprice: 0
      }
    }
  };
})();
