'use strict';

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';

  window.load = function (data, method, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else if (onError) {
        var error;
        switch (xhr.status) {
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
        onError(error);
      }
    });

    if (onError) {
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
    }

    xhr.timeout = 10000;

    var url = (method === 'GET') ? URL_LOAD : URL_UPLOAD;
    xhr.open(method, url);

    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };
})();
