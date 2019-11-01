'use strict';

(function () {
  var fullPhotoClose = window.galleryFillingPhoto.fullPhoto.querySelector('.big-picture__cancel');
  var body = document.body;

  var onFullPhotoEscPress = function (evt) {
    window.util.doActionIfEscPressed(evt, hideFullPhoto);
  };

  var showFullPhoto = function () {
    window.galleryFillingPhoto.fullPhoto.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onFullPhotoEscPress);
  };

  var hideFullPhoto = function () {
    window.galleryFillingPhoto.fullPhoto.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onFullPhotoEscPress);
  };

  fullPhotoClose.addEventListener('click', function () {
    hideFullPhoto();
  });

  fullPhotoClose.addEventListener('keydown', function (evt) {
    window.util.doActionIfEnterOrSpacePressed(evt, hideFullPhoto);
  });

  window.gallery.picturesContainer.addEventListener('click', function (evt) {
    var picture = evt.target.closest('.picture') || evt.target.classList.contains('picture');
    var isPicture = Boolean(picture);
    if (isPicture) {
      evt.preventDefault();

      var pictureId = parseInt(picture.dataset.id, 10);
      var pictureInfo = window.gallery.photosData.find(function (photo) {
        return photo.id === pictureId;
      });
      window.galleryFillingPhoto.fillsFullPhotoData(pictureInfo);
      showFullPhoto();
    }
  });
})();
