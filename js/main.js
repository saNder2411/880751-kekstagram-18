'use strict';

var QUANTITY_PHOTOS = 25;
var QUANTITY_AVATAR = 6;
var MESSAGE_ARRAY = ['Всё отлично!',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES_AUTHOR_COMMENTS = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var generateArrayUrlAvatars = function () {
  var arrayUrlAvatars = [];
  var beginUrlAddsString = 'img/avatar-';
  var endUrlAddsString = '.svg';
  for (var i = 0; i < QUANTITY_AVATAR; i++) {
    arrayUrlAvatars[i] = beginUrlAddsString + (i + 1) + endUrlAddsString;
  }
  return arrayUrlAvatars;
};

var AVATAR_URL_ARRAY = generateArrayUrlAvatars();

var getRandomNumberFromPeriod = function (min, max) {
  var randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};

var generateCommentsArray = function () {
  var commentsArray = [];
  for (var i = 0; i <= getRandomNumberFromPeriod(0, 2); i++) {
    commentsArray[i] = {
      avatar: AVATAR_URL_ARRAY[getRandomNumberFromPeriod(0, AVATAR_URL_ARRAY.length - 1)],
      message: MESSAGE_ARRAY[getRandomNumberFromPeriod(0, MESSAGE_ARRAY.length - 1)],
      name: NAMES_AUTHOR_COMMENTS[getRandomNumberFromPeriod(0, NAMES_AUTHOR_COMMENTS.length - 1)]
    };
  }
  return commentsArray;
};

var generateArrayUserPhotos = function () {
  var userArray = [];
  var beginAddsStringPhoto = 'photos/';
  var endAddsStringPhoto = '.jpg';
  for (var i = 0; i < QUANTITY_PHOTOS; i++) {
    userArray[i] = {
      url: beginAddsStringPhoto + (i + 1) + endAddsStringPhoto,
      description: 'Случайная фотография',
      likes: getRandomNumberFromPeriod(15, 200),
      comments: generateCommentsArray()
    };
  }
  return userArray;
};

var arrayUserPhotos = generateArrayUserPhotos();

var containerUsersPhotos = document.querySelector('.pictures');

var photoTemplate =
  document.querySelector('#picture')
    .content
    .querySelector('.picture');

var renderPhotos = function (photosObject) {
  var photo = photoTemplate.cloneNode(true);

  photo.querySelector('.picture__img').src = photosObject.url;
  photo.querySelector('.picture__img').alt = photosObject.description;
  photo.querySelector('.picture__likes').textContent = photosObject.likes;

  for (var i = 0; i < photosObject.comments.length; i++) {
    // photo.querySelector('.picture__comments').innerHTML +=
    // (i === 0) ? '<img src=' + photosObject.comments[i].avatar + ' width="33" height="33">' : '\n' + '<img src=' + photosObject.comments[i].avatar + ' width="33" height="33">';
    photo.querySelector('.picture__comments').textContent += (i === 0) ? photosObject.comments[i].avatar : '\n' + photosObject.comments[i].avatar;
    photo.querySelector('.picture__comments').textContent += ' ' + photosObject.comments[i].message + '\n' + photosObject.comments[i].name;
  }

  return photo;
};

var fillsContainerPhotos = function (arrayObjects) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrayObjects.length; i++) {
    fragment.appendChild(renderPhotos(arrayObjects[i]));
  }

  containerUsersPhotos.appendChild(fragment);
};

fillsContainerPhotos(arrayUserPhotos);
