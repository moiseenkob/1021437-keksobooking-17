'use strict';

(function () {

  var TIME_DELAY = 1000;
  var StatusCode = {
    SUCCESSFUL: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
  };
  var URL_ACCEPT_DATA_FROM_SERVER = 'https://js.dump.academy/keksobooking/data';
  var URL_SEND_DATA_TO_SERVER = 'https://js.dump.academy/keksobooking';
  var xhrNew;

  var createNewXhrApi = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhrNew = xhr;
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

    xhrNew.timeout = TIME_DELAY;
  };

  var getDataFromServer = function (onSuccess, onError) {

    createNewXhrApi(onSuccess, onError);
    xhrNew.open('GET', URL_ACCEPT_DATA_FROM_SERVER);
    xhrNew.send();

  };


  var uploadDataToServer = function (data, onSuccess, onError) {

    createNewXhrApi(onSuccess, onError);
    xhrNew.open('POST', URL_SEND_DATA_TO_SERVER);
    xhrNew.send(data);

  };

  window.backend = {
    getDataFromServer: getDataFromServer,
    uploadDataToServer: uploadDataToServer
  };

})();
