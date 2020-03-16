'use strict';

(function () {
  var map = document.querySelector('.map');

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

  var renderCard = function (ads) {
    // ищем темплейт
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    // клонируем темплейт
    var cardElement = cardTemplate.cloneNode(true);
    // наполняем
    cardElement.querySelector('.popup__title').textContent = ads.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ads.offer.adress;
    cardElement.querySelector('.popup__text--price').textContent = ads.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.utils.typesList[ads.offer.type].type;
    deleteUndefined(ads.offer.rooms, cardElement.querySelector('.popup__text--capacity'));
    deleteUndefined(ads.offer.guests, cardElement.querySelector('.popup__text--capacity'));
    cardElement.querySelector('.popup__text--capacity').textContent = ads.offer.rooms + ' комнаты для ' + ads.offer.guests + ' гостей';
    var times = 'Заезд после ' + ads.offer.checkin + ', выезд до ' + ads.offer.checkout;
    cardElement.querySelector('.popup__text--time').textContent = times;
    removeBlocksFromArray(cardElement, '.popup__features');
    appendBlocksFromArray(ads.offer.features, cardElement.querySelector('.popup__features'));

    cardElement.querySelector('.popup__description').textContent = ads.offer.description;
    deleteUndefined(ads.offer.photos, cardElement.querySelector('.popup__photos'));
    renderPhotos(cardElement, '.popup__photo', ads.offer.photos);
    cardElement.querySelector('.popup__avatar').src = ads.author.avatar;

    deleteUndefinedTextContent(cardElement);
    return cardElement;
  };

  var createCard = function (ads) {
    window.utils.fragment.appendChild(renderCard(ads));
    map.insertBefore(window.utils.fragment, map.querySelector('.map__filters-container'));
    var newCard = map.querySelector('article');
    var cardCloseButton = newCard.querySelector('.popup__close');
    cardCloseButton.addEventListener('click', function () {
      window.cards.closePopup();
      document.removeEventListener('click', window.cards.closePopup);
    });
    document.addEventListener('keydown', function (evt) {
      window.utils.isEscEvent(evt, window.cards.closePopup);
      document.removeEventListener('keydown', window.cards.closePopup);
    });
  };

  window.cards = {
    closePopup: function () {
      map.querySelector('article').remove();
    },

    openPopup: function (ads) {
      if (map.querySelector('article')) {
        window.cards.closePopup();
      }
      createCard(ads);
    }
  };
})();
