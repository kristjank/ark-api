/**
* Created by vrlc92 on 5/5/16.
*/

var request = require('request');
var options = require('./options.js');
var Api = require('./api.js');

var Signature = {};

Signature.addSecondSignature = function(secret, secondSecret, callback) {
  Api.put({
    url: options.url + '/api/signatures',
    form: {
      secret: secret,
      secondSecret: secondSecret
    },
    json: true
  }, callback);
};

module.exports = Signature;
