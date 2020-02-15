'use strict';

(function () {
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

  window.cards = {
    renderCard: function (ads) {
    // ищем темплейт
      var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
      // клонируем темплейт
      var cardElement = cardTemplate.cloneNode(true);
      // наполняем
      cardElement.querySelector(POPUP_TITLE_CLASS).textContent = ads.offer.title;
      cardElement.querySelector(POPUP_ADRESS_CLASS).textContent = ads.offer.adress;
      cardElement.querySelector(POPUP_PRICE_CLASS).textContent = ads.offer.price + '₽/ночь';
      cardElement.querySelector(POPUP_TYPE_CLASS).textContent = window.data.typesList[ads.offer.type].type;
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
    }
  };
})();
