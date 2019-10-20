'use strict';

(function () {
  var MAX_QUANTITY_HASHTAGS = 5;
  var MAX_LENGTH_HASHTAG = 20;
  var MAX_LENGTH_COMMENT = 140;
  var FIRST_SYMBOL = '#';
  var MIN_QUANTITY_SYMBOLS = 2;
  var COMMA = ',';
  var SPACE = '';
  var hashtagsInput = window.form.formEditing.querySelector('.text__hashtags');
  var commentsInput = window.form.formEditing.querySelector('.text__description');

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
