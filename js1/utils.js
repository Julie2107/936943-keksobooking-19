'use strict';

(function () {
  var ECS_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  window.utils = {
    getRandomInteger: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    getRandomArray: function (quantity, min, max) {
      var randomArray = [];
      for (var i = 0; i < quantity; i++) {
        randomArray[i] = this.getRandomInteger(min, max);
      }
      return randomArray;
    },
    getRandomElementsArray: function (min, max, array) {
      var finArray = [];
      var arrLength = this.getRandomInteger(min, max);
      for (var i = 0; i < arrLength; i++) {
        finArray[i] = array[i];
      }
      return finArray;
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
