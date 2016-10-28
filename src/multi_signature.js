/**
* Created by vrlc92 on 5/4/16.
*/

var request = require('request');
var options = require('./options.js');
var Api = require('./api.js');

var MultiSignature = {};

MultiSignature.getPendingMultiSignatureTransactions = function(publicKey, callback) {
  Api.get({
    url: options.url + '/api/multisignatures/pending',
    qs: {
      publicKey: publicKey
    },
    json: true
  }, callback);
};

MultiSignature.createMultiSignatureAccount = function(secret, lifetime,
  min, keysgroup, callback) {
    Api.get({
      url: options.url + '/api/multisignatures',
      method: 'PUT',
      json: {
        secret: secret,
        lifetime: lifetime,
        min: min,
        keysgroup: keysgroup
      },
      json: true
    }, callback);
  };

  MultiSignature.signTransaction = function(secretKey, publicKey, transactionId, callback) {
    var data = {
      secret: secretKey,
      transactionId: transactionId
    };

    if (publicKey) {
      data['publicKey'] = publicKey;
    }

    Api.post({
      url: options.url + '/api/multisignatures/sign',
      form: data,
      json: true
    }, callback);
  };

  MultiSignature.getAccountsOfMultisignature = function(publicKey, callback) {
    Api.get({
      url: options.url + '/api/multisignatures/accounts',
      qs: {
        publicKey: publicKey
      },
      json: true
    }, callback);
  };

  module.exports = MultiSignature;
