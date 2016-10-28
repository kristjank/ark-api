/**
* Created by vrlc92 on 5/5/16.
*/

var request = require('request');
var options = require('./options.js');
var Api = require('./api.js');

var Peer = {};

Peer.getPeersList = function(qs, callback) {
  Api.get({
    url: options.url + '/api/peers',
    qs: qs,
    json: true
  }, callback);
};

Peer.getPeer = function(ip, port, callback) {
  Api.get({
    url: options.url + '/api/peers/get',
    qs: {
      ip: ip,
      port: port
    },
    json: true
  }, callback);
};

Peer.getPeerVersion = function(callback) {
  Api.get({
    url: options.url + '/api/peers/version',
    json: true
  }, callback);
};

module.exports = Peer;
