/**
* Created by vrlc92 on 5/5/16.
*/

var request = require('request');
var options = require('./options.js');
var Api = require('./api.js');

var Transaction = {};

Transaction.getTransactionsList = function(qs, callback) {
  Api.get({
    url: options.url + '/api/transactions',
    qs: qs,
    json: true
  }, callback);
};

Transaction.sendTransaction = function(secretKey, secondSecretKey, publicKey, amount, recipientId, callback) {
  var data = {
    secret: secretKey,
    amount: amount,
    recipientId: recipientId
  };

  if (secondSecretKey) {
    data['secondSecret'] = secondSecretKey;
  }

  if (publicKey) {
    data['publicKey'] = publicKey;
  }

  Api.get({
    url: options.url + '/api/transactions',
    method: 'PUT',
    json: data
  }, callback);
};

Transaction.getTransaction = function(transactionId, callback) {
  Api.get({
    url: options.url + '/api/transactions/get',
    qs: {
      id: transactionId
    },
    json: true
  }, callback);
};

Transaction.getUnconfirmedTransaction = function(transactionId, callback) {
  Api.get({
    url: options.url + '/api/transactions/unconfirmed/get',
    qs: {
      id: transactionId
    },
    json: true
  }, callback);
};

Transaction.getUnconfirmedTransactions = function(callback) {
  Api.get({
    url: options.url + '/api/transactions/unconfirmed',
    json: true
  }, callback);
};

module.exports = Transaction;
