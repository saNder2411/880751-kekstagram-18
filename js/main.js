'use strict';

var PHOTOS_QUANTITY = 25;
var AVATARS_QUANTITY = 6;
var MESSAGES = ['Всё отлично!',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var AUTHORS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var PHOTOS_DESCRIPTIONS = ['Бухта', 'Тропинка', 'Остров', 'Девушка', 'Суп', 'Спорткар', 'Клубника', 'Сок',
  'Самолет', 'Обувь', 'Песок', 'Ауди', 'Салат', 'Кот', 'Уги', 'Высота', 'Хор', 'Ретро', 'Тапки', 'Пальмы',
  'Блюдо', 'Закат', 'Краб', 'Концерт', 'Джунгли'];

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

var getRandomNumberFromPeriod = function (min, max) {
  var randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};

var generateComments = function () {
  var comments = [];
  for (var i = 0; i <= getRandomNumberFromPeriod(1, 5); i++) {
    comments[i] = {
      avatar: avatarsUrls[getRandomNumberFromPeriod(0, avatarsUrls.length - 1)],
      message: MESSAGES[getRandomNumberFromPeriod(0, MESSAGES.length - 1)],
      name: AUTHORS_NAMES[getRandomNumberFromPeriod(0, AUTHORS_NAMES.length - 1)]
    };
  }
  return comments;
};

var generateUserPhotos = function () {
  var users = [];
  var path = 'photos/';
  var extension = '.jpg';
  for (var i = 0; i < PHOTOS_QUANTITY; i++) {
    users[i] = {
      url: path + (i + 1) + extension,
      description: PHOTOS_DESCRIPTIONS[i],
      likes: getRandomNumberFromPeriod(15, 200),
      comments: generateComments()
    };
  }
  return users;
};

var userPhotos = generateUserPhotos();

var usersPhotosBlock = document.querySelector('.pictures');

var photoTemplate =
  document.querySelector('#picture')
    .content
    .querySelector('.picture');

var generatePhotoTemplate = function (photo) {
  var template = photoTemplate.cloneNode(true);

  template.querySelector('.picture__img').src = photo.url;
  template.querySelector('.picture__likes').textContent = photo.likes;
  template.querySelector('.picture__comments').textContent = photo.comments.length;

  return template;
};

var renderPhotos = function (photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(generatePhotoTemplate(photos[i]));
  }

  usersPhotosBlock.appendChild(fragment);
};

renderPhotos(userPhotos);

var renderBigPhoto = function (photoNumber) {
  photoNumber--;

  var bigPhotoBlock = document.querySelector('.big-picture');
  bigPhotoBlock.classList.remove('hidden');

  var bigPhoto = bigPhotoBlock.querySelector('.big-picture__img img');
  bigPhoto.src = userPhotos[photoNumber].url;

  var likesSum = bigPhotoBlock.querySelector('.likes-count');
  likesSum.textContent = userPhotos[photoNumber].likes;

  var photoDescription = bigPhotoBlock.querySelector('.social__caption');
  photoDescription.textContent = userPhotos[photoNumber].description;


  var commentsSum = bigPhotoBlock.querySelector('.comments-count');
  commentsSum.textContent = userPhotos[photoNumber].comments.length;

  var commentsList = bigPhotoBlock.querySelector('.social__comments');

  if (userPhotos[photoNumber].comments.length > commentsList.children.length) {
    var inequality = userPhotos[photoNumber].comments.length - commentsList.children.length;
    var fragment = document.createDocumentFragment();
    var cloneItem;
    for (var i = 0; i < inequality; i++) {
      cloneItem = commentsList.children[0].cloneNode(true);
      fragment.appendChild(cloneItem);
    }
    commentsList.appendChild(fragment);
  }

  for (var j = 0; j < commentsList.children.length; j++) {
    var avatar = commentsList.children[j].querySelector('.social__picture');
    avatar.src = userPhotos[photoNumber].comments[j].avatar;
    avatar.alt = userPhotos[photoNumber].comments[j].name;

    var comment = commentsList.children[j].querySelector('.social__text');
    comment.textContent = userPhotos[photoNumber].comments[j].message;
  }

  var commentsCalculate = bigPhotoBlock.querySelector('.social__comment-count');
  commentsCalculate.classList.add('visually-hidden');

  var commentsLoader = bigPhotoBlock.querySelector('.comments-loader');
  commentsLoader.classList.add('visually-hidden');
};

renderBigPhoto(1);

