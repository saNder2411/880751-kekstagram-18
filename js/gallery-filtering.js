'use strict';

(function () {
  var LENGTH = 10;
  var buttonsControl = window.gallery.filtersContainer.querySelectorAll('.img-filters__button');
  var photos = [];
  var filteredPhotos;
  var Filter = {
    'default': window.debounce(function () {
      filteredPhotos = photos;
      window.gallery.renderPhotos(filteredPhotos);
    }),
    'filter-random': window.debounce(function () {
      filteredPhotos = photos
        .slice()
        .sort(function () {
          return Math.random() - 0.5;
        })
        .slice(0, LENGTH);
      window.gallery.renderPhotos(filteredPhotos);
    }),
    'filter-discussed': window.debounce(function () {
      filteredPhotos = photos
        .slice()
        .sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });
      window.gallery.renderPhotos(filteredPhotos);
    })
  };

  window.gallery.filtersContainer.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.classList.contains('img-filters__button')) {
      buttonsControl.forEach(function (btn) {
        btn.classList.remove('img-filters__button--active');
      });
      target.classList.add('img-filters__button--active');
      var useFilter = Filter[target.id] || Filter['default'];
      useFilter();
    }
  });

  var successHandler = function (photosData) {
    photos = photosData;
    Filter['default']();
  };

  var errorHandler = function (errorMessage) {
    window.popups.showError(errorMessage);
  };

  window.backend.load(successHandler, errorHandler);
})();
