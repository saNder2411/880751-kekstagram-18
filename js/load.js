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
        onError();
      }
    });

    if (onError) {
      xhr.addEventListener('error', function () {
        onError();
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
    }

    var url = (method === 'GET') ? URL_LOAD : URL_UPLOAD;
    xhr.open(method, url);

    // var sendX = (data) ? xhr.send(data) : xhr.send();
    // console.log(sendX);
    // sendX();

    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };
})();
