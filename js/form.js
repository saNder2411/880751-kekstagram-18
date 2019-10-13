'use strict';

(function () {
  var DEFAULT_VALUE = '100%';
  var imageUploadInput = window.blockUserPhotos.querySelector('#upload-file');
  window.formEditing = window.blockUserPhotos.querySelector('.img-upload__overlay');
  var imagePreview = window.formEditing.querySelector('.img-upload__preview img');
  var scaleValueInput = window.formEditing.querySelector('.scale__control--value');
  var slider = window.formEditing.querySelector('.effect-level');
  var formEditingClose = window.formEditing.querySelector('#upload-cancel');
  var effectRadioOriginal = window.formEditing.querySelector('.effects__radio:checked').value === 'none';

  var onFormEditingEscPress = function (evt) {
    window.util.isEscEvent(evt, hideFormEditing);
    imageUploadInput.value = '';
  };

  var showFormEditing = function () {
    window.formEditing.classList.remove('hidden');
    document.addEventListener('keydown', onFormEditingEscPress);
  };

  var hideFormEditing = function () {
    window.formEditing.classList.add('hidden');
    document.removeEventListener('keydown', onFormEditingEscPress);
  };

  imageUploadInput.addEventListener('change', function () {
    showFormEditing();
    if (effectRadioOriginal) {
      slider.classList.add('hidden');
    }
    imagePreview.style = '';
    scaleValueInput.value = DEFAULT_VALUE;
  });

  formEditingClose.addEventListener('click', function () {
    hideFormEditing();
  });

  formEditingClose.addEventListener('keydown', function (evt) {
    window.util.isEnterAndSpaceEvent(evt, hideFormEditing);
  });
})();
