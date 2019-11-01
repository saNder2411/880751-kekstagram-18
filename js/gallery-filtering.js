'use strict';

(function () {
  var LENGTH = 10;
  var buttonsControl = window.gallery.filtersContainer.querySelectorAll('.img-filters__button');
  var photos = [];
  var filteredPhotos;
  var filterMap = {
    'default': function () {
      filteredPhotos = photos;
      window.gallery.renderPhotos(filteredPhotos);
    },
    'filter-random': function () {
      filteredPhotos = photos
        .slice()
        .sort(function () {
          return Math.random() - 0.5;
        })
        .slice(0, LENGTH);
      window.gallery.renderPhotos(filteredPhotos);
    },
    'filter-discussed': function () {
      filteredPhotos = photos
        .slice()
        .sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });
      window.gallery.renderPhotos(filteredPhotos);
    }
  };

  var debounceFilter = window.debounce(function (filter) {
    var useFilter = filterMap[filter] || filterMap['default'];
    useFilter();
  });

  var onFilterChange = function (evt) {
    var target = evt.target;
    if (target.classList.contains('img-filters__button')) {
      buttonsControl.forEach(function (btn) {
        btn.classList.remove('img-filters__button--active');
      });
      target.classList.add('img-filters__button--active');
      debounceFilter(target.id);
    }
  };

  window.gallery.filtersContainer.addEventListener('click', onFilterChange);

  var successHandler = function (photosData) {
    photos = photosData;
    filterMap['default']();
  };

  var errorHandler = function (errorMessage) {
    window.popups.showError(errorMessage);
  };

  window.backend.load(successHandler, errorHandler);
})();
