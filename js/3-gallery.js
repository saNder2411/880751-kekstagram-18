'use strict';

(function () {
  window.blockUserPhotos = document.querySelector('.pictures');
  var thumbnailTemplate =
    document.querySelector('#picture')
      .content
      .querySelector('.picture');
  var errorTemplate =
    document.querySelector('#error')
      .content
      .querySelector('.error');

  var generateThumbnailTemplate = function (photoData) {
    var template = thumbnailTemplate.cloneNode(true);

    template.querySelector('.picture__img').src = photoData.url;
    template.querySelector('.picture__likes').textContent = photoData.likes;
    template.querySelector('.picture__comments').textContent = photoData.comments.length;

    return template;
  };

  var successHandler = function (photosData) {
    var fragment = document.createDocumentFragment();
    window.photosData = photosData;

    for (var i = 0; i < photosData.length; i++) {
      fragment.appendChild(generateThumbnailTemplate(photosData[i]));
    }

    window.blockUserPhotos.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var template = errorTemplate.cloneNode(true);
    var main = document.querySelector('main');

    template.querySelector('.error__title').textContent = errorMessage;
    main.appendChild(template);
  };
  window.load(false, 'GET', successHandler, errorHandler);
})();
