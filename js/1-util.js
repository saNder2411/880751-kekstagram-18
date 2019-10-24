'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var SPACE_KEYCODE = 32;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterAndSpaceEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE || evt.keyCode === SPACE_KEYCODE) {
        action();
      }
    },
    getRandomNumberFromPeriod: function (min, max) {
      var randomNumber = min + Math.random() * (max + 1 - min);
      return Math.floor(randomNumber);
    },

    errorHandler: function (errorMessage) {
      var errorTemplate =
        document.querySelector('#error')
          .content
          .querySelector('.error');
      var errorPopUp = errorTemplate.cloneNode(true);
      var main = document.querySelector('main');
      var buttonsClose = errorPopUp.querySelectorAll('.error__button');

      var addButtonsCloseHandler = function () {
        main.childremove(errorPopUp);
      };

      errorPopUp.querySelector('.error__title').textContent = errorMessage;
      main.appendChild(errorPopUp);
    }
  };
})();
