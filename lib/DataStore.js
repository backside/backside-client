'use strict';

var DataSnapshot = require('./DataSnapshot');

function DataStore(name) {
  this._data = null;
  this._name = name;
}

DataStore.prototype.set = function set(path, value) {
  if (!path.length) {
    return this._setRoot(value);
  }

  var start = this._data || {};
  for (var i = 0; i < path.length-2; i++) {
    var p = path[i];
    start[p] = start[p] || {};
    start = start[p];
  }

  if (value == null) {
    delete start[path[path.length-1]];
  } else {
    start[path[path.length-1]] = {value: value.value};
  }

  this._data = start;
};

DataStore.prototype.remove = function remove(path) {
  this.set(path, null);
};

DataStore.prototype.snapshot = function snapshot() {
  return new DataSnapshot(this._data, this._name);
};

DataStore.prototype._setRoot = function _setRoot(value) {
  var old = this._data;
  this._data = value;

  var oldChildren = {};

  for (var child in old) {
    oldChildren[child] = true;
  }

  var newChildren = [];

  for (child in value) {
    if (!oldChildren[child]) {
      newChildren.push(child);
    } else {
      delete oldChildren[child];
    }
  }

  return {
    removed: Object.keys(oldChildren),
    added: newChildren
  };

};

module.exports = DataStore;