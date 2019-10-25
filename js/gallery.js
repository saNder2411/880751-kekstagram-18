'use strict';

(function () {
  window.picturesContainer = document.querySelector('.pictures');
  var thumbnailTemplate =
    document.querySelector('#picture')
      .content
      .querySelector('.picture');

  var generateThumbnailTemplate = function (photoData) {
    var template = thumbnailTemplate.cloneNode(true);

    template.dataset.id = photoData.id;
    template.querySelector('.picture__img').src = photoData.url;
    template.querySelector('.picture__likes').textContent = photoData.likes;
    template.querySelector('.picture__comments').textContent = photoData.comments.length;

    return template;
  };

  var successHandler = function (photosData) {
    var fragment = document.createDocumentFragment();

    photosData.forEach(function (photo, i) {
      photo.id = i;
      fragment.appendChild(generateThumbnailTemplate(photo));
    });

    window.photosData = photosData;
    window.picturesContainer.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    window.popups.showError(errorMessage);
  };

  window.backend.load(successHandler, errorHandler);
})();
