'use strict';

(function () {
  var DEFAULT_VALUE = '100%';
  var form = window.gallery.picturesContainer.querySelector('.img-upload__form');
  var imageUploadInput = window.gallery.picturesContainer.querySelector('#upload-file');
  var imageForm = window.gallery.picturesContainer.querySelector('.img-upload__overlay');
  var imagePreview = imageForm.querySelector('.img-upload__preview img');
  var scaleValueInput = imageForm.querySelector('.scale__control--value');
  var slider = imageForm.querySelector('.effect-level');
  var imageFormClose = imageForm.querySelector('#upload-cancel');

  window.form = {
    container: imageForm,
    imageUploadInput: imageUploadInput,
    imagePreview: imagePreview,
    scaleValueInput: scaleValueInput,
    slider: slider,
  };

  var onImageFormEscPress = function (evt) {
    window.util.doActionIfEscPressed(evt, hideImageForm);
  };

  var showImageForm = function () {
    imageForm.classList.remove('hidden');
    document.addEventListener('keydown', onImageFormEscPress);
    slider.classList.add('hidden');
    imagePreview.style = '';
    imagePreview.className = '';
    scaleValueInput.value = DEFAULT_VALUE;
  };

  var hideImageForm = function () {
    imageForm.classList.add('hidden');
    window.formValidation.setValidation(window.formValidation.hashtagsInput, '', '');
    window.formValidation.setValidation(window.formValidation.commentsInput, '', '');
    form.reset();
    document.removeEventListener('keydown', onImageFormEscPress);
  };

  imageUploadInput.addEventListener('change', function () {
    showImageForm();
  });

  imageFormClose.addEventListener('click', function () {
    hideImageForm();
  });

  imageFormClose.addEventListener('keydown', function (evt) {
    window.util.doActionIfEnterOrSpacePressed(evt, hideImageForm);
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var successHandler = function (response) {
      window.popups.showSuccess(response);
    };

    var errorHandler = function (errorMessage) {
      window.popups.showError(errorMessage);
    };
    window.backend.upload(new FormData(form), successHandler, errorHandler);
    hideImageForm();
  });
})();
