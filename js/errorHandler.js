'use strict';

(function () {
  //объект с вариантами ответов, switch case в функцию
  var main = document.querySelector('main');

  window.errorHandler = {
    errorHandler: function (errorText) {
      console.log(errorText);
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      var errorMessage = errorTemplate.cloneNode(true);
      var hideErrorMessage = function () {
        errorMessage.classList.add('visually-hidden');
      }
      if (main.querySelector('.error')) {
        main.querySelector('.error').classList.remove('visually-hidden');
      } else {
        main.appendChild(errorMessage);
      }
      errorMessage.addEventListener('click', function () {
        hideErrorMessage();
      });
      document.addEventListener('keydown', function (evt) {
        window.utils.isEscEvent(evt, hideErrorMessage);
      });
      errorMessage.querySelector('.error__message').textContent = errorText;
    }
  }
})();
