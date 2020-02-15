'use strict';
// константы
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
var ESC_KEY = 'Escape';
var MAIN_PIN_SIZE = 65;
var MAIN_PIN_AFTER_HEIGHT = 22;
var ADS_QUANTITY = 8;
// переменные элетентов
var map = document.querySelector('.map');
var pinsList = document.querySelector('.map__pins');
var mainPin = map.querySelector('.map__pin--main');
var fragment = document.createDocumentFragment();

var filter = document.querySelector('.map__filters');
var mapFilters = filter.children;
var adForm = document.querySelector('.ad-form');
var adFormInputs = adForm.querySelectorAll('input');
var addressInput = adForm.querySelector('input#address');

var inputRoomsNumber = adForm.querySelector('#room_number');
var inputGuestsNumber = adForm.querySelector('#capacity');
// для объекта данных и валидации
var typesList = {
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
};

// служебные функции
var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};
var getRandomArray = function (quantity, min, max) {
  var randomArray = [];
  for (var i = 0; i < quantity; i++) {
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
// функции для отрисовки карточки
var getAvatarUrl = function (quantity) {
  var urls = [];
  for (var i = 0; i < quantity; i++) {
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

var deleteUndefined = function (elementsArray, element) {
  if (elementsArray === undefined || elementsArray.length === 0) {
    element.classList.add('visually-hidden');
  }
};

var renderPhotos = function (element, selector, photos) {
  element.querySelector(selector).src = photos[0];
  for (var i = 1; i < photos.length; i++) {
    var photoElement = element.querySelector(selector).cloneNode(true);
    photoElement.src = photos[i];
    element.querySelector('.popup__photos').appendChild(photoElement);
  }
};

var doElementsDisabled = function (elementsCollection) {
  Array.from(elementsCollection).forEach(function (element) {
    element.setAttribute('disabled', '');
  });
};
var undoElementsDisabled = function (elementsCollection) {
  Array.from(elementsCollection).forEach(function (element) {
    element.removeAttribute('disabled');
  });
};
// для объекта данных
var mainPinX = mainPin.offsetLeft;
var mainPinY = mainPin.offsetTop;

var avatarsUrls = getAvatarUrl(ADS_QUANTITY);
var prices = getRandomArray(ADS_QUANTITY, 0, 1000);
var rooms = getRandomArray(ADS_QUANTITY, 1, 4);
var guests = getRandomArray(ADS_QUANTITY, 1, ADS_QUANTITY);
// функция получения адреса в инпут
var getAdress = function (pinParameterX, pinParameterY) {
  var addressX = mainPinX + pinParameterX;
  var addressY = mainPinY + pinParameterY;
  var adressValue = addressX + ', ' + addressY;
  return adressValue;
};

// валидация
var getCapacityValidationMessage = function (evt) {
  var guestValue = +inputGuestsNumber.value;
  var roomsValue = +inputRoomsNumber.value;
  if ((guestValue === 0 && roomsValue !== 100) || (guestValue !== 0 && roomsValue === 100)) {
    evt.preventDefault();
    inputRoomsNumber.setCustomValidity('опция "100 комнат" предназначена не для гостей');
  } else if (guestValue > roomsValue) {
    evt.preventDefault();
    inputRoomsNumber.setCustomValidity('Количество гостей не должно превышать количество комнат');
  } else {
    inputRoomsNumber.setCustomValidity('');
  }
};

var typeInput = adForm.querySelector('#type');
var priceInput = adForm.querySelector('#price');


var getPriceValidation = function () {
  var typeValue = typeInput.value;
  priceInput.setAttribute('min', typesList[typeValue].minprice);
  priceInput.setAttribute('placeholder', typesList[typeValue].minprice);
};

var checkInInput = adForm.querySelector('#timein');
var checkOutInput = adForm.querySelector('#timeout');

var checkInOutValidation = function () {
  checkOutInput.addEventListener('change', function () {
    checkInInput.value = checkOutInput.value;
  });

  checkInInput.addEventListener('change', function () {
    checkOutInput.value = checkInInput.value;
  });
};

adForm.addEventListener('input', function (evt) {
  getCapacityValidationMessage(evt);
  getPriceValidation();
  checkInOutValidation();
});

// создание массива объектов (контент для карточек)
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

// рендер пинов
var renderPin = function (ads) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = pinTemplate.cloneNode(true);
  var pinImage = pinElement.querySelector('img');
  pinElement.style.left = (ads.location.x - pinImage.width / 2) + 'px';
  pinElement.style.top = (ads.location.y - pinImage.height) + 'px';
  pinImage.src = ads.author.avatar;
  pinImage.alt = ads.offer.title;

  return pinElement;
};

// рендер карточек (функция, возвращает одну заполненную карточку)
var renderCard = function (ads) {
  // ищем темплейт
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  // клонируем темплейт
  var cardElement = cardTemplate.cloneNode(true);
  // наполняем
  cardElement.querySelector(POPUP_TITLE_CLASS).textContent = ads.offer.title;
  cardElement.querySelector(POPUP_ADRESS_CLASS).textContent = ads.offer.adress;
  cardElement.querySelector(POPUP_PRICE_CLASS).textContent = ads.offer.price + '₽/ночь';
  cardElement.querySelector(POPUP_TYPE_CLASS).textContent = typesList[ads.offer.type].type;
  deleteUndefined(ads.offer.rooms, cardElement.querySelector(POPUP_CAPACITY_CLASS));
  deleteUndefined(ads.offer.guests, cardElement.querySelector(POPUP_CAPACITY_CLASS));
  cardElement.querySelector(POPUP_CAPACITY_CLASS).textContent = ads.offer.rooms + ' комнаты для ' + ads.offer.guests + ' гостей';
  var times = 'Заезд после ' + ads.offer.checkin + ', выезд до ' + ads.offer.checkout;
  cardElement.querySelector(POPUP_TIME_CLASS).textContent = times;
  removeBlocksFromArray(cardElement, POPUP_FEATURES_CLASS);
  appendBlocksFromArray(ads.offer.features, cardElement.querySelector(POPUP_FEATURES_CLASS));

  cardElement.querySelector(POPUP_DESCRIPTION_CLASS).textContent = ads.offer.description;
  deleteUndefined(ads.offer.photos, cardElement.querySelector('.popup__photos'));
  renderPhotos(cardElement, POPUP_PHOTO_CLASS, ads.offer.photos);
  cardElement.querySelector(POPUP_AVATAR_CLASS).src = ads.author.avatar;

  deleteUndefinedTextContent(cardElement);
  return cardElement;
};

// функция создания фрагмента
var createFragment = function (array, element) {
  array.forEach(function (item) {
    fragment.appendChild(element(item));
  });
};

// активация/дезактивация страницы
var activateMap = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  undoElementsDisabled(adFormInputs);
  undoElementsDisabled(mapFilters);
};

doElementsDisabled(adFormInputs);
doElementsDisabled(mapFilters);
// локация в инпут
var offers = getOffer(ADS_QUANTITY);

var closePopup = function () {
  map.querySelector('article').remove();
};


// создание пинов и их обработчиков
var paintPins = function () {
  // создаем фрагмент из пинов
  createFragment(offers, renderPin);
  // добавляем фрагмент из пинов в блок
  pinsList.appendChild(fragment);
  var pins = pinsList.querySelectorAll('.map__pin:not(.map__pin--main)');
  // карта по нажатию на пин
  var createCard = function (data) {
    fragment.appendChild(renderCard(data));
    map.insertBefore(fragment, map.querySelector('.map__filters-container'));
    var newCard = map.querySelector('article');
    var cardCloseButton = newCard.querySelector('.popup__close');
    cardCloseButton.addEventListener('click', function () {
      closePopup();
      document.removeEventListener('keydown', closePopup);
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === ESC_KEY) {
        closePopup();
      }
    });
  };
  var openPopup = function (data) {
    var article = map.querySelector('article');
    if (article) {
      article.remove();
    }
    createCard(data);
  };
  pins.forEach(function (pin, i) {
    pin.addEventListener('click', function () {
      openPopup(offers[i]);
    });
    pin.addEventListener('keydown', function (evt) {
      if (evt.key === ENTER_KEY) {
        openPopup(offers[i]);
      }
    });
  });
};
// активация мышкой
var getActivation = function () {
  activateMap();
  paintPins();
  addressInput.value = getAdress(Math.floor(MAIN_PIN_SIZE / 2), MAIN_PIN_SIZE + MAIN_PIN_AFTER_HEIGHT);
};
mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    getActivation();
  }
});
// активация клавиатурой
mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    getActivation();
  }
});
