'use strict';

(function () {
  var MAX_QUANTITY_HASHTAGS = 5;
  var MAX_LENGTH_HASHTAG = 20;
  var MAX_LENGTH_COMMENT = 140;
  var FIRST_SYMBOL = '#';
  var MIN_QUANTITY_SYMBOLS = 2;
  var COMMA = ',';
  var SPACE = '';
  var BORDER = 'box-shadow: 0 0 8px 4px rgba(255, 0, 0, 0.8)';
  var hashtagsInput = window.form.container.querySelector('.text__hashtags');
  var commentsInput = window.form.container.querySelector('.text__description');
  window.formValidation = {
    hashtagsInput: hashtagsInput,
    commentsInput: commentsInput,
    setValidation: function (input, text, styleProperty) {
      input.setCustomValidity(text);
      input.style = styleProperty;
    }
  };

  var addStopPropagation = function (event, element) {
    element.addEventListener(event, function (evt) {
      evt.stopPropagation();
    });
  };

  hashtagsInput.addEventListener('input', function () {
    var hashtagString = hashtagsInput.value;
    var hashtags = hashtagString.split(' ');
    var flag = true;

    for (var i = 0; i < hashtags.length; i++) {
      var lastSymbol = hashtags[i][hashtags[i].length - 1];
      hashtags[i] = hashtags[i].toLowerCase();
      if ((lastSymbol === COMMA) || (hashtags[i] === COMMA) || (hashtags[i] === SPACE)) {
        window.formValidation.setValidation(hashtagsInput, 'Хеш-теги разделяются только одним пробелом, запятые не используеться', BORDER);
        flag = false;
        break;
      } else if (hashtags[i][0] !== FIRST_SYMBOL) {
        window.formValidation.setValidation(hashtagsInput, 'Хэш-тег должен начинатся с символа # (решётка)', BORDER);
        flag = false;
        break;
      } else if (hashtags[i].length < MIN_QUANTITY_SYMBOLS) {
        window.formValidation.setValidation(hashtagsInput, 'Хеш-тег не может состоять только из одной решётки', BORDER);
        flag = false;
        break;
      } else if (hashtags[i].length > MAX_LENGTH_HASHTAG) {
        window.formValidation.setValidation(hashtagsInput, 'Максимальная длина одного хэш-тега 20 символов, включая решётку', BORDER);
        flag = false;
        break;
      } else if (hashtags.length > MAX_QUANTITY_HASHTAGS) {
        window.formValidation.setValidation(hashtagsInput, 'Нельзя указать больше пяти хэш-тегов', BORDER);
        flag = false;
        break;
      } else {
        for (var j = 0; j < hashtags.length - 1; j++) {
          var checkedString = hashtags[j];
          if (hashtags.includes(checkedString, j + 1)) {
            window.formValidation.setValidation(hashtagsInput, 'Один и тот же хэш-тег не может быть использован дважды, теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом', BORDER);
            flag = false;
            break;
          }
        }
      }

      if (flag) {
        window.formValidation.setValidation(hashtagsInput, '', '');
        hashtagsInput.setCustomValidity('');
        hashtagsInput.style = '';
      }
    }
  });

  addStopPropagation('keydown', hashtagsInput);

  commentsInput.addEventListener('input', function () {
    if (commentsInput.value.length > MAX_LENGTH_COMMENT) {
      window.formValidation.setValidation(commentsInput, 'Длина комментария не может составлять больше 140 символов', BORDER);
    } else {
      window.formValidation.setValidation(commentsInput, '', '');
    }
  });

  addStopPropagation('keydown', commentsInput);
})();
