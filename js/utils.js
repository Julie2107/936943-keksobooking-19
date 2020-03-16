'use strict';

(function () {
  var ECS_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  window.utils = {
    fragment: document.createDocumentFragment(),
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
    },
    isEscEvent: function (evt, action) {
      if (evt.key === ECS_KEY) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.key === ENTER_KEY) {
        action();
      }
    }
  };
})();
