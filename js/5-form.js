'use strict';

(function () {
  var DEFAULT_VALUE = '100%';
  var imageUploadInput = window.blockUserPhotos.querySelector('#upload-file');
  var formEditing = window.blockUserPhotos.querySelector('.img-upload__overlay');
  var imagePreview = formEditing.querySelector('.img-upload__preview img');
  var scaleValueInput = formEditing.querySelector('.scale__control--value');
  var slider = formEditing.querySelector('.effect-level');
  var formEditingClose = formEditing.querySelector('#upload-cancel');
  var effectRadioOriginal = formEditing.querySelector('.effects__radio:checked').value === 'none';

  window.form = {
    formEditing: formEditing,
    imagePreview: imagePreview,
    scaleValueInput: scaleValueInput,
    slider: slider,
  };

  var onFormEditingEscPress = function (evt) {
    window.util.isEscEvent(evt, hideFormEditing);
    imageUploadInput.value = '';
  };

  var showFormEditing = function () {
    formEditing.classList.remove('hidden');
    document.addEventListener('keydown', onFormEditingEscPress);
    if (effectRadioOriginal) {
      slider.classList.add('hidden');
    }
    imagePreview.style = '';
    scaleValueInput.value = DEFAULT_VALUE;
  };

  var hideFormEditing = function () {
    formEditing.classList.add('hidden');
    document.removeEventListener('keydown', onFormEditingEscPress);
  };

  imageUploadInput.addEventListener('change', function () {
    showFormEditing();
  });

  formEditingClose.addEventListener('click', function () {
    hideFormEditing();
  });

  formEditingClose.addEventListener('keydown', function (evt) {
    window.util.isEnterAndSpaceEvent(evt, hideFormEditing);
  });
})();
