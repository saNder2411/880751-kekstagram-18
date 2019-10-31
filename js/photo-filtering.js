'use strict';

(function () {
  var buttonsControl = window.gallery.filtersContainer.querySelectorAll('.img-filters__button');
  var photos = [];
  var Id = {
    RANDOM: 'filter-random',
    DISCUSSED: 'filter-discussed'
  };
  var LENGTH = 10;

  window.gallery.filtersContainer.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.classList.contains('img-filters__button')) {
      buttonsControl.forEach(function (btn) {
        btn.classList.remove('img-filters__button--active');
      });
      target.classList.add('img-filters__button--active');
      filterPhotos(target.id);
    }
  });

  var filterPhotos = function (filter) {
    var filteredPhotos;
    switch (filter) {
      case Id.RANDOM:
        filteredPhotos = photos
          .slice()
          .sort(function () {
            return Math.random() - 0.5;
          })
          .slice(0, LENGTH);
        window.gallery.renderPhotos(filteredPhotos);
        break;
      case Id.DISCUSSED:
        filteredPhotos = photos
          .slice()
          .sort(function (a, b) {
            return b.comments.length - a.comments.length;
          });
        window.gallery.renderPhotos(filteredPhotos);
        break;
      default:
        filteredPhotos = photos;
        window.gallery.renderPhotos(filteredPhotos);
    }
  };

  var successHandler = function (photosData) {
    photos = photosData;
    filterPhotos();
  };

  var errorHandler = function (errorMessage) {
    window.popups.showError(errorMessage);
  };

  window.backend.load(successHandler, errorHandler);
})();
