'use strict';

(function () {
  var main = document.querySelector('main');
  var errorTemplate =
    document.querySelector('#error')
      .content
      .querySelector('.error');
  var successTemplate =
    document.querySelector('#success')
      .content
      .querySelector('.success');
  var errorPopup = errorTemplate.cloneNode(true);
  var successPopup = successTemplate.cloneNode(true);
  var ERROR_CLASS = 'error__inner';
  var ERROR_BUTTON_CLASS = 'error__button';
  var SUCCESS_CLASS = 'success__inner';
  var SUCCESS_BUTTON_CLASS = 'success__button';

  var addPopupHandlers = function (popup, popupClass, buttonClass) {
    var onPopupEscPress = function (evt) {
      window.util.doActionIfEscPressed(evt, hidePopup);
    };

    var hidePopup = function () {
      main.removeChild(popup);
      document.removeEventListener('keydown', onPopupEscPress);
      document.removeEventListener('click', onDocumentClick);
      popup.removeEventListener('click', onPopupClick);
    };

    var onDocumentClick = function (evt) {
      var target = evt.target.closest('.' + popupClass) || evt.target.classList.contains(popupClass);
      var isTarget = Boolean(target);
      if (!isTarget) {
        hidePopup();
      }
    };

    var onPopupClick = function (evt) {
      var buttonHide = evt.target.classList.contains(buttonClass);
      if (buttonHide) {
        hidePopup();
      }
    };

    popup.addEventListener('click', onPopupClick);
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onPopupEscPress);
    main.appendChild(popup);
  };

  window.popups = {
    showError: function (errorMessage) {
      addPopupHandlers(errorPopup, ERROR_CLASS, ERROR_BUTTON_CLASS);
      errorPopup.querySelector('.error__title').textContent = errorMessage;
    },
    showSuccess: function (response) {
      if (response) {
        addPopupHandlers(successPopup, SUCCESS_CLASS, SUCCESS_BUTTON_CLASS);
      }
    }
  };
})();
