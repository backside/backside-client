'use strict';

var ots = Object.prototype.toString;

module.exports = {
  isString: function isString(s) {
    return typeof s === 'string';
  },
  isArray: function isArray(a) {
    return ots.call(a) === '[object Array]';
  },
  isObject: function isObject(o) {
    return ots.call(o) === '[object Object]';
  }
};