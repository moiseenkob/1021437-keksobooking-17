'use strict';

(function () {

  var createModal = function (errorMessage) {
    var modalWindowElement = document.createElement('div');
    modalWindowElement.classList.add('error-wrap');
    modalWindowElement.style = 'z-index: 3; text-align: center; background-color: red; transform: translate(-50%, -50%); padding: 25px; opacity: 0.9; color: #fff';
    modalWindowElement.style.position = 'absolute';
    modalWindowElement.style.left = '50%';
    modalWindowElement.style.top = '50%';
    modalWindowElement.style.top = '50%';
    modalWindowElement.style.fontSize = '30px';
    modalWindowElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterBegin', modalWindowElement);
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
