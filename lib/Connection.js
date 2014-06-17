'use strict';

var Q = require('q');
var Stomp = require('stompjs/lib/stomp').Stomp;

function Connection(url) {
  var deferredConnection = Q.defer();
  this._connection = deferredConnection.promise;
  
  var ws = new WebSocket(url + '/socks/websocket');
  this.client = window.client = Stomp.over(ws);

  if (process.env.NODE_ENV === 'production') {
    this.client.debug = function() {};
  }

  this.client.connect({}, function() {
    deferredConnection.resolve();
  });
}

Connection.prototype.subscribe = function subscribe(path, cb) {
  var self = this;
  this._connection.then(function() {
    self.client.subscribe(path, cb);
  });
};

Connection.prototype.send = function send(path, val) {
  var self = this;
  this._connection.then(function() {
    self.client.send(path, {}, JSON.stringify(val));
  });
};

module.exports = Connection;