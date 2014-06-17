'use strict';

var url = require('url');
var ArraySet = require('./ArraySet');
var util = require('./util');
var connectionManager = require('./connectionManager');
var DataSnapshot = require('./DataSnapshot');

var validEvents = ['value'/*, 'child_added', 'child_removed', 'child_changed', 'child_moved'*/];
var validEventErr = new Error('First argument must be a valid event type ("' + validEvents.join('", "') + '").');

function pathSplit(path) { return path.split('/').filter(function(p) { return p.length > 0; }); }

function Backside(clientOrUrl, path) {
  this._data = {};

  if (util.isString(clientOrUrl)) {
    var urlInfo = url.parse(clientOrUrl);
    path = urlInfo.pathname || '/';
    this._connection = connectionManager.fromUrl(urlInfo.protocol, urlInfo.host);
  } else if (util.isObject(clientOrUrl)) {
    this._connection = clientOrUrl;
  } else {
    throw new Error('');
  }

  if (util.isArray(path)) {
    this._pathArray = path;
  } else {
    this._pathArray = pathSplit(path);
  }
    
  this._path = '/' + this._pathArray.join('/');
}

Backside.prototype.child = function(relativePath) {
  relativePath = pathSplit(relativePath);
  return new Backside(this._connection, this._pathArray.concat(relativePath));
};

Backside.prototype.parent = function() {
  return new Backside(this._connection, this._pathArray.slice(0, this._pathArray.length-1));
};

Backside.prototype.set = function(value) {
  this._connection.send(this._path, value);
};

Backside.prototype._subscribeIfNecessary = function _subscribeIfNecessary() {
  if (this._listeners) {
    return;
  }

  this._listeners = {};

  for (var i = validEvents.length - 1; i >= 0; i--) {
    this._listeners[validEvents[i]] = new ArraySet();
  }

  this._connection.subscribe(this._path, this._onUpdate.bind(this));
};

Backside.prototype._onUpdate = function _onUpdate(message) {
  var update = JSON.parse(message.body);
  var relativePath = pathSplit(update.key).slice(this._pathArray.length);

  if (relativePath.length) {
    var start = this._data;
    for (var i = 0; i < relativePath.length-2; i++) {
      var p = relativePath[i];
      start[p] = start[p] || {};
      start = start[p];
    }
    start[relativePath[relativePath.length-1]] = {value: update.message};
  } else {
    this._data = update.message;
  }

  var name = this._pathArray[this._pathArray.length-1] || null;
  
  this._fire('value', new DataSnapshot(this._data, name));
};

/* TODO: Add optional cancelCallback and context parameters */
Backside.prototype.on = function on(e, cb) {
  if (validEvents.indexOf(e) === -1) {
    throw validEventErr;
  } else if (typeof cb !== 'function') {
    throw new Error('Second argument must be a function.');
  }

  this._subscribeIfNecessary();
  this._listeners[e].add(cb);
};

Backside.prototype.off = function on(e, cb) {
  // If no event specified, remove all listeners
  if (e == null) {
    for (e in this._listeners) {
      this._listeners[e].empty();
    }
    return;
  }
  
  if (validEvents.indexOf(e) === -1) {
    throw validEventErr;
  }

  var listeners = this._listeners[e];

  // If no cb, remove all listeners for the specified event type
  if (cb == null) {
    listeners.empty();
    return;
  }

  listeners.remove(cb);
};

Backside.prototype._fire = function _fire(e, data) {
  this._listeners[e].forEach(function(fn) {
    fn(data);
  });
};

/*

child
limit
name
off
on
once
onDisconnect
parent
path
push
remove
removeOnDisconnect
root
set
setOnDisconnect
setPriority
setWithPriority
update

*/

module.exports = Backside;