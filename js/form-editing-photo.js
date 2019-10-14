'use strict';

(function () {
  var MAX_WIDTH = 453;
  var DEFAULT_VALUE = '100';
  var imagePreview = window.formEditing.querySelector('.img-upload__preview img');
  var effectsRadio = window.formEditing.querySelectorAll('.effects__radio');
  var effectLevelInput = window.formEditing.querySelector('.effect-level__value');
  var slider = window.formEditing.querySelector('.effect-level');
  var sliderPin = window.formEditing.querySelector('.effect-level__pin');
  var sliderDepth = window.formEditing.querySelector('.effect-level__depth');
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
      effectLevelInput.value = DEFAULT_VALUE;
      sliderDepth.style.width = MAX_WIDTH + 'px';
      sliderPin.style.left = MAX_WIDTH + 'px';
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

  var calculatesFilterValue = function (max, min, positionPin) {
    var currentFilterValue = ((max * positionPin) / MAX_WIDTH) + min;
    return currentFilterValue;
  };

  var onSliderPinMouseDown = function (evt) {
    evt.preventDefault();

    var startCoordsX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoordsX - moveEvt.clientX;
      var currentOffsetLeft = sliderPin.offsetLeft - shift;
      startCoordsX = moveEvt.clientX;

      if (currentOffsetLeft >= 0 && currentOffsetLeft <= MAX_WIDTH) {
        sliderPin.style.left = currentOffsetLeft + 'px';
        effectLevelInput.value = Math.round(calculatesFilterValue(DEFAULT_VALUE, 0, currentOffsetLeft));

        var activeEffect = window.formEditing.querySelector('.effects__radio:checked').value;
        if (activeEffect === 'none') {
          imagePreview.style.filter = '';
          return;
        }

        var effectSettings = effects[activeEffect];
        var effectMax = effectSettings.max;
        var effectMin = effectSettings.min;
        var effectFilter = effectSettings.filterType;
        var filterUnit = effectSettings.unit;
        imagePreview.style.filter = effectFilter + '(' + calculatesFilterValue(effectMax, effectMin, currentOffsetLeft) + filterUnit + ')';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  sliderPin.addEventListener('mousedown', onSliderPinMouseDown);
})();
