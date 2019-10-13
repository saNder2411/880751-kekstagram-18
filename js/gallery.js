'use strict';

(function () {
  var PHOTOS_QUANTITY = 25;
  var AVATARS_QUANTITY = 6;

  var generateAvatarsUrls = function () {
    var avatars = [];
    var path = 'img/avatar-';
    var extension = '.svg';
    for (var i = 0; i < AVATARS_QUANTITY; i++) {
      avatars[i] = path + (i + 1) + extension;
    }
    return avatars;
  };
  var avatarsUrls = generateAvatarsUrls();


  var generateComments = function () {
    var comments = [];
    for (var i = 0; i <= window.util.getRandomNumberFromPeriod(1, 9); i++) {
      comments[i] = {
        avatar: avatarsUrls[window.util.getRandomNumberFromPeriod(0, avatarsUrls.length - 1)],
        message: window.data.MESSAGES[window.util.getRandomNumberFromPeriod(0, window.data.MESSAGES.length - 1)],
        name: window.data.AUTHORS_NAMES[window.util.getRandomNumberFromPeriod(0, window.data.AUTHORS_NAMES.length - 1)]
      };
    }
    return comments;
  };

  var generatePhotosData = function () {
    var photosData = [];
    var path = 'photos/';
    var extension = '.jpg';
    for (var i = 0; i < PHOTOS_QUANTITY; i++) {
      photosData[i] = {
        url: path + (i + 1) + extension,
        description: window.data.PHOTOS_DESCRIPTIONS[i],
        likes: window.util.getRandomNumberFromPeriod(15, 200),
        comments: generateComments()
      };
    }
    return photosData;
  };
  window.photosData = generatePhotosData();
})();
