/**
* Created by vrlc92 on 5/5/16.
*/

var request = require('request');
var options = require('./options.js');
var Api = require('./api.js');

var Loader = {};

Loader.getLoadingStatus = function(callback) {
  Api.get({
    url: options.url + '/api/loader/status',
    json: true
  }, callback);
};

Loader.getSynchronisationStatus = function(callback) {
  Api.get({
    url: options.url + '/api/loader/status/sync',
    json: true
  }, callback);
};

module.exports = Loader;
