'use strict';

var collapseTree = require('backside-utils/lib/collapseTree');

function DataSnapshot(data, name) {
  this._data = data;
  this._name = name;
}

DataSnapshot.prototype.val = function val() {
  return collapseTree(this._data);
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