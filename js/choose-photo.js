'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var effectThumbnails = window.form.container.querySelectorAll('.effects__preview');

  window.form.imageUploadInput.addEventListener('change', function () {
    var file = window.form.imageUploadInput.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (matches) {
        var reader = new FileReader();

        var onReaderLoad = function () {
          window.form.imagePreview.src = reader.result;
          effectThumbnails.forEach(function (thumbnail) {
            thumbnail.style = 'background-image: url(' + reader.result + ')';
          });
        };

        reader.addEventListener('load', onReaderLoad);

        reader.readAsDataURL(file);
      }
    }
  });
})();
