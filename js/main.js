'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');
var pinsList = document.querySelector('.map__pins');

var getRandomInt = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getAvatarUrl = function (qty) {
  var urls = [];
  for (var i = 0; i < qty; i++) {
    var urlIndex = i + 1;
    urls[i] = 'img/avatars/user0' + urlIndex + '.png';
  }
  return urls;
};

var getRandomArr = function (qty, min, max) {
  var randomArray = [];
  for (var i = 0; i < qty; i++) {
    randomArray[i] = getRandomInt(min, max);
  }
  return randomArray;
};
var getRandomElementsArr = function (min, max, array) {
  var finArray = [];
  var arrLength = getRandomInt(min, max);
  for (var i = 0; i < arrLength; i++) {
    finArray[i] = array[i];
  }
  return finArray;
};

var avatarsUrls = getAvatarUrl(8);
var prices = getRandomArr(8, 0, 1000);
var rooms = getRandomArr(8, 1, 4);
var guests = getRandomArr(8, 1, 8);
var getOffer = function (objNumber) {
  var offersArray = [];
  for (var i = 0; i < objNumber; i++) {
    var locationX = getRandomInt(20, 940);
    var locationY = getRandomInt(130, 630);
    offersArray[i] =
    {
      author: {
        avatar: avatarsUrls[i]
      },
      offer: {
        title: 'Название объявления',
        adress: locationX + ', ' + locationY,
        price: prices[i],
        type: TYPES[getRandomInt(0, 3)],
        rooms: rooms[i],
        guests: guests[i],
        checkin: CHECKIN_TIMES[getRandomInt(0, 2)],
        checkout: CHECKOUT_TIMES[getRandomInt(0, 2)],
        features: getRandomElementsArr(1, 6, FEATURES),
        description: 'Описание предложения',
        photos: getRandomElementsArr(1, 3, PHOTOS)
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  }
  return offersArray;
};

var offers = getOffer(8);
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (ads) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinImage = pinElement.querySelector('img');
  pinElement.style.left = (ads.location.x - pinImage.width / 2) + 'px';
  pinElement.style.top = (ads.location.y - pinImage.height) + 'px';
  pinImage.src = ads.author.avatar;
  pinImage.alt = ads.offer.title;

  return pinElement;
};

var fragment = document.createDocumentFragment();

for (var j = 0; j < offers.length; j++) {
  fragment.appendChild(renderPin(offers[j]));
}

pinsList.appendChild(fragment);
map.classList.remove('map--faded');

var typesList = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');


var renderCard = function (ads) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = ads.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ads.offer.adress;
  cardElement.querySelector('.popup__text--price').textContent = ads.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = typesList[ads.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = ads.offer.rooms + ' комнаты для ' + ads.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ads.offer.checkin + ', выезд до ' + ads.offer.checkout;

  var featureBlocks = cardElement.querySelector('.popup__features').children;
  for (var i = featureBlocks.length - 1; i >= 0; i--) {
    cardElement.querySelector('.popup__features').removeChild(featureBlocks[i]);
  }
  for (var k = 0; k < ads.offer.features.length; k++) {
    var featureElement = document.createElement('li');
    featureElement.className = 'popup__feature popup__feature--' + ads.offer.features[k];
    cardElement.querySelector('.popup__features').appendChild(featureElement);
  }

  cardElement.querySelector('.popup__description').textContent = ads.offer.description;
  cardElement.querySelector('.popup__photo').src = ads.offer.photos[0];
  for (var l = 1; l < ads.offer.photos.length; l++) {
    var photoElement = cardElement.querySelector('.popup__photo').cloneNode(true);
    photoElement.src = ads.offer.photos[l];
    cardElement.querySelector('.popup__photos').appendChild(photoElement);
  }
  cardElement.querySelector('.popup__avatar').src = ads.author.avatar;

  var cardElements = cardElement.children;
  for (var m = 0; m < cardElements.length; m++) {
    if (cardElements[m].textContent === undefined) {
      cardElement.removeChild(cardElements[m]);
    }
  }
  return cardElement;
};

for (var i = 0; i < offers.length; i++) {
  fragment.appendChild(renderCard(offers[i]));
}

map.insertBefore(fragment, map.querySelector('.map__filters-container'));
