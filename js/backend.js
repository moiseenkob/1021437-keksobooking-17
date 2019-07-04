'use strict';

(function () {
  /* Data path  */
  var URL = 'https://js.dump.academy/keksobooking/data';
  var TIME_DELAY = 1000;
  var STATUS_SUCCESSFUL_CODE = 200;
  var STATUS_BAD_REQUEST_CODE = 400;
  var STATUS_UNAUTHORIZED_CODE = 401;
  var STATUS_NOT_FOUND_CODE = 404;

  var statusHandler = function (xhrObject, statusXhr, onSuccess, onError) {
    switch (statusXhr) {
      case STATUS_SUCCESSFUL_CODE:
        onSuccess(xhrObject.response);
        break;
      case STATUS_BAD_REQUEST_CODE:
        onError('Could not process the request');
        break;
      case STATUS_UNAUTHORIZED_CODE:
        onError('User is not authorized');
        break;
      case STATUS_NOT_FOUND_CODE:
        onError('Not found');
        break;

      default:
        onError('Status: ' + xhrObject.status + ' ' + xhrObject.statusText);
    }
  };

  var loadData = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      statusHandler(xhr, xhr.status, onSuccess, onError);
    });

    /* Additional error handlers */
    xhr.addEventListener('error', function () {
      onError('Connection failed');
    });
    xhr.addEventListener('timeout', function () {
      onError('The request did not have time to complete ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIME_DELAY;
    xhr.open('GET', URL);
    xhr.send();

  };

  window.backend = {
    loadData: loadData
  };

})();
