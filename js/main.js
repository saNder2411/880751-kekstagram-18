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

// -------------------------------------------------------------------------------------------------------

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var SPACE_KEYCODE = 32;
var formEditing = usersPhotosBlock.querySelector('.img-upload__overlay');

var showElement = function (openElement, onElementEscPress) {
  openElement.classList.remove('hidden');
  document.addEventListener('keydown', onElementEscPress);
};

var hideElement = function (closeElement, onElementEscPress) {
  closeElement.classList.add('hidden');
  document.removeEventListener('keydown', onElementEscPress);
};

var addSmallPhotoAndFullPhotoHandlers = function () {
  var closeFullPhoto = fullPhoto.querySelector('.big-picture__cancel');
  var smallPhotos = usersPhotosBlock.querySelectorAll('.picture');

  var onFullPhotoEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      hideElement(fullPhoto, onFullPhotoEscPress);
    }
  };

  var addMinPictureClickHandler = function (smallPhoto, bigPicture) {
    smallPhoto.addEventListener('click', function () {
      renderFullPhoto(bigPicture);
      showElement(fullPhoto, onFullPhotoEscPress);
    });
  };

  var addMinPictureKeydownHandler = function (smallPhoto, bigPicture) {
    smallPhoto.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE || evt.keyCode === SPACE_KEYCODE) {
        renderFullPhoto(bigPicture);
        showElement(fullPhoto, onFullPhotoEscPress);
      }
    });
  };

  for (var i = 0; i < smallPhotos.length; i++) {
    addMinPictureClickHandler(smallPhotos[i], userPhotos[i]);
    addMinPictureKeydownHandler(smallPhotos[i], userPhotos[i]);
  }

  closeFullPhoto.addEventListener('click', function () {
    hideElement(fullPhoto, onFullPhotoEscPress);
  });

  closeFullPhoto.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE || evt.keyCode === SPACE_KEYCODE) {
      hideElement(fullPhoto, onFullPhotoEscPress);
    }
  });
};
addSmallPhotoAndFullPhotoHandlers();

// -------------------------------------------------------------------------------------------------------

var addFormEditingHandlers = function () {
  var MAX_WIDTH = 100;
  var DEFAULT_VALUE = '100%';
  var SCALE_STEP = 25;
  var MAX_SCALE = 100;
  var MIN_SCALE = 25;
  var SCALE_CONVERSION = 100;
  var imagePreview = formEditing.querySelector('.img-upload__preview img');
  var imageUploadInput = usersPhotosBlock.querySelector('#upload-file');
  var closeFormEditing = formEditing.querySelector('#upload-cancel');
  var effectsRadio = formEditing.querySelectorAll('.effects__radio');
  var effectLevelInput = formEditing.querySelector('.effect-level__value');
  var slider = formEditing.querySelector('.effect-level');
  var sliderPin = formEditing.querySelector('.effect-level__pin');
  var sliderDepth = formEditing.querySelector('.effect-level__depth');
  var positionPin = getComputedStyle(sliderPin).left;
  var effectRadioOriginal = formEditing.querySelector('.effects__radio:checked').value === 'none';
  var scaleOut = formEditing.querySelector('.scale__control--smaller');
  var scaleIn = formEditing.querySelector('.scale__control--bigger');
  var scaleValueInput = formEditing.querySelector('.scale__control--value');
  var effects = {
    chrome: {
      min: 0,
      max: 1,
      filterType: 'grayscale',
      unit: ''
    },
    sepia: {
      min: 0,
      max: 1,
      filterType: 'sepia',
      unit: ''
    },
    marvin: {
      min: 0,
      max: 100,
      filterType: 'invert',
      unit: '%'
    },
    phobos: {
      min: 0,
      max: 5,
      filterType: 'blur',
      unit: 'px'
    },
    heat: {
      min: 1,
      max: 2,
      filterType: 'brightness',
      unit: ''
    }
  };

  var onFormImageEditingEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      imageUploadInput.value = '';
      hideElement(formEditing, onFormImageEditingEscPress);
    }
  };

  imageUploadInput.addEventListener('change', function () {
    showElement(formEditing, onFormImageEditingEscPress);
    if (effectRadioOriginal) {
      slider.classList.add('hidden');
    }
    imagePreview.style = '';
    scaleValueInput.value = DEFAULT_VALUE;
  });

  closeFormEditing.addEventListener('click', function () {
    hideElement(formEditing, onFormImageEditingEscPress);
  });

  closeFormEditing.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE || evt.keyCode === SPACE_KEYCODE) {
      hideElement(formEditing, onFormImageEditingEscPress);
    }
  });


  var addEffectRadioFocusHandler = function (radio) {
    radio.addEventListener('change', function () {
      var effectName = radio.value;
      imagePreview.style.filter = '';
      imagePreview.className = '';
      imagePreview.classList.toggle('effects__preview--' + effectName);
      effectLevelInput.value = parseInt(DEFAULT_VALUE, 10);
      sliderDepth.style.width = DEFAULT_VALUE;
      sliderPin.style.left = DEFAULT_VALUE;
      positionPin = sliderPin.style.left;
      if (effectName === 'none') {
        slider.classList.add('hidden');
      } else {
        slider.classList.remove('hidden');
      }
    });
  };

  for (var i = 0; i < effectsRadio.length; i++) {
    addEffectRadioFocusHandler(effectsRadio[i]);
  }

  var calculatesFilterValue = function (max, min) {
    var currentFilterValue = ((max * parseInt(positionPin, 10)) / MAX_WIDTH) + min;
    return currentFilterValue;
  };

  var onSliderPinMouseUp = function () {
    var activeEffect = formEditing.querySelector('.effects__radio:checked').value;
    effectLevelInput.value = parseInt(positionPin, 10);
    if (activeEffect === 'none') {
      imagePreview.style.filter = '';
      return;
    }

    var effectSettings = effects[activeEffect];
    var effectMax = effectSettings.max;
    var effectMin = effectSettings.min;
    var effectFilter = effectSettings.filterType;
    var filterUnit = effectSettings.unit;
    imagePreview.style.filter = effectFilter + '(' + calculatesFilterValue(effectMax, effectMin) + filterUnit + ')';
  };

  sliderPin.addEventListener('mouseup', onSliderPinMouseUp);

  var zoom = function (actionType) {
    var currentScale = parseInt(scaleValueInput.value, 10);

    if (actionType === 'out' && currentScale > MIN_SCALE) {
      currentScale -= SCALE_STEP;
    } else if (actionType === 'in' && currentScale < MAX_SCALE) {
      currentScale += SCALE_STEP;
    }

    scaleValueInput.value = currentScale + '%';
    imagePreview.style.transform = 'scale(' + (currentScale / SCALE_CONVERSION) + ')';
  };

  scaleOut.addEventListener('click', function () {
    zoom('out');
  });

  scaleIn.addEventListener('click', function () {
    zoom('in');
  });
};
addFormEditingHandlers();

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

  hashtagsInput.addEventListener('input', function () {
    var hashtagString = hashtagsInput.value;
    var hashtags = hashtagString.split(' ');

    for (var i = 0; i < hashtags.length; i++) {
      hashtags[i] = hashtags[i].toLowerCase();
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
          var checkedString = hashtags[j];
          if (hashtags.includes(checkedString, j + 1)) {
            hashtagsInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды, теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом');
            break;
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

  commentsInput.addEventListener('input', function () {
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


