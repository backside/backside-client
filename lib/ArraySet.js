'use strict';

function ArraySet() {
  this._items = [];
}

ArraySet.prototype.add = function add(item) {
  if (this._items.indexOf(item) > -1) {
    return false;
  }
  this._items.push(item);
  return true;
};

ArraySet.prototype.remove = function remove(item) {
  var index = this._items.indexOf(item);
  if (index === -1) {
    return false;
  }
  this._items.splice(index, 1);
  return true;
};

ArraySet.prototype.has = function has(item) {
  return this._items.indexOf(item) > -1;
};

ArraySet.prototype.forEach = function forEach(fn) {
  return this._items.forEach(fn);
};

ArraySet.prototype.empty = function empty() {
  this._items.length = 0;
};

module.exports = ArraySet;