(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define('colority', factory) :
	(global.colority = factory());
}(this, (function () { 'use strict';

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function preload(imageURLs, done) {
    var images = [];
    var count = 0;
    imageURLs = (typeof imageURLs === 'undefined' ? 'undefined' : _typeof$1(imageURLs)) != 'object' ? [imageURLs] : imageURLs;

    imageURLs.length === 0 && done(images);

    imageURLs.map(function (imageURL) {
        var image = new Image();
        image.crossOrigin = '*';
        image.src = imageURL;
        image.addEventListener('load', imageOnLoad);
        image.addEventListener('error', imageOnLoad);
        images.push(image);
    });

    function imageOnLoad() {
        count++;
        if (count == imageURLs.length) done(images);
    }
}

function getContext() {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas.getContext('2d');
}

function transformColors(data, skip, callback) {
    for (var i = 0; i < data.length; i += 4 * skip) {
        callback('rgb(' + data[i] + ',' + data[i + 1] + ',' + data[i + 2] + ')');
    }
}

function mapColors(data, callback) {
    for (var key in data) {
        callback(key, data[key]);
    }
}

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function colority() {
    var _this = this;

    if (!(this instanceof colority)) return new (Function.prototype.bind.apply(colority, [null].concat(Array.prototype.slice.call(arguments))))();

    var argument = [].concat(Array.prototype.slice.call(arguments));
    this.imageURL = '';
    this.options = {};
    this.callback = function () {};

    if (typeof argument[0] === 'string') {
        this.imageURL = argument[0];
        if (typeof argument[2] === 'function') {
            this.callback = argument[2];
            this.options = _typeof(argument[1]) == 'object' ? argument[1] : this.options;
        } else {
            this.callback = typeof argument[1] == 'function' ? argument[1] : this.callback;
        }
    } else {
        console.log('first param in "colority()" must be string.');
    }

    preload(this.imageURL, function (_ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            image = _ref2[0];

        var context = getContext(image.naturalWidth, image.naturalHeight);
        context.drawImage(image, 0, 0);
        var imageData = context.getImageData(0, 0, image.naturalWidth, image.naturalHeight).data;
        var colors = {};
        var results = [];

        transformColors(imageData, _this.options.skip || 10, function (rgb) {
            return colors[rgb] = rgb in colors ? colors[rgb] + 1 : 1;
        });
        mapColors(colors, function (key, value) {
            results.push({
                color: key,
                count: value
            });
        });
        _this.callback(results.sort(function (a, b) {
            return b.count - a.count;
        }).map(function (result) {
            return result.color;
        }));
    });
}

return colority;

})));
//# sourceMappingURL=colority.js.map
