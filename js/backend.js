'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var GET_METHOD = 'GET';
  var POST_METHOD = 'POST';
  var OK_STATUS = 200;
  var REQUEST_TIMEOUT = 10000;

  var handleSuccessAndErrorStatus = function (xhr, onSuccess, onError) {
    var error;
    switch (xhr.status) {
      case OK_STATUS:
        onSuccess(xhr.response);
        break;
      case 300:
        error = 'Запрос имеет более одного возможного ответа';
        break;
      case 301:
        error = 'URL запрошенного ресурса был изменен навсегда';
        break;
      case 302:
        error = 'URI запрашиваемого ресурса был временно изменен';
        break;
      case 400:
        error = 'Неверный запрос';
        break;
      case 401:
        error = 'Пользователь не авторизован';
        break;
      case 404:
        error = 'Ничего не найдено';
        break;
      case 500:
        error = 'Сервер не отвечает';
        break;

      default:
        error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
    }

    if (error) {
      onError(error);
    }
  };

  var createRequest = function (method, url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = REQUEST_TIMEOUT;

    xhr.addEventListener('load', function () {
      handleSuccessAndErrorStatus(xhr, onSuccess, onError);
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
