'use strict';

(function () {

  var TIME_DELAY = 1000;
  var URL = 'https://js.dump.academy/keksobooking';
  var StatusCode = {
    SUCCESSFUL: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
  };

  var createRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {

      switch (xhr.status) {
        case StatusCode.SUCCESSFUL:
          onSuccess(xhr.response);
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
          onError('Status: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    /* Additional error handlers */
    xhr.addEventListener('error', function () {
      onError('Connection failed');
    });
    xhr.addEventListener('timeout', function () {
      onError('The request did not have time to complete ' + xhr.timeout + 'ms');
    });

    xhr.timeout = TIME_DELAY;
    return xhr;
  };

  var loadDataFromServer = function (onSuccess, onError) {
    var xhr = createRequest(onSuccess, onError);
    xhr.open('GET', URL + '/data');
    xhr.send();
  };


  var uploadDataToServer = function (data, onSuccess, onError) {
    var xhr = createRequest(onSuccess, onError);
    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    loadDataFromServer: loadDataFromServer,
    uploadDataToServer: uploadDataToServer
  };

})();
