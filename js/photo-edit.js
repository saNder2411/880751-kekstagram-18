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

  var convertValues = function (max, min, positionPin) {
    var currentValue = ((max * positionPin) / sliderWidth) + min;
    return currentValue;
  };

  var calculateFilterValues = function (positionPin) {
    var activeEffect = window.form.container.querySelector('.effects__radio:checked').value;

    if (activeEffect === 'none') {
      window.form.imagePreview.style.filter = '';
      return;
    }

    var effectSettings = window.util.effectMap[activeEffect];
    var effectMax = effectSettings.max;
    var effectMin = effectSettings.min;
    var effectFilter = effectSettings.filterType;
    var filterUnit = effectSettings.unit;
    window.form.imagePreview.style.filter = effectFilter + '(' + convertValues(effectMax, effectMin, positionPin) + filterUnit + ')';
  };

  var onSliderMouseDown = function (evt) {
    evt.preventDefault();

    var sliderArea = new window.sliderCoordinate.SliderArea(0, 0, sliderWidth, 0);
    var clickCoordinate = new window.sliderCoordinate.Coordinate(evt.clientX);
    var currentPosition = new window.sliderCoordinate.Coordinate(sliderPin.offsetLeft, 0, sliderArea);
    var coordsSliderPin = sliderPin.getBoundingClientRect().x + (sliderPin.offsetWidth / 2);
    var shift = coordsSliderPin - clickCoordinate.x;
    currentPosition.setX((currentPosition.x - shift));

    var movesSliderPin = function (position) {
      sliderPin.style.left = position + 'px';
      sliderDepth.style.width = position + 'px';
      effectLevelInput.value = Math.round(convertValues(DEFAULT_VALUE, 0, position));
      calculateFilterValues(position);
    };

    movesSliderPin(currentPosition.x);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      shift = clickCoordinate.x - moveEvt.clientX;
      currentPosition.setX((currentPosition.x - shift));
      clickCoordinate.x = moveEvt.clientX;

      movesSliderPin(currentPosition.x);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.form.slider.addEventListener('mousedown', onSliderMouseDown);
})();
