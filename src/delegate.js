/**
* Created by vrlc92 on 5/4/16.
*/

var request = require('request');
var options = require('./options.js');
var Api = require('./api.js');

var Delegate = {};

Delegate.enableDelegateOnAccount = function(secretKey, secondSecretKey, username, callback) {
  var data = {
    secret: secretKey,
    username: username
  };

  if (secondSecretKey) {
    data['secondSecret'] = secondSecretKey;
  }

  Api.put({
    url: options.url + '/api/delegates',
    form: data,
    json: true
  }, callback);
};

Delegate.getDelegates = function(qs, callback) {
  Api.get({
    url: options.url + '/api/delegates',
    qs: qs,
    json: true
  }, callback);
};

Delegate.getDelegateByUsername = function(username, callback) {
  Api.get({
    url: options.url + '/api/delegates/get',
    qs: {
      username: username
    },
    json: true
  }, callback);
};

Delegate.getDelegateByPublicKey = function(publicKey, callback) {
  Api.get({
    url: options.url + '/api/delegates/get',
    qs: {
      publicKey: publicKey
    },
    json: true
  }, callback);
};

Delegate.getDelegate = Delegate.getDelegateByUsername;

Delegate.getVoters = function(publicKey, callback) {
  Api.get({
    url: options.url + '/api/delegates/voters',
    qs: {
      publicKey: publicKey
    },
    json: true
  }, callback);
};

Delegate.enableForging = function(secretKey, callback) {
  Api.post({
    url: options.url + '/api/delegates/forging/enable',
    form: {
      secret: secretKey
    },
    json: true
  }, callback);
};

Delegate.disableForging = function(secretKey, callback) {
  Api.post({
    url: options.url + '/api/delegates/forging/disable',
    form: {
      secret: secretKey
    },
    json: true
  }, callback);
};

module.exports = Delegate;
