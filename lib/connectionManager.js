'use strict';

var Connection = require('./Connection');
var connections = {};

module.exports = {
  fromUrl: function fromUrl(protocol, host) {
    if (protocol === 'https:') {
      protocol = 'wss:';
    } else if (protocol === 'http:') {
      protocol = 'ws:';
    }

    var url = protocol + '//' + host;

    if (connections[url]) {
      return connections[url];
    }

    connections[url] = new Connection(protocol + '//' + host);

    return connections[url];
  }
};