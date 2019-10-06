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
var usersPhotosBlock = document.querySelector('.pictures');
var fullPhoto = document.querySelector('.big-picture');
var photoTemplate =
  document.querySelector('#picture')
    .content
    .querySelector('.picture');

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
  for (var i = 0; i <= getRandomNumberFromPeriod(1, 9); i++) {
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

  // fullPhoto.classList.remove('hidden');
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

  for (var j = commentsList.children.length - 1; j >= 0; j--) {
    commentsList.removeChild(commentsList.children[j]);
  }

  commentsList.appendChild(fragment);
};

// -------------------------------------------------------------------------------------------------------

var addHandlers = function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var SPACE_KEYCODE = 32;
  var formEditing = usersPhotosBlock.querySelector('.img-upload__overlay');
  var imagePreview = formEditing.querySelector('.img-upload__preview img');

  var openElementWindow = function (openElement, onElementEscPress) {
    openElement.classList.remove('hidden');
    document.addEventListener('keydown', onElementEscPress);
  };

  var closeElementWindow = function (closeElement, onElementEscPress) {
    closeElement.classList.add('hidden');
    document.removeEventListener('keydown', onElementEscPress);
  };

  var addMinPictureAndFullPhotoHandlers = function () {
    var closeFullPhoto = fullPhoto.querySelector('.big-picture__cancel');
    var minPictures = usersPhotosBlock.querySelectorAll('.picture');

    var onFullPhotoEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeElementWindow(fullPhoto, onFullPhotoEscPress);
      }
    };

    var addMinPictureClickHandler = function (minPicture, bigPicture) {
      minPicture.addEventListener('click', function () {
        renderFullPhoto(bigPicture);
        openElementWindow(fullPhoto, onFullPhotoEscPress);
      });
    };

    var addMinPictureKeydownHandler = function (minPicture, bigPicture) {
      minPicture.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE || evt.keyCode === SPACE_KEYCODE) {
          renderFullPhoto(bigPicture);
          openElementWindow(fullPhoto, onFullPhotoEscPress);
        }
      });
    };

    for (var i = 0; i < minPictures.length; i++) {
      addMinPictureClickHandler(minPictures[i], userPhotos[i]);
      addMinPictureKeydownHandler(minPictures[i], userPhotos[i]);
    }

    closeFullPhoto.addEventListener('click', function () {
      closeElementWindow(fullPhoto, onFullPhotoEscPress);
    });

    closeFullPhoto.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE || evt.keyCode === SPACE_KEYCODE) {
        closeElementWindow(fullPhoto, onFullPhotoEscPress);
      }
    });
  };
  addMinPictureAndFullPhotoHandlers();

  // -------------------------------------------------------------------------------------------------------

  var addFormEditingHandlers = function () {
    var imageUploadInput = usersPhotosBlock.querySelector('#upload-file');
    var closeFormEditing = formEditing.querySelector('#upload-cancel');

    var onFormImageEditingEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        imageUploadInput.value = '';
        closeElementWindow(formEditing, onFormImageEditingEscPress);
      }
    };

    imageUploadInput.addEventListener('change', function () {
      openElementWindow(formEditing, onFormImageEditingEscPress);
    });

    closeFormEditing.addEventListener('click', function () {
      closeElementWindow(formEditing, onFormImageEditingEscPress);
    });

    closeFormEditing.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE || evt.keyCode === SPACE_KEYCODE) {
        closeElementWindow(formEditing, onFormImageEditingEscPress);
      }
    });
  };
  addFormEditingHandlers();

  // -------------------------------------------------------------------------------------------------------

  var addRadioAndSliderPinHandlers = function () {
    var MAX_WIDTH = 100;
    var MAX_VALUE_CHR_AND_SPA = 1;
    var MAX_VALUE_MARVIN = 100;
    var MAX_VALUE_PHOBOS = 5;
    var MAX_VALUE_HEAT = 2;
    var MIN_VALUE_CHR_SPA_MRN_PHS = 0;
    var MIN_VALUE_HEAT = 1;
    var DEFAULT_VALUE = '100%';
    var CLASS_INDEX = 1;
    var effectsRadio = formEditing.querySelectorAll('.effects__radio');
    var effectsPreview = formEditing.querySelectorAll('.effects__preview');
    var effectLevelInput = formEditing.querySelector('.effect-level__value');
    var slider = formEditing.querySelector('.effect-level__line');
    var sliderPin = formEditing.querySelector('.effect-level__pin');
    var sliderDepth = formEditing.querySelector('.effect-level__depth');
    var positionPin = getComputedStyle(sliderPin).left;

    var addEffectRadioFocusHandler = function (radio, effectClass) {
      radio.addEventListener('focus', function () {
        imagePreview.style.filter = '';
        imagePreview.className = '';
        imagePreview.classList.toggle(effectClass);
        effectLevelInput.value = DEFAULT_VALUE;
        // sliderDepth.style.width = DEFAULT_VALUE;
        // sliderPin.style.left = DEFAULT_VALUE;
        // positionPin = sliderPin.style.left;
        if (effectClass === 'effects__preview--none') {
          slider.classList.add('hidden');
        } else {
          slider.classList.remove('hidden');
        }
      });
    };

    for (var i = 0; i < effectsRadio.length; i++) {
      addEffectRadioFocusHandler(effectsRadio[i], effectsPreview[i].classList[CLASS_INDEX]);
    }

    var calculatesFilterValue = function (maxValue, minValue) {
      var currentFilterValue = ((maxValue * parseInt(positionPin, 10)) / MAX_WIDTH) + minValue;
      return currentFilterValue;
    };

    var onSliderPinMouseUp = function () {
      if (imagePreview.classList.contains(effectsPreview[0].classList[CLASS_INDEX])) {
        imagePreview.style.filter = '';
      } else if (imagePreview.classList.contains(effectsPreview[1].classList[CLASS_INDEX])) {
        effectLevelInput.value = positionPin;
        imagePreview.style.filter = 'grayscale(' + calculatesFilterValue(MAX_VALUE_CHR_AND_SPA, MIN_VALUE_CHR_SPA_MRN_PHS) + ')';
      } else if (imagePreview.classList.contains(effectsPreview[2].classList[CLASS_INDEX])) {
        effectLevelInput.value = positionPin;
        imagePreview.style.filter = 'sepia(' + calculatesFilterValue(MAX_VALUE_CHR_AND_SPA, MIN_VALUE_CHR_SPA_MRN_PHS) + ')';
      } else if (imagePreview.classList.contains(effectsPreview[3].classList[CLASS_INDEX])) {
        effectLevelInput.value = positionPin;
        imagePreview.style.filter = 'invert(' + calculatesFilterValue(MAX_VALUE_MARVIN, MIN_VALUE_CHR_SPA_MRN_PHS) + '%)';
      } else if (imagePreview.classList.contains(effectsPreview[4].classList[CLASS_INDEX])) {
        effectLevelInput.value = positionPin;
        imagePreview.style.filter = 'blur(' + calculatesFilterValue(MAX_VALUE_PHOBOS, MIN_VALUE_CHR_SPA_MRN_PHS) + 'px)';
      } else if (imagePreview.classList.contains(effectsPreview[5].classList[CLASS_INDEX])) {
        effectLevelInput.value = positionPin;
        imagePreview.style.filter = 'brightness(' + calculatesFilterValue(MAX_VALUE_HEAT, MIN_VALUE_HEAT) + ')';
      }
    };

    sliderPin.addEventListener('mouseup', onSliderPinMouseUp);
  };
  addRadioAndSliderPinHandlers();

  // -------------------------------------------------------------------------------------------------------

  var addScaleHandlers = function () {
    var SCALE_STEP = 25;
    var MAX_SCALE = 100;
    var MIN_SCALE = 25;
    var SCALE_CONVERSION = 100;
    var scaleSmaller = formEditing.querySelector('.scale__control--smaller');
    var scaleBigger = formEditing.querySelector('.scale__control--bigger');
    var scaleValueInput = formEditing.querySelector('.scale__control--value');

    scaleValueInput.value = '100%';

    var zoomsOut = function () {
      var currentScale = parseInt(scaleValueInput.value, 10);
      if (currentScale > MIN_SCALE) {
        currentScale -= SCALE_STEP;
        scaleValueInput.value = currentScale + '%';
        imagePreview.style.transform = 'scale(' + (currentScale / SCALE_CONVERSION) + ')';
      }
    };

    var zoomsIn = function () {
      var currentScale = parseInt(scaleValueInput.value, 10);
      if (currentScale < MAX_SCALE) {
        currentScale += SCALE_STEP;
        scaleValueInput.value = currentScale + '%';
        imagePreview.style.transform = 'scale(' + (currentScale / SCALE_CONVERSION) + ')';
      }
    };

    scaleSmaller.addEventListener('click', function () {
      zoomsOut();
    });

    scaleBigger.addEventListener('click', function () {
      zoomsIn();
    });
  };
  addScaleHandlers();

  // -------------------------------------------------------------------------------------------------------

  var addHandlerAndCheckValidation = function () {
    var MAX_QUANTITY_HASHTAGS = 5;
    var MAX_LENGTH_HASHTAG = 20;
    var MAX_LENGTH_COMMENT = 140;
    var FIRST_SYMBOL = '#';
    var MIN_QUANTITY_SYMBOLS = 2;
    var COMMA = ',';
    var SPACE = '';
    var hashtagsInput = formEditing.querySelector('.text__hashtags');
    var commentsInput = formEditing.querySelector('.text__description');

    hashtagsInput.addEventListener('change', function () {
      var hashtagString = hashtagsInput.value;
      var hashtags = hashtagString.split(' ');
      var flag = false;

      for (var i = 0; i < hashtags.length; i++) {
        if ((hashtags[i][hashtags[i].length - 1] === COMMA) || (hashtags[i] === COMMA && hashtags[i][0] === COMMA) || (hashtags[i] === SPACE)) {
          hashtagsInput.setCustomValidity('Хеш-теги разделяются одним пробелом, запятая не используеться');
          break;
        } else if (hashtags[i][0] !== FIRST_SYMBOL) {
          hashtagsInput.setCustomValidity('Хэш-тег должен начинатся с символа # (решётка)');
          break;
        } else if (hashtags[i].length < MIN_QUANTITY_SYMBOLS) {
          hashtagsInput.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
          break;
        } else if (hashtags[i].length > MAX_LENGTH_HASHTAG) {
          hashtagsInput.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
          break;
        } else if ((i === hashtags.length - 1) && (hashtags.length > MAX_QUANTITY_HASHTAGS)) {
          hashtagsInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
          break;
        } else if (i === hashtags.length - 1) {
          for (var j = 0; j < hashtags.length - 1; j++) {
            if (flag) {
              break;
            }
            for (var k = j + 1; k < hashtags.length; k++) {
              if (hashtags[j].toLowerCase() === hashtags[k].toLowerCase()) {
                hashtagsInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды, теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом');
                flag = true;
                break;
              }
            }
          }
        } else {
          hashtagsInput.setCustomValidity('');
        }
      }
    });

    hashtagsInput.addEventListener('keydown', function (evt) {
      evt.stopPropagation();
    });

    commentsInput.addEventListener('change', function () {
      if (commentsInput.value.length > MAX_LENGTH_COMMENT) {
        commentsInput.setCustomValidity('Длина комментария не может составлять больше 140 символов');
      } else {
        commentsInput.setCustomValidity('');
      }
    });

    commentsInput.addEventListener('keydown', function (evt) {
      evt.stopPropagation();
    });


  };
  addHandlerAndCheckValidation();
};
addHandlers();

