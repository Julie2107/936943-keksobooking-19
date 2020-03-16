'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var map = document.querySelector('.map');
  var pinsList = document.querySelector('.map__pins');

  var closePopup = function () {
    map.querySelector('article').remove();
  };


  var createFragment = function (array, element) {
    array.forEach(function (item) {
      fragment.appendChild(element(item));
    });
  };

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
  window.pins = {
    paintPins: function (data) {
      // создаем фрагмент из пинов
      createFragment(window.data.offers, renderPin);
      // добавляем фрагмент из пинов в блок
      pinsList.appendChild(fragment);
      var pins = pinsList.querySelectorAll('.map__pin:not(.map__pin--main)');
      // карта по нажатию на пин
      var createCard = function (data) {
        fragment.appendChild(window.cards.renderCard(data));
        map.insertBefore(fragment, map.querySelector('.map__filters-container'));
        var newCard = map.querySelector('article');
        var cardCloseButton = newCard.querySelector('.popup__close');
        cardCloseButton.addEventListener('click', function () {
          this.closePopup();
          document.removeEventListener('keydown', this.closePopup);
        });
        document.addEventListener('keydown', function (evt) {
          window.utils.isEscEvent(evt, this.closePopup);
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
          openPopup(data[i]);
        });
        pin.addEventListener('keydown', function (evt) {
          if (evt.key === 'Enter') {
            openPopup(data[i]);
          }
        });
      });
    },
    deletePins: function () {
      var pins = pinsList.querySelectorAll('.map__pin:not(.map__pin--main)');
      console.log(pins);
      if (pins.length !== 0 ) {
        pins.forEach(function (item) {
          item.remove();
        })
      }
    },

    closePopup: function () {
      map.querySelector('article').remove();
    }

  };
})();
