'use strict';

var Q = require('q');
var Stomp = require('stompjs/lib/stomp').Stomp;

function Connection(url) {
  var deferredConnection = Q.defer();
  this._connection = deferredConnection.promise;
  
  this.client = window.client = Stomp.client(url + '/socks/websocket');
  this.client.connect({}, function() {
    console.log('CONNECTED');
    deferredConnection.resolve();
  });
}

Connection.prototype.subscribe = function subscribe(path, cb) {
  var self = this;
  this._connection.then(function() {
    self.client.subscribe(path, cb);
  });
};

module.exports = Connection;