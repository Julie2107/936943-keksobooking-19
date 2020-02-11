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
var ENTER_KEY = 'Enter';
var MAIN_PIN_SIZE = 65;
var MAIN_PIN_AFTER_HEIGHT = 22;

var map = document.querySelector('.map');
var pinsList = document.querySelector('.map__pins');
var mainPin = map.querySelector('.map__pin--main');
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

var deleteUndefinedTextContent = function (block) {
  var elements = block.children;
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].textContent === undefined) {
      block.removeChild(elements[i]);
    }
  }
  return block;
};

var deleteUndefined = function (array, element) {
  if (array.length === 0 || array === undefined) {
    element.classList.add('visually-hidden');
  }
}

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

var filter = document.querySelector('.map__filters');
var mapFilters = filter.children;
var adForm = document.querySelector('.ad-form');
var adFormInputs = adForm.querySelectorAll('input');
var addressInput = adForm.querySelector('input#address');
var mainPinX = mainPin.offsetLeft;
var mainPinY = mainPin.offsetTop;
var doElementsDisabled = function (array, element) {
  for (var i = 0; i < array.length; i++) {
    array[i].setAttribute('disabled', '');
  }
}
var undoElementsDisabled = function (array, element) {
  for (var i = 0; i < array.length; i++) {
    array[i].removeAttribute('disabled', '');
  }
}

var activateMap = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  undoElementsDisabled(adFormInputs);
  undoElementsDisabled(mapFilters);
}

doElementsDisabled(adFormInputs);
doElementsDisabled(mapFilters);
var addressX = mainPinX + Math.floor(MAIN_PIN_SIZE/2);
var addressY = mainPinY + Math.floor(MAIN_PIN_SIZE/2);
addressInput.value = addressX + ', ' + addressY;

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
  activateMap();

  addressX = mainPinX + Math.floor(MAIN_PIN_SIZE/2);
  addressY = mainPinY + MAIN_PIN_SIZE + MAIN_PIN_AFTER_HEIGHT;
  addressInput.value = addressX + ', ' + addressY;
  }
})

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    activateMap();

    addressX = mainPinX + Math.floor(MAIN_PIN_SIZE/2);
    addressY = mainPinY + MAIN_PIN_SIZE + MAIN_PIN_AFTER_HEIGHT;
    addressInput.value = addressX + ', ' + addressY;
  }
})

var inputRoomsNumber = adForm.querySelector('#room_number');
var inputGuestsNumber = adForm.querySelector('#capacity');
/*var disableOption = function (input1, input2) {
  if (inputGuestsNumber.value > inputRoomsNumber.value) {
    var roomOptions = inputRoomsNumber.querySelectorAll('option');
    for (var i=0; i < roomOptions.length; i++) {
      if (roomOptions[i].value < inputGuestsNumber.value) {
        roomOptions[i].setAttribute('disabled', '');
      } else {
        roomOptions[i].removeAttribute('disabled');
      }
    }
}*/

var roomOptions = inputRoomsNumber.querySelectorAll('option');
var guestOptions = inputGuestsNumber.querySelectorAll('option');
var validateCapacity = function (options, select) {
  for (var i = 0; i < options.length; i++) {
    if (options[i].value < select.value) {
      options[i].setAttribute('disabled', '');
    } else {
      options[i].removeAttribute('disabled');
    }
  }
}
inputGuestsNumber.addEventListener('change', function() {
  validateCapacity(roomOptions, inputGuestsNumber)
})

inputRoomsNumber.addEventListener('change', function() {
  validateCapacity(guestOptions, inputRoomsNumber);
});

var getCapacityValidationMessage = function (evt) {
  if (inputGuestsNumber.value > inputRoomsNumber.value) {
    evt.preventDefault();
    inputRoomsNumber.setCustomValidity('Количество гостей не должно превышать количество комнат');
  } else {
    inputRoomsNumber.setCustomValidity('');
  }
}

adForm.addEventListener('submit', function(evt) {
  getCapacityValidationMessage(evt);
})

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
/*
var renderCard = function (ads) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(POPUP_TITLE_CLASS).textContent = ads.offer.title;
  cardElement.querySelector(POPUP_ADRESS_CLASS).textContent = ads.offer.adress;
  cardElement.querySelector(POPUP_PRICE_CLASS).textContent = ads.offer.price + '₽/ночь';
  cardElement.querySelector(POPUP_TYPE_CLASS).textContent = typesList[ads.offer.type];
  deleteUndefined(ads.offer.rooms, cardElement.querySelector(POPUP_CAPACITY_CLASS));
  deleteUndefined(ads.offer.guests, cardElement.querySelector(POPUP_CAPACITY_CLASS));
  cardElement.querySelector(POPUP_CAPACITY_CLASS).textContent = ads.offer.rooms + ' комнаты для ' + ads.offer.guests + ' гостей';
  var times = 'Заезд после ' + ads.offer.checkin + ', выезд до ' + ads.offer.checkout;
  cardElement.querySelector(POPUP_TIME_CLASS).textContent = times;
  removeBlocksFromArray(cardElement, POPUP_FEATURES_CLASS);
  appendBlocksFromArray(ads.offer.features, cardElement.querySelector(POPUP_FEATURES_CLASS));

  cardElement.querySelector(POPUP_DESCRIPTION_CLASS).textContent = ads.offer.description;
  deleteUndefined(ads.offer.photos, cardElement.querySelector('.popup__photos'));
  //if (ads.offer.photos.length === 0 || ads.offer.photos === undefined) {
  //  cardElement.querySelector('.popup__photos').classList.add('visually-hidden');
  //}
  renderPhotos(cardElement, POPUP_PHOTO_CLASS, ads.offer.photos);
  cardElement.querySelector(POPUP_AVATAR_CLASS).src = ads.author.avatar;

  deleteUndefinedTextContent(cardElement);
  return cardElement;
};
*/
//createFragment(offers, renderPin);
//pinsList.appendChild(fragment);
//createFragment(offers, renderCard);
//map.insertBefore(fragment, map.querySelector('.map__filters-container'));
