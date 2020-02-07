'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var POPUP_TITLE_CLASS = '.popup__title';
var POPUP_ADRESS_CLASS = '.popup__text--address';
var POPUP_PRICE_CLASS = '.popup__text--price';
var POPUP_TYPE_CLASS = '.popup__type';
var POPUP_CAPACITY_CLASS = '.popup__text--capacity';
var POPUP_TIME_CLASS = '.popup__text--time';
var POPUP_FEATURES_CLASS = '.popup__features';
var POPUP_DESCRIPTION_CLASS = '.popup__description';
var POPUP_PHOTO_CLASS = '.popup__photo';
var POPUP_AVATAR_CLASS = '.popup__avatar';

var map = document.querySelector('.map');
var pinsList = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};
var getRandomArray = function (qty, min, max) {
  var randomArray = [];
  for (var i = 0; i < qty; i++) {
    randomArray[i] = getRandomInteger(min, max);
  }
  return randomArray;
};
var getRandomElementsArray = function (min, max, array) {
  var finArray = [];
  var arrLength = getRandomInteger(min, max);
  for (var i = 0; i < arrLength; i++) {
    finArray[i] = array[i];
  }
  return finArray;
};

var getAvatarUrl = function (qty) {
  var urls = [];
  for (var i = 0; i < qty; i++) {
    var urlIndex = i + 1;
    urls[i] = 'img/avatars/user0' + urlIndex + '.png';
  }
  return urls;
};

var removeBlocksFromArray = function (element, selector) {
  var collection = element.querySelector(selector).children;
  for (var i = collection.length - 1; i >= 0; i--) {
    element.querySelector(selector).removeChild(collection[i]);
  }
};

var appendBlocksFromArray = function (array, parentBlock) {
  for (var k = 0; k < array.length; k++) {
    var featureElement = document.createElement('li');
    featureElement.className = 'popup__feature popup__feature--' + array[k];
    parentBlock.appendChild(featureElement);
  }
};

var deleteUndefinedTextContent = function (array) {
  var elements = array.children;
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].textContent === undefined) {
      array.removeChild(elements[i]);
    }
  }
  return array;
};

var renderPhotos = function (element, selector, array) {
  element.querySelector(selector).src = array[0];
  for (var i = 1; i < array.length; i++) {
    var photoElement = element.querySelector(selector).cloneNode(true);
    photoElement.src = array[i];
    element.querySelector('.popup__photos').appendChild(photoElement);

  }
};

var avatarsUrls = getAvatarUrl(8);
var prices = getRandomArray(8, 0, 1000);
var rooms = getRandomArray(8, 1, 4);
var guests = getRandomArray(8, 1, 8);
var getOffer = function (objNumber) {
  var offersArray = [];
  for (var i = 0; i < objNumber; i++) {
    var locationX = getRandomInteger(20, 940);
    var locationY = getRandomInteger(130, 630);
    offersArray[i] =
    {
      author: {
        avatar: avatarsUrls[i]
      },
      offer: {
        title: 'Название объявления',
        adress: locationX + ', ' + locationY,
        price: prices[i],
        type: TYPES[getRandomInteger(0, 3)],
        rooms: rooms[i],
        guests: guests[i],
        checkin: CHECKIN_TIMES[getRandomInteger(0, 2)],
        checkout: CHECKOUT_TIMES[getRandomInteger(0, 2)],
        features: getRandomElementsArray(1, 6, FEATURES),
        description: 'Описание предложения',
        photos: getRandomElementsArray(1, 3, PHOTOS)
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

var typesList = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
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

var createFragment = function (array, element) {
  for (var j = 0; j < array.length; j++) {
    fragment.appendChild(element(array[j]));
  }
};

var renderCard = function (ads) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(POPUP_TITLE_CLASS).textContent = ads.offer.title;
  cardElement.querySelector(POPUP_ADRESS_CLASS).textContent = ads.offer.adress;
  cardElement.querySelector(POPUP_PRICE_CLASS).textContent = ads.offer.price + '₽/ночь';
  cardElement.querySelector(POPUP_TYPE_CLASS).textContent = typesList[ads.offer.type];
  cardElement.querySelector(POPUP_CAPACITY_CLASS).textContent = ads.offer.rooms + ' комнаты для ' + ads.offer.guests + ' гостей';
  var times = 'Заезд после ' + ads.offer.checkin + ', выезд до ' + ads.offer.checkout;
  cardElement.querySelector(POPUP_TIME_CLASS).textContent = times;
  removeBlocksFromArray(cardElement, POPUP_FEATURES_CLASS);
  appendBlocksFromArray(ads.offer.features, cardElement.querySelector(POPUP_FEATURES_CLASS));

  cardElement.querySelector(POPUP_DESCRIPTION_CLASS).textContent = ads.offer.description;
  renderPhotos(cardElement, POPUP_PHOTO_CLASS, ads.offer.photos);
  cardElement.querySelector(POPUP_AVATAR_CLASS).src = ads.author.avatar;

  deleteUndefinedTextContent(cardElement);
  return cardElement;
};

createFragment(offers, renderPin);
pinsList.appendChild(fragment);
map.classList.remove('map--faded');
createFragment(offers, renderCard);
map.insertBefore(fragment, map.querySelector('.map__filters-container'));
