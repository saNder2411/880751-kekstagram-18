'use strict';

(function () {
  var SHOWN_COMMENTS = 5;
  var fullPhoto = document.querySelector('.big-picture');
  var bigImage = fullPhoto.querySelector('.big-picture__img img');
  var likesCount = fullPhoto.querySelector('.likes-count');
  var photoDescription = fullPhoto.querySelector('.social__caption');
  var commentsCount = fullPhoto.querySelector('.comments-count');
  var commentsList = fullPhoto.querySelector('.social__comments');
  var commentsLoader = fullPhoto.querySelector('.comments-loader');

  window.galleryFillingPhoto = {
    fullPhoto: fullPhoto,
    fillsFullPhotoData: function (photoData) {
      var commentItem = commentsList.querySelector('.social__comment');
      var fragment = document.createDocumentFragment();

      bigImage.src = photoData.url;
      likesCount.textContent = photoData.likes;
      photoDescription.textContent = photoData.description;
      commentsCount.textContent = photoData.comments.length;

      photoData.comments.forEach(function (comment, i) {
        var cloneItem = commentItem.cloneNode(true);
        if (i >= SHOWN_COMMENTS) {
          cloneItem.classList.add('visually-hidden');
        }
        fragment.appendChild(cloneItem);
        var avatar = fragment.children[i].querySelector('.social__picture');
        var text = fragment.children[i].querySelector('.social__text');

        avatar.src = comment.avatar;
        avatar.alt = comment.name;
        text.textContent = comment.message;
      });

      commentsList.innerHTML = '';
      commentsList.appendChild(fragment);
      commentsLoader.classList.remove('hidden');

      if (commentsList.children.length <= SHOWN_COMMENTS) {
        commentsLoader.classList.add('hidden');
      }
    }
  };

  commentsLoader.addEventListener('click', function () {
    var hideComments = commentsList.querySelectorAll('.visually-hidden');
    for (var i = 0; i < hideComments.length; i++) {
      if (i < SHOWN_COMMENTS) {
        hideComments[i].classList.remove('visually-hidden');
      } else {
        break;
      }

      if (i === hideComments.length - 1) {
        commentsLoader.classList.add('hidden');
      }
    }
  });
})();
