'use strict';

(function () {
  var fullPhoto = document.querySelector('.big-picture');
  var fullPhotoClose = fullPhoto.querySelector('.big-picture__cancel');

  var fillsFullPhotoData = function (photoData) {
    var bigImage = fullPhoto.querySelector('.big-picture__img img');
    var likesCount = fullPhoto.querySelector('.likes-count');
    var photoDescription = fullPhoto.querySelector('.social__caption');
    var commentsCount = fullPhoto.querySelector('.comments-count');
    var commentsNumbers = fullPhoto.querySelector('.social__comment-count');
    var commentsLoader = fullPhoto.querySelector('.comments-loader');
    var commentsList = fullPhoto.querySelector('.social__comments');
    var commentItem = commentsList.querySelector('.social__comment');
    var fragment = document.createDocumentFragment();

    commentsNumbers.classList.add('visually-hidden');
    commentsLoader.classList.add('visually-hidden');

    bigImage.src = photoData.url;
    likesCount.textContent = photoData.likes;
    photoDescription.textContent = photoData.description;
    commentsCount.textContent = photoData.comments.length;

    photoData.comments.forEach(function (comment, i) {
      var cloneItem = commentItem.cloneNode(true);
      fragment.appendChild(cloneItem);
      var avatar = fragment.children[i].querySelector('.social__picture');
      var text = fragment.children[i].querySelector('.social__text');

      avatar.src = comment.avatar;
      avatar.alt = comment.name;
      text.textContent = comment.message;
    });

    commentsList.innerHTML = '';
    commentsList.appendChild(fragment);
  };

  var onFullPhotoEscPress = function (evt) {
    window.util.doActionIfEscPressed(evt, hideFullPhoto);
  };


  var showFullPhoto = function () {
    fullPhoto.classList.remove('hidden');
    document.addEventListener('keydown', onFullPhotoEscPress);
  };

  var hideFullPhoto = function () {
    fullPhoto.classList.add('hidden');
    document.removeEventListener('keydown', onFullPhotoEscPress);
  };

  fullPhotoClose.addEventListener('click', function () {
    hideFullPhoto();
  });

  fullPhotoClose.addEventListener('keydown', function (evt) {
    window.util.doActionIfEnterOrSpacePressed(evt, hideFullPhoto);
  });

  window.picturesContainer.addEventListener('click', function (evt) {
    var picture = evt.target.closest('.picture') || evt.target.classList.contains('picture');
    var isPicture = Boolean(picture);
    if (isPicture) {
      var pictureId = parseInt(picture.dataset.id, 10);
      var pictureInfo = window.photosData.find(function (photo) {
        return photo.id === pictureId;
      });
      evt.preventDefault();
      fillsFullPhotoData(pictureInfo);
      showFullPhoto();
    }
  });
})();
