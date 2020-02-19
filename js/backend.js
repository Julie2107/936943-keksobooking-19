'use strict';

(function () {
  window.backend = {
    download: function (onSuccess, onError) {
      var URL = 'https://js.dump.academy/keksobooking/data';

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeOut = 5000;

      xhr.open('GET', URL);
      xhr.send();
    }
  }
})();
