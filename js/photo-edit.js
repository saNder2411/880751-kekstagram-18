'use strict';

(function () {
  var DEFAULT_VALUE = 100;
  var effectRadios = window.form.container.querySelectorAll('.effects__radio');
  var effectLevelInput = window.form.container.querySelector('.effect-level__value');
  var sliderPin = window.form.slider.querySelector('.effect-level__pin');
  var sliderDepth = window.form.slider.querySelector('.effect-level__depth');
  var sliderWidth;

  var addEffectRadioChangeHandler = function (radio) {
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

  effectRadios.forEach(function (radio) {
    addEffectRadioChangeHandler(radio);
  });

  var convertsValues = function (max, min, positionPin) {
    var currentValue = ((max * positionPin) / sliderWidth) + min;
    return currentValue;
  };

  var calculatesFilterValues = function (positionPin) {
    var activeEffect = window.form.container.querySelector('.effects__radio:checked').value;

    if (activeEffect === 'none') {
      window.form.imagePreview.style.filter = '';
      return;
    }

    var effectSettings = window.util.effects[activeEffect];
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

