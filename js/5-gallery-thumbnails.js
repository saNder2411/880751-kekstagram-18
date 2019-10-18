'use strict';

(function () {
  window.blockUserPhotos = document.querySelector('.pictures');
  var thumbnailTemplate =
    document.querySelector('#picture')
      .content
      .querySelector('.picture');
  // var errorTemplate =
  //   document.querySelector('#error')
  //     .content
  //     .querySelector('.error');

  var generateThumbnailTemplate = function (photoData) {
    var template = thumbnailTemplate.cloneNode(true);

    template.querySelector('.picture__img').src = photoData.url;
    template.querySelector('.picture__likes').textContent = photoData.likes;
    template.querySelector('.picture__comments').textContent = photoData.comments.length;

    return template;
  };

  var renderThumbnails = function (thumbnailsData) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < thumbnailsData.length; i++) {
      fragment.appendChild(generateThumbnailTemplate(thumbnailsData[i]));
    }

    window.blockUserPhotos.appendChild(fragment);
  };
  renderThumbnails(window.photosData);

  // var errorHandler = function (errorMessage) {
  //   var template = errorTemplate.cloneNode(true);
  //   var main = document.querySelector('main');

  //   template.querySelector('.error__title').textContent = errorMessage;

  //   main.appendChild(template);

  // };
  // window.load(false, 'GET', renderThumbnails, errorHandler);
})();
