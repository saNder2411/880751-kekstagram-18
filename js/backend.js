'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var GET_METHOD = 'GET';
  var POST_METHOD = 'POST';
  var OK_STATUS = 200;
  var REQUEST_TIMEOUT = 10000;

  var errorTextMap = {
    300: 'Запрос имеет более одного возможного ответа',
    301: 'URL запрошенного ресурса был изменен навсегда',
    302: 'URI запрашиваемого ресурса был временно изменен',
    400: 'Неверный запрос',
    401: 'Пользователь не авторизован',
    404: 'Ничего не найдено',
    500: 'Сервер не отвечает'
  };

  var createRequest = function (method, url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = REQUEST_TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS) {
        onSuccess(xhr.response);
      } else {
        var error = errorTextMap[xhr.status];
        var defaultError = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
        onError(error || defaultError);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open(method, url);
    return xhr;
  };

  window.backend = {
    load: function (onSuccess, onError) {
      var request = createRequest(GET_METHOD, URL_LOAD, onSuccess, onError);
      request.send();
    },
    upload: function (data, onSuccess, onError) {
      var request = createRequest(POST_METHOD, URL_UPLOAD, onSuccess, onError);
      request.send(data);
    }
  };
})();
