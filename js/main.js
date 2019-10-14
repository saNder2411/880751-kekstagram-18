'use strict';

// data.js-----------------------------------------------------------------------------------------------------------
(function () {
  var MESSAGES = ['Всё отлично!',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var AUTHORS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var PHOTOS_DESCRIPTIONS = ['Бухта', 'Тропинка', 'Остров', 'Девушка', 'Суп', 'Спорткар', 'Клубника', 'Сок',
    'Самолет', 'Обувь', 'Песок', 'Ауди', 'Салат', 'Кот', 'Уги', 'Высота', 'Хор', 'Ретро', 'Тапки', 'Пальмы',
    'Блюдо', 'Закат', 'Краб', 'Концерт', 'Джунгли'];

  window.data = {
    MESSAGES: MESSAGES,
    AUTHORS_NAMES: AUTHORS_NAMES,
    PHOTOS_DESCRIPTIONS: PHOTOS_DESCRIPTIONS
  };
})();

// ---------------------------------------------------------------------------------------------------------------------------

// util.js ---------------------------------------------------------------------------------------------------
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var SPACE_KEYCODE = 32;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterAndSpaceEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE || evt.keyCode === SPACE_KEYCODE) {
        action();
      }
    },
    getRandomNumberFromPeriod: function (min, max) {
      var randomNumber = min + Math.random() * (max + 1 - min);
      return Math.floor(randomNumber);
    }
  };
})();


// ---------------------------------------------------------------------------------------------------------------------------

// gallery.js ------------------------------------------------------------------------------------------
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

// thumbnails.js -------------------------------------------------------------------------------

(function () {
  window.blockUserPhotos = document.querySelector('.pictures');
  var thumbnailTemplate =
    document.querySelector('#picture')
      .content
      .querySelector('.picture');

  var generateThumbnailTemplate = function (photoData) {
    var template = thumbnailTemplate.cloneNode(true);

    template.querySelector('.picture__img').src = photoData.url;
    template.querySelector('.picture__likes').textContent = photoData.likes;
    template.querySelector('.picture__comments').textContent = photoData.comments.length;

    return template;
  };

  var renderThumbnails = function (thumbnailsData) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < thumbnailsData.length; i++) {
      fragment.appendChild(generateThumbnailTemplate(thumbnailsData[i]));
    }

    window.blockUserPhotos.appendChild(fragment);
  };
  renderThumbnails(window.photosData);
})();

// -----------------------------------------------------------------------------------------------

// full-photo.js --------------------------------------------------------------

(function () {
  var fullPhoto = document.querySelector('.big-picture');
  var fullPhotoClose = fullPhoto.querySelector('.big-picture__cancel');
  var createdThumbnails = window.blockUserPhotos.querySelectorAll('.picture');

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

// -------------------------------------------------------------------------------------------------------

// form.js ---------------------------------------------------------------------------

(function () {
  var DEFAULT_VALUE = '100%';
  var imageUploadInput = window.blockUserPhotos.querySelector('#upload-file');
  window.formEditing = window.blockUserPhotos.querySelector('.img-upload__overlay');
  var imagePreview = window.formEditing.querySelector('.img-upload__preview img');
  var scaleValueInput = window.formEditing.querySelector('.scale__control--value');
  var slider = window.formEditing.querySelector('.effect-level');
  var formEditingClose = window.formEditing.querySelector('#upload-cancel');
  var effectRadioOriginal = window.formEditing.querySelector('.effects__radio:checked').value === 'none';

  var onFormEditingEscPress = function (evt) {
    window.util.isEscEvent(evt, hideFormEditing);
    imageUploadInput.value = '';
  };

  var showFormEditing = function () {
    window.formEditing.classList.remove('hidden');
    document.addEventListener('keydown', onFormEditingEscPress);
  };

  var hideFormEditing = function () {
    window.formEditing.classList.add('hidden');
    document.removeEventListener('keydown', onFormEditingEscPress);
  };

  imageUploadInput.addEventListener('change', function () {
    showFormEditing();
    if (effectRadioOriginal) {
      slider.classList.add('hidden');
    }
    imagePreview.style = '';
    scaleValueInput.value = DEFAULT_VALUE;
  });

  formEditingClose.addEventListener('click', function () {
    hideFormEditing();
  });

  formEditingClose.addEventListener('keydown', function (evt) {
    window.util.isEnterAndSpaceEvent(evt, hideFormEditing);
  });
})();

// ------------------------------------------------------------------------------------------

// form-editing-photo.js----------------------------------------------------------

(function () {
  var MAX_WIDTH = 100;
  var DEFAULT_VALUE = '100%';
  var imagePreview = window.formEditing.querySelector('.img-upload__preview img');
  var effectsRadio = window.formEditing.querySelectorAll('.effects__radio');
  var effectLevelInput = window.formEditing.querySelector('.effect-level__value');
  var sliderPin = window.formEditing.querySelector('.effect-level__pin');
  var slider = window.formEditing.querySelector('.effect-level');
  var sliderDepth = window.formEditing.querySelector('.effect-level__depth');
  var positionPin = getComputedStyle(sliderPin).left;
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

  var onSliderPinMouseDown = function () {
    var activeEffect = window.formEditing.querySelector('.effects__radio:checked').value;
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

  sliderPin.addEventListener('mouseup', onSliderPinMouseDown);
})();

// zoom-photo.js-----------------------------------------------------------------------------------

(function () {
  var SCALE_STEP = 25;
  var MAX_SCALE = 100;
  var MIN_SCALE = 25;
  var SCALE_CONVERSION = 100;
  var imagePreview = window.formEditing.querySelector('.img-upload__preview img');
  var scaleValueInput = window.formEditing.querySelector('.scale__control--value');
  var scaleOut = window.formEditing.querySelector('.scale__control--smaller');
  var scaleIn = window.formEditing.querySelector('.scale__control--bigger');

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
})();

// form-validation.js---------------------------------------------------

(function () {
  var MAX_QUANTITY_HASHTAGS = 5;
  var MAX_LENGTH_HASHTAG = 20;
  var MAX_LENGTH_COMMENT = 140;
  var FIRST_SYMBOL = '#';
  var MIN_QUANTITY_SYMBOLS = 2;
  var COMMA = ',';
  var SPACE = '';
  var hashtagsInput = window.formEditing.querySelector('.text__hashtags');
  var commentsInput = window.formEditing.querySelector('.text__description');

  var addStopPropagation = function (event, element) {
    element.addEventListener(event, function (evt) {
      evt.stopPropagation();
    });
  };

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

  addStopPropagation('keydown', hashtagsInput);

  commentsInput.addEventListener('input', function () {
    if (commentsInput.value.length > MAX_LENGTH_COMMENT) {
      commentsInput.setCustomValidity('Длина комментария не может составлять больше 140 символов');
    } else {
      commentsInput.setCustomValidity('');
    }
  });

  addStopPropagation('keydown', commentsInput);
})();

