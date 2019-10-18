'use strict';

(function () {
  console.log(window.blockUserPhotos);
  var fullPhoto = document.querySelector('.big-picture');
  var fullPhotoClose = fullPhoto.querySelector('.big-picture__cancel');
  var createdThumbnails = window.blockUserPhotos.querySelectorAll('.picture');
  console.log(createdThumbnails);

  var renderFullPhoto = function (photo) {
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

    bigImage.src = photo.url;
    likesCount.textContent = photo.likes;
    photoDescription.textContent = photo.description;
    commentsCount.textContent = photo.comments.length;

    for (var i = 0; i < photo.comments.length; i++) {
      var cloneItem = commentItem.cloneNode(true);
      fragment.appendChild(cloneItem);
      var avatar = fragment.children[i].querySelector('.social__picture');
      var comment = fragment.children[i].querySelector('.social__text');

      avatar.src = photo.comments[i].avatar;
      avatar.alt = photo.comments[i].name;
      comment.textContent = photo.comments[i].message;
    }

    commentsList.innerHTML = '';
    commentsList.appendChild(fragment);
  };

  var onFullPhotoEscPress = function (evt) {
    window.util.isEscEvent(evt, hideFullPhoto);
  };


  var showFullPhoto = function () {
    fullPhoto.classList.remove('hidden');
    document.addEventListener('keydown', onFullPhotoEscPress);
  };

  var hideFullPhoto = function () {
    fullPhoto.classList.add('hidden');
    document.removeEventListener('keydown', onFullPhotoEscPress);
  };


  var addThumbnailPhotoClickHandler = function (createdThumbnail, photoData) {
    createdThumbnail.addEventListener('click', function () {
      renderFullPhoto(photoData);
      showFullPhoto();
    });
  };

  var addThumbnailPhotoKeydownHandler = function (createdThumbnail, photoData) {
    createdThumbnail.addEventListener('keydown', function (evt) {
      window.util.isEnterAndSpaceEvent(evt, showFullPhoto);
      renderFullPhoto(photoData);
    });
  };

  for (var i = 0; i < createdThumbnails.length; i++) {
    addThumbnailPhotoClickHandler(createdThumbnails[i], window.photosData[i]);
    addThumbnailPhotoKeydownHandler(createdThumbnails[i], window.photosData[i]);
  }

  fullPhotoClose.addEventListener('click', function () {
    hideFullPhoto();
  });

  fullPhotoClose.addEventListener('keydown', function (evt) {
    window.util.isEnterAndSpaceEvent(evt, hideFullPhoto);
  });
})();
