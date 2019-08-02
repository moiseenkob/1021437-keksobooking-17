'use strict';

(function () {

  var createModal = function (errorMessage) {
    var modalWindow = document.createElement('div');
    modalWindow.classList.add('error-wrap');
    modalWindow.style = 'z-index: 3; text-align: center; background-color: red; transform: translate(-50%, -50%); padding: 25px; opacity: 0.9; color: #fff';
    modalWindow.style.position = 'absolute';
    modalWindow.style.left = '50%';
    modalWindow.style.top = '50%';
    modalWindow.style.top = '50%';
    modalWindow.style.fontSize = '30px';
    modalWindow.textContent = errorMessage;
    document.body.insertAdjacentElement('afterBegin', modalWindow);
  };

  var removeModal = function () {
    var itemErrorElement = document.querySelector('.error-wrap');
    if (itemErrorElement) {
      itemErrorElement.remove();
    }
  };

  window.error = {
    createModal: createModal,
    removeModal: removeModal
  };

})();
