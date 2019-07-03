'use strict';

(function () {
  /* Путь откуда забераем данные  */
  var URL = 'https://js.dump.academy/keksobooking/data';
  var TIME_DELAY = 1000;
  var STATUS_SUCCESFULL_CODE = 200;
  var STATUS_BAD_REQUEST_CODE = 400;
  var STATUS_UNAUTHORIZED_CODE = 401;
  var STATUS_NOT_FOUND_CODE = 404;

  var errorHandler = function (xhrObject, statusXhr, onSuccess, onError) {
    switch (statusXhr) {
      case STATUS_SUCCESFULL_CODE:
        onSuccess(xhrObject.response);
        break;
      case STATUS_BAD_REQUEST_CODE:
        onError('Cервер не смог обработать запрос');
        break;
      case STATUS_UNAUTHORIZED_CODE:
        onError('Пользователь не авторизован');
        break;
      case STATUS_NOT_FOUND_CODE:
        onError('Ничего не найдено');
        break;

      default:
        onError('Статус ответа: ' + xhrObject.status + ' ' + xhrObject.statusText);
    }
  };

  var loadData = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      errorHandler(xhr, xhr.status, onSuccess, onError);
    });

    /* Дополнительные обработчики ошибок */
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIME_DELAY;
    xhr.open('GET', URL);
    xhr.send();

  };

  window.backend = {
    loadData: loadData
  };

})();
