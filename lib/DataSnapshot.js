'use strict';

function stripExtra(data) {
  if (Object.prototype.toString.call(data) !== '[object Object]') {
    return data;
  }

  var ret = {};

  for (var p in data) {
    ret[p] = stripExtra(data[p].value);
  }

  return ret;
}

function DataSnapshot(data, name) {
  this._data = data;
  this._name = name;
}

DataSnapshot.prototype.val = function val() {
  return stripExtra(this._data);
};

DataSnapshot.prototype.child = function child() {
  // TODO
};

DataSnapshot.prototype.forEach = function forEach() {
  // TODO
};

DataSnapshot.prototype.hasChild = function hasChild() {
  // TODO
};

DataSnapshot.prototype.hasChildren = function hasChildren() {
  // TODO
};

DataSnapshot.prototype.name = function name() {
  return this._name || null;
};

DataSnapshot.prototype.numChildren = function numChildren() {
  // TODO
};

DataSnapshot.prototype.ref = function ref() {
  // TODO
};

DataSnapshot.prototype.getPriority = function getPriority() {
  // TODO
};

DataSnapshot.prototype.exportVal = function exportVal() {
  // TODO
};


module.exports = DataSnapshot;