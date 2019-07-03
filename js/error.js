'use strict';

(function () {

  var createFormErrorInfo = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 3; text-align: center; background-color: red; transform: translate(-50%, -50%); padding: 25px; opacity: 0.9; color: #fff';
    node.style.position = 'absolute';
    node.style.left = '50%';
    node.style.top = '50%';
    node.style.top = '50%';
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.error = {
    createFormErrorInfo: createFormErrorInfo
  };

})();
