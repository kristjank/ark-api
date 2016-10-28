/**
* Created by vrlc92 on 5/5/16.
*/

var request = require('request');
var options = require('./options.js');
var Api = require('./api.js');

var Block = {};

Block.getBlock = function(blockId, callback) {
  Api.get({
    url: options.url + '/api/blocks/get',
    qs: {
      id: blockId
    },
    json: true
  }, callback);
};

Block.getBlocks = function(qs, callback) {
  Api.get({
    url: options.url + '/api/blocks',
    qs: qs,
    json: true
  }, callback);
};

Block.getBlockchainFee = function(callback) {
  Api.get({
    url: options.url + '/api/blocks/getFee',
    json: true
  }, callback);
};

Block.getBlockchainHeight = function(callback) {
  Api.get({
    url: options.url + '/api/blocks/getHeight',
    json: true
  }, callback);
};

Block.getForgedByAccount = function(generatorPublicKey, callback) {
  Api.get({
    url: options.url + '/api/delegates/forging/getForgedByAccount',
    qs: {
      generatorPublicKey: generatorPublicKey
    },
    json: true
  }, callback);
};

module.exports = Block;
