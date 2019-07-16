'use strict';

(function () {
  /* Data path  */

  var TIME_DELAY = 1000;
  var StatusCode = {
    SUCCESSFUL: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
  };
  var URL = 'https://js.dump.academy/keksobooking/data';
  var getStatusHandler = function (xhrObject, statusXhr, onSuccess, onError) {
    switch (statusXhr) {
      case StatusCode.SUCCESSFUL:
        onSuccess(xhrObject.response);
        break;
      case StatusCode.BAD_REQUEST:
        onError('Could not process the request');
        break;
      case StatusCode.UNAUTHORIZED:
        onError('User is not authorized');
        break;
      case StatusCode.NOT_FOUND:
        onError('Not found');
        break;

      default:
        onError('Status: ' + xhrObject.status + ' ' + xhrObject.statusText);
    }
  };

  var getDataFromServer = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      getStatusHandler(xhr, xhr.status, onSuccess, onError);
    });

    /* Additional error handlers */
    xhr.addEventListener('error', function () {
      onError('Connection failed');
    });
    xhr.addEventListener('timeout', function () {
      onError('The request did not have time to complete ' + xhr.timeout + 'ms');
    });

    xhr.timeout = TIME_DELAY;
    xhr.open('GET', URL);
    xhr.send();

  };

  window.backend = getDataFromServer;

})();
