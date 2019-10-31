'use strict';

(function () {
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

  window.gallery = {
    filtersContainer: document.querySelector('.img-filters'),
    picturesContainer: document.querySelector('.pictures'),
    renderPhotos: function (photos) {
      var fragment = document.createDocumentFragment();
      var pictures = this.picturesContainer.querySelectorAll('.picture');

      pictures.forEach(function (picture) {
        picture.remove();
      });

      photos.forEach(function (photo, i) {
        photo.id = i;
        fragment.appendChild(generateThumbnailTemplate(photo));
      });

      this.photosData = photos;
      this.picturesContainer.appendChild(fragment);
      this.filtersContainer.classList.remove('img-filters--inactive');
    }
  };
})();
