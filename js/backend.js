'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking/';
  var TIMEOUT = 5000;
  var OK_STATUS = 200;

  window.backend = {
    download: function (onSuccess, onError) {

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === OK_STATUS) {
          onSuccess(xhr.response);
          window.activation.offers = xhr.response;
        } else {
          onError(window.errorHandler.StatusMessage[xhr.status]);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError(window.errorHandler.StatusMessage[xhr.status]);
      });

      xhr.timeOut = TIMEOUT;

      xhr.open('GET', URL_GET);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === OK_STATUS) {
          onLoad(xhr.response);
        } else {
          onError(window.errorHandler.StatusMessage[xhr.status]);
        }
      });

      xhr.addEventListener('error', function () {
        onError(window.errorHandler.StatusMessage[xhr.status]);
      });

      xhr.timeOut = TIMEOUT;

      xhr.open('POST', URL_POST);
      xhr.send(data);
    }
  };
})();
