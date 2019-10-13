'use strict';

(function () {
  var MAX_WIDTH = 100;
  var DEFAULT_VALUE = '100%';
  var imagePreview = window.formEditing.querySelector('.img-upload__preview img');
  var effectsRadio = window.formEditing.querySelectorAll('.effects__radio');
  var effectLevelInput = window.formEditing.querySelector('.effect-level__value');
  var sliderPin = window.formEditing.querySelector('.effect-level__pin');
  var slider = window.formEditing.querySelector('.effect-level');
  var sliderDepth = window.formEditing.querySelector('.effect-level__depth');
  var positionPin = getComputedStyle(sliderPin).left;
  var effects = {
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
  };

  var addEffectRadioFocusHandler = function (radio) {
    radio.addEventListener('change', function () {
      var effectName = radio.value;
      imagePreview.style.filter = '';
      imagePreview.className = '';
      imagePreview.classList.toggle('effects__preview--' + effectName);
      effectLevelInput.value = parseInt(DEFAULT_VALUE, 10);
      sliderDepth.style.width = DEFAULT_VALUE;
      sliderPin.style.left = DEFAULT_VALUE;
      positionPin = sliderPin.style.left;
      if (effectName === 'none') {
        slider.classList.add('hidden');
      } else {
        slider.classList.remove('hidden');
      }
    });
  };

  for (var i = 0; i < effectsRadio.length; i++) {
    addEffectRadioFocusHandler(effectsRadio[i]);
  }

  var calculatesFilterValue = function (max, min) {
    var currentFilterValue = ((max * parseInt(positionPin, 10)) / MAX_WIDTH) + min;
    return currentFilterValue;
  };

  var onSliderPinMouseUp = function () {
    var activeEffect = window.formEditing.querySelector('.effects__radio:checked').value;
    effectLevelInput.value = parseInt(positionPin, 10);
    if (activeEffect === 'none') {
      imagePreview.style.filter = '';
      return;
    }

    var effectSettings = effects[activeEffect];
    var effectMax = effectSettings.max;
    var effectMin = effectSettings.min;
    var effectFilter = effectSettings.filterType;
    var filterUnit = effectSettings.unit;
    imagePreview.style.filter = effectFilter + '(' + calculatesFilterValue(effectMax, effectMin) + filterUnit + ')';
  };

  sliderPin.addEventListener('mouseup', onSliderPinMouseUp);
})();
