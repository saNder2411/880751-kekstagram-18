'use strict';

(function () {
  var DEFAULT_VALUE = 100;
  var effectsRadio = window.form.formEditing.querySelectorAll('.effects__radio');
  var effectLevelInput = window.form.formEditing.querySelector('.effect-level__value');
  var sliderPin = window.form.slider.querySelector('.effect-level__pin');
  var sliderDepth = window.form.slider.querySelector('.effect-level__depth');
  var sliderWidth;

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
      if (effectName === 'none') {
        window.form.slider.classList.add('hidden');
      } else {
        window.form.slider.classList.remove('hidden');
        sliderWidth = sliderPin.offsetParent.offsetWidth;
      }
      window.form.imagePreview.style.filter = '';
      window.form.imagePreview.className = '';
      window.form.imagePreview.classList.toggle('effects__preview--' + effectName);
      effectLevelInput.value = DEFAULT_VALUE;
      sliderDepth.style.width = sliderWidth + 'px';
      sliderPin.style.left = sliderWidth + 'px';
    });
  };

  for (var i = 0; i < effectsRadio.length; i++) {
    addEffectRadioFocusHandler(effectsRadio[i]);
  }

  var convertsValues = function (max, min, positionPin) {
    var currentValue = ((max * positionPin) / sliderWidth) + min;
    return currentValue;
  };

  var calculatesFilterValues = function (positionPin) {
    var activeEffect = window.form.formEditing.querySelector('.effects__radio:checked').value;
    if (activeEffect === 'none') {
      window.form.imagePreview.style.filter = '';
      return;
    }

    var effectSettings = effects[activeEffect];
    var effectMax = effectSettings.max;
    var effectMin = effectSettings.min;
    var effectFilter = effectSettings.filterType;
    var filterUnit = effectSettings.unit;
    window.form.imagePreview.style.filter = effectFilter + '(' + convertsValues(effectMax, effectMin, positionPin) + filterUnit + ')';
  };

  var onSliderPinMouseDown = function (evt) {
    evt.preventDefault();

    var startCoordsX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoordsX - moveEvt.clientX;
      var currentOffsetLeft = sliderPin.offsetLeft - shift;
      startCoordsX = moveEvt.clientX;

      if (currentOffsetLeft >= 0 && currentOffsetLeft <= sliderWidth) {
        sliderPin.style.left = currentOffsetLeft + 'px';
        sliderDepth.style.width = currentOffsetLeft + 'px';
        effectLevelInput.value = Math.round(convertsValues(DEFAULT_VALUE, 0, currentOffsetLeft));
        calculatesFilterValues(currentOffsetLeft);
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
