'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var SPACE_KEYCODE = 32;

  window.util = {
    doActionIfEscPressed: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    doActionIfEnterOrSpacePressed: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE || evt.keyCode === SPACE_KEYCODE) {
        action();
      }
    },
    getRandomNumberFromPeriod: function (min, max) {
      var randomNumber = min + Math.random() * (max + 1 - min);
      return Math.floor(randomNumber);
    },
    effectMap: {
      chrome: {
        min: 0,
        max: 1,
        filterType: 'grayscale',
        unit: ''
      },
      sepia: {
        min: 0,
        max: 1,
        filterType: 'sepia',
        unit: ''
      },
      marvin: {
        min: 0,
        max: 100,
        filterType: 'invert',
        unit: '%'
      },
      phobos: {
        min: 0,
        max: 5,
        filterType: 'blur',
        unit: 'px'
      },
      heat: {
        min: 1,
        max: 2,
        filterType: 'brightness',
        unit: ''
      }
    }
  };
})();
