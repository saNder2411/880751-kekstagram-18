'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  window.form.imageUploadInput.addEventListener('change', function () {
    var file = window.form.imageUploadInput.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          window.form.imagePreview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  });
})();
