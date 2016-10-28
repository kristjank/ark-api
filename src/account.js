/**
* Created by vrlc92 on 5/4/16.
*/

var request = require('request');
var options = require('./options.js');
var Api = require('./api.js');

var Account = {};

Account.openAccount = function(secretKey, callback) {
  Api.post({
    url: options.url + '/api/accounts/open',
    form: {
      secret: secretKey
    },
    json: true
  }, callback);
};

Account.getBalance = function(address, callback) {
  Api.get({
    url: options.url + '/api/accounts/getBalance',
    qs: {
      'address': address
    },
    json: true
  }, callback);
};

Account.getPublicKey = function(address, callback) {
  Api.get({
    url: options.url + '/api/accounts/getPublicKey',
    qs: {
      'address': address
    },
    json: true
  }, callback);
};

Account.generatePublicKey = function(secretKey, callback) {
  Api.post({
    url: options.url + '/api/accounts/generatePublicKey',
    form: {
      secret: secretKey
    },
    json: true
  }, callback);
};

Account.getAccount = function(address, callback) {
  Api.get({
    url: options.url + '/api/accounts',
    qs: {
      'address': address
    },
    json: true
  }, callback);
};

Account.getVotes = function(address, callback) {
  Api.get({
    url: options.url + '/api/accounts/delegates',
    qs: {
      address: address
    },
    json: true
  }, callback);
};

Account.vote = function(secretKey, secondSecretKey, publicKey, delegates, callback) {
  var data = {
    secret: secretKey,
    delegates: delegates
  };

  if (secondSecretKey) {
    data['secondSecret'] = secondSecretKey;
  }

  if (publicKey) {
    data['publicKey'] = publicKey;
  }

  Api.put({
    url: options.url + '/api/accounts/delegates',
    form: data,
    json: true
  }, callback);
};

module.exports = Account;
