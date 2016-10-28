/**
* Created by vrlc92 on 5/4/16.
*/

var request = require('request');
var options = require('./options.js');
var Api = require('./api.js');

var Dapp = {};

Dapp.registerDapp = function(data, callback) {
  Api.put({
    url: options.url + '/api/dapps',
    form: data,
    json: true
  }, callback);
};

Dapp.getDapps = function(qs, callback) {
  Api.get({
    url: options.url + '/api/dapps',
    qs: qs,
    json: true
  }, callback);
};

Dapp.getDaap = function(daapId, callback) {
  Api.get({
    url: options.url + '/api/dapps/get',
    qs: {
      id: daapId
    },
    json: true
  }, callback);
};

Dapp.searchDappStore = function(q, category, installed, callback) {
  Api.get({
    url: options.url + '/api/dapps/search',
    qs: {
      q: q,
      category: category,
      installed: installed
    },
    json: true
  }, callback);
};

Dapp.installDapp = function(dappId, callback) {
  Api.post({
    url: options.url + '/api/dapps/install',
    form: {
      id: dappId
    },
    json: true
  }, callback);
};

Dapp.installedDapps = function(callback) {
  Api.get({
    url: options.url + '/api/dapps/installed',
    json: true
  }, callback);
};

Dapp.installedDappsIds = function(callback) {
  Api.get({
    url: options.url + '/api/dapps/installedIds',
    json: true
  }, callback);
};

Dapp.uninstallDapp = function(dappId, callback) {
  Api.post({
    url: options.url + '/api/dapps/uninstall',
    form: {
      id: dappId
    },
    json: true
  }, callback);
};

Dapp.launchDapp = function(dappId, callback) {
  Api.post({
    url: options.url + '/api/dapps/launch',
    form: {
      id: dappId
    },
    json: true
  }, callback);
};

Dapp.installing = function(callback) {
  Api.get({
    url: options.url + '/api/dapps/installing',
    json: true
  }, callback);
};

Dapp.launched = function(callback) {
  Api.get({
    url: options.url + '/api/dapps/launched',
    json: true
  }, callback);
};

Dapp.categories = function(callback) {
  Api.get({
    url: options.url + '/api/dapps/categories',
    json: true
  }, callback);
};

Dapp.stopDapp = function(dappId, callback) {
  Api.post({
    url: options.url + '/api/dapps/stop',
    form: {
      id: dappId
    },
    json: true
  }, callback);
};

module.exports = Dapp;
