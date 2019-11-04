'use strict';

(function () {
  window.sliderCoordinate = {
    SliderArea: function (left, top, right, bottom) {
      this.left = left;
      this.top = top;
      this.right = right;
      this.bottom = bottom;
    },

    Coordinate: function (x, y, constraints) {
      this.x = x;
      this.y = y;
      this._constraints = constraints;
    }
  };

  window.sliderCoordinate.Coordinate.prototype.setX = function (x) {
    if (x >= this._constraints.left && x <= this._constraints.right) {
      this.x = x;
    }
  };

  window.sliderCoordinate.Coordinate.prototype.setY = function (y) {
    if (y >= this._constraints.top && y <= this._constraints.bottom) {
      this.y = y;
    }
  };
})();
