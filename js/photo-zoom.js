'use strict';

(function () {
  var SCALE_STEP = 25;
  var MAX_SCALE = 100;
  var MIN_SCALE = 25;
  var SCALE_CONVERSION = 100;
  var scaleOut = window.form.container.querySelector('.scale__control--smaller');
  var scaleIn = window.form.container.querySelector('.scale__control--bigger');

  var zoom = function (actionType) {
    var currentScale = parseInt(window.form.scaleValueInput.value, 10);

    if (actionType === 'out' && currentScale > MIN_SCALE) {
      currentScale -= SCALE_STEP;
    } else if (actionType === 'in' && currentScale < MAX_SCALE) {
      currentScale += SCALE_STEP;
    }

    window.form.scaleValueInput.value = currentScale + '%';
    window.form.imagePreview.style.transform = 'scale(' + (currentScale / SCALE_CONVERSION) + ')';
  };

  scaleOut.addEventListener('click', function () {
    zoom('out');
  });

  scaleIn.addEventListener('click', function () {
    zoom('in');
  });
})();
