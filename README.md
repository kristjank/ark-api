# ark-api

A Node.JS module which provides an wrapper for the [Ark API].

## Installation

[![npm package](https://nodei.co/npm/ark-api.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ark-api/)

## Table of contents

- [Accounts](#accounts)
- [Loader](#loader)
- [Transactions](#transactions)
- [Peers](#peers)
- [Blocks](#blocks)
- [Signatures](#signatures)
- [Delegates](#delegates)
- [Multi-Signature](#multi-signature)

## Accounts
Account related API calls.

### Get balance
Get the balance of an account.

**Request**
```js
var arkAPI = require("ark-api");
arkAPI.getBalance("Address of the account",
  function(error, success, response) {
    console.log(response);
});
```

**Response**
```
{
  "success": true,
  "balance": "Balance of account",
  "unconfirmedBalance": "Unconfirmed balance of account"
}
```
### Get account public key
Get the public key of an account. If the account does not exist the API call will return an error.

**Request**
```js
var arkAPI = require("ark-api");
arkAPI.getPublicKey("Address of the account",
  function(error, success, response) {
    console.log(response);
});
```

**Response**
```
{
  "success": true,
  "publicKey": "Public key of account. Hex"
}
```

### Get account
Returns account information of an address.

**Request**
```js
var arkAPI = require("ark-api");
arkAPI.getAccount("Address of the account",
  function(error, success, response) {
    console.log(response);
});
```

**Response**
```
{
  "success": true,
  "account": {
    "address": "Address of account. String",
    "unconfirmedBalance": "Unconfirmed balance of account. Integer",
    "balance": "Balance of account. Integer",
    "publicKey": "Public key of account. Hex",
    "unconfirmedSignature": "If account enabled second signature, but it's still not confirmed. Boolean: true or false",
    "secondSignature": "If account enabled second signature. Boolean: true or false",
    "secondPublicKey": "Second signature public key. Hex"
  }
}
```
### Get votes of account
Get votes by account address.

**Request**
```js
var arkAPI = require("ark-api");
arkAPI.getVotes("Address of the account",
  function(error, success, response) {
    console.log(response);
});
```

**Response**
```
{
  "success": true,
  "delegates": "array of delegates"
}
```

### Vote for the selected delegates
Vote for the selected delegate - only 1 delegate can be voted from each Ark address at a time.

**Request**
```js
var arkAPI = require("ark-api");
arkAPI.vote("Secret key of account",
            "Second secret of account, required if user uses second signature. The parameter is ignored when the value is null.",
            "Public key of sender account, to verify secret passphrase in wallet. Optional, only for UI. The parameter is ignored when the value is null."
            "Array of string in the following format: ['+DelegatePublicKey'] OR ['-DelegatePublicKey']. Use + to UPvote, - to DOWNvote",
  function(error, success, response) {
    console.log(response);
});
```

**Response**
```
{
    "success": true,
    "transaction": {object}
}
```

## Loader
Provides the synchronisation and loading information of a client. These API calls are only working if the client is syncing or loading.

### Get loading status
Returns account's delegates by address.

**Request**
```js
var arkAPI = require("ark-api");
arkAPI.getLoadingStatus(function(error, success, response) {
    console.log(response);
});
```

**Response**
```
{
   "success": true,
   "loaded": "Is blockchain loaded? Boolean: true or false",
   "now": "Last block loaded during loading time. Integer",
   "blocksCount": "Total blocks count in blockchain at loading time. Integer"
}
```

### Get synchronisation status
Get the synchronisation status of the client.

**Request**
```js
var arkAPI = require("ark-api");
arkAPI.getSynchronisationStatus(function(error, success, response) {
    console.log(response);
});
```

**Response**
```
{
   "success": true,
   "sync": "Is wallet is syncing with another peers? Boolean: true or false",
   "blocks": "Number of blocks remaining to sync. Integer",
   "height": "Total blocks in blockchain. Integer"
}
```

## Transactions
API calls related to transactions.

### Get list of transactions
Transactions list matched by provided parameters.

**Request**
```js
var arkAPI = require("ark-api");

var parameters = {
  "blockId": "Block id of transaction. (String)",
  "senderId": "Sender address of transaction. (String)",
  "recipientId": "Recipient of transaction. (String)",
  "limit": "Limit of transaction to send in response. Default is 20. (Number)",
  "offset": "Offset to load. (Integer number)",
  "orderBy": "Name of column to order. After column name must go 'desc' or 'asc' to choose order type, prefix for column name is t_. Example: orderBy=t_timestamp:desc (String)"
};

arkAPI.getTransactionsList(parameters, function(error, success, response) {
    console.log(response);
});
```

**Response**
```
{
  "success": true,
  "transactions": [
    "list of transactions objects"
  ]
}
```

### Send transaction
Send transaction to broadcast network.

**Request**
```js
var arkAPI = require("ark-api");
arkAPI.sendTransaction("Secret key of account",
                      "Secret key from second transaction, required if user uses second signature. The parameter is ignored when the value is null.",
                      "Public key of sender account, to verify secret passphrase in wallet. Optional, only for UI. The parameter is ignored when the value is null.",
                      "Amount of transaction * 10^8. Example: to send 1.1234 LISK, use 112340000 as amount",
                      "Recipient of transaction. Address.",
                      function(error, success, response) {
    console.log(response);
});
```

**Response**
```
{
  "success": true,
  "transactionId": "id of added transaction"
}
```

### Get transaction
Transaction matched by id.

**Request**
```js
var arkAPI = require("ark-api");
arkAPI.getTransaction("String of transaction (String)", function(error, success, response) {
    console.log(response);
});
```

**Response**
```
{
  "success": true,
  "transaction": {
    "id": "Id of transaction. String",
    "type": "Type of transaction. Integer",
    "subtype": "Subtype of transaction. Integer",
    "timestamp": "Timestamp of transaction. Integer",
    "senderPublicKey": "Sender public key of transaction. Hex",
    "senderId": "Address of transaction sender. String",
    "recipientId": "Recipient id of transaction. String",
    "amount": "Amount. Integer",
    "fee": "Fee. Integer",
    "signature": "Signature. Hex",
    "signSignature": "Second signature. Hex",
    "companyGeneratorPublicKey": "If transaction was sent to merchant, provided comapny generator public key to find company. Hex",
    "confirmations": "Number of confirmations. Integer"
  }
}
```

### Get unconfirmed transaction
Get unconfirmed transaction by id.

**Request**
```js
var arkAPI = require("ark-api");
arkAPI.getUnconfirmedTransaction("String of transaction (String)", function(error, success, response) {
    console.log(response);
});
```

**Response**
```
{
  "success": true,
  "transaction": {
    "id": "Id of transaction. String",
    "type": "Type of transaction. Integer",
    "subtype": "Subtype of transaction. Integer",
    "timestamp": "Timestamp of transaction. Integer",
    "senderPublicKey": "Sender public key of transaction. Hex",
    "senderId": "Address of transaction sender. String",
    "recipientId": "Recipient id of transaction. String",
    "amount": "Amount. Integer",
    "fee": "Fee. Integer",
    "signature": "Signature. Hex",
    "signSignature": "Second signature. Hex",
    "confirmations": "Number of confirmations. Integer"
  }
}
```

### Get list of unconfirmed transactions
Get list of unconfirmed transactions.

**Request**
```js
var arkAPI = require("ark-api");
arkAPI.getUnconfirmedTransactions(function(error, success, response) {
    console.log(response);
});
```

**Response**
```
{
    "success" : true,
    "transactions" : [list of transaction objects]
}
```

## Peers
Peers API.

### Get peers list
Get peers list by parameters.

**Request**
```js
var arkAPI = require("ark-api");
var parameters = {
  "state: State of peer. 1 - disconnected. 2 - connected. 0 - banned. (String)",
  "os: OS of peer. (String)",
  "shared: Is peer shared? Boolean: true or false. (String)",
  "version: Version of peer. (String)",
  "limit: Limit to show. Max limit is 100. (Integer)",
  "offset: Offset to load. (Integer)",
  "orderBy: Name of column to order. After column name must go 'desc' or 'asc' to choose order type. (String)"
};

arkAPI.getPeersList(parameters, function(error, success, response) {
    console.log(response);
});
```

All parameters joins by "OR".

**Response**
```
{
  "success": true,
  "peers": [
    "list of peers"
  ]
}
```

### Get peer
Get peer by ip and port

**Request**
```js
var arkAPI = require("ark-api");

arkAPI.getPeer("ip: Ip of peer. (String)",
               "port: Port of peer. (Integer)",
               function(error, success, response) {
    console.log(response);
});
```

**Response**
```
{
  "success": true,
  "peer": "peer object"
}
```

### Get peer version, build time
Get peer version and build time

**Request**
```js
var arkAPI = require("ark-api");
arkAPI.getPeerVersion(function(err, success, response){
  console.log(response);
});
```

**Response**
```
{
  "success": true,
  "version": "version of Ark",
  "build": "time of build"
}
```

## Blocks
Blocks manage API.

### Get block
Get block by id.

```js
var arkAPI = require("ark-api");
arkAPI.getBlock(function("id: Id of block", err, success, response){
  console.log(response);
});
```

**Response**
```
{
    "success": true,
    "block": {
        "id": "Id of block. String",
        "version": "Version of block. Integer",
        "timestamp": "Timestamp of block. Integer",
        "height": "Height of block. Integer",
        "previousBlock": "Previous block id. String",
        "numberOfRequests": "Not using now. Will be removed in 0.2.0",
        "numberOfTransactions": "Number of transactions. Integer",
        "numberOfConfirmations": "Not using now.",
        "totalAmount": "Total amount of block. Integer",
        "totalFee": "Total fee of block. Integer",
        "payloadLength": "Payload length of block. Integer",
        "requestsLength": "Not using now. Will be removed in 0.2.0",
        "confirmationsLength": "Not using now.,
        "payloadHash": "Payload hash. Hex",
        "generatorPublicKey": "Generator public key. Hex",
        "generatorId": "Generator id. String.",
        "generationSignature": "Generation signature. Not using. Will be removed in 0.2.0",
        "blockSignature": "Block signature. Hex"
    }
}
```

### Get blocks
Get all blocks.

```js
var arkAPI = require("ark-api");
var parameters = {
  "totalFee: total fee of block. (Integer)",
  "totalAmount: total amount of block. (Integer)",
  "previousBlock: previous block of need block. (String)",
  "height: height of block. (Integer)",
  "generatorPublicKey: generator id of block in hex. (String)",
  "limit: limit of blocks to add to response. Default to 20. (Integer)",
  "offset: offset to load blocks. (Integer)",
  "orderBy: field name to order by. Format: fieldname:orderType. Example: height:desc, timestamp:asc (String)"
};

arkAPI.getBlocks(parameters, function(err, success, response){
  console.log(response);
});
```

All parameters joins by OR.

**Response**
```
{
  "success": true,
  "blocks": [
    "array of blocks"
  ]
}
```

### Get blockchain fee
Get transaction fee for sending "normal" transactions.

```js
var arkAPI = require("ark-api");

arkAPI.getBlockchainFee(function(err, success, response){
  console.log(response);
});
```

**Response**
```
{
  "success": true,
  "fee": "fee amount"
}
```

### Get blockchain height
Get blockchain height.

```js
var arkAPI = require("ark-api");

arkAPI.getBlockchainHeight(function(err, success, response){
  console.log(response);
});
```

**Response**
```
{
  "success": true,
  "height": "Height of blockchain. Integer"
}
```

### Get forged by account
Get amount forged by account.

```js
var arkAPI = require("ark-api");

arkAPI.getForgedByAccount("generatorPublicKey: generator id of block in hex. (String)",
                          function(err, success, response){
    console.log(response);
});
```

**Response**
```
{
  "success": true,
  "sum": "Forged amount. Integer"
}
```

## Signatures
Blocks manage API.

### Add second signature
Add second signature to account.

**Request**
```js
var arkAPI = require("ark-api");
arkAPI.addSecondSignature("secret key of account",
                          "second key of account",
                          "Public key of account, to verify valid secret key and account. Optional. The parameter is ignored when the value is null.",
                          function(err, success, response){
    console.log(response);
});
```

**Response**
```
{
  "success": true,
  "transactionId": "id of transaction with new signature",
  "publicKey": "Public key of signature. hex"
}
```

## Delegates
Delegates API.

### Enable delegate on account
Calls for delegates functional.

**Request**
```js
var arkAPI = require("ark-api");
arkAPI.enableDelegateOnAccount("Secret key of account",
                          "Second secret of account, required if user uses second signature. The parameter is ignored when the value is null."
                          "Username of delegate. String from 1 to 20 characters."
                          function(err, success, response){
    console.log(response);
});
```

**Request**
```
{
  "secret": "Secret key of account",
  "secondSecret": "Second secret of account",
  "username": "Username of delegate. String from 1 to 20 characters."
}
```

**Response**
```
{
  "success": true,
  "transaction": "transaction object"
}
```

### Get delegates
Get delegates list.

**Request**
```js
var arkAPI = require("ark-api");
var parameters = {
  "limit: Limit to show. Integer. (Integer)",
  "offset: Offset (Integer)",
  "orderBy: Order by field (String)"
};

arkAPI.getDelegates(parameters, function(err, success, response){
    console.log(response);
});
```

**Response**
```
{
  "success": true,
  "delegates": "delegates objects array"
}
```

- Delegates Array includes: delegateId, address, publicKey, vote (# of votes), producedBlocks, missedBlocks, rate, productivity

### Get delegate
Get delegate by username.

**Request**
```js
var arkAPI = require("ark-api");

arkAPI.getDelegate("username of delegate", function(err, success, response){
    console.log(response);
});
```

**Response**
```
{
    "success": true,
    "delegate": {
        "username": "username of delegate",
        "transactionId": "transaction id",
        "votes": "amount of stake voted for this delegate"
}
```

### Get votes of account
Get votes by account address.

**Request**
```js
var arkAPI = require("ark-api");
arkAPI.getVotes("Address of the account. (String)",
  function(error, success, response) {
    console.log(response);
});
```

**Response**
```
{
  "success": true,
  "delegates": "array of delegates"
}
```

- Delegates Array includes: delegateId, address, publicKey, vote (# of votes), producedBlocks, missedBlocks, rate, productivity

### Get voters
Get voters of delegate.

**Request**
```js
var arkAPI = require("ark-api");
arkAPI.getVoters("Public key of delegate. (String)",
  function(error, success, response) {
    console.log(response);
});
```

**Response**
```
{
  "success": true,
  "accounts": [
    "array of accounts who vote for delegate"
  ]
}
```

### Enable forging on delegate
Enable forging

**Request**
```js
var arkAPI = require("ark-api");
arkAPI.enableForging("secret key of delegate account",
  function(error, success, response) {
    console.log(response);
});
```

**Response**
```
{
  "success": true,
  "address": "address"
}
```

### Disable forging on delegate
Disable forging

**Request**
```js
var arkAPI = require("ark-api");
arkAPI.disableForging("secret key of delegate account",
  function(error, success, response) {
    console.log(response);
});
```

**Response**
```
{
  "success": true,
  "address": "address"
}
```

## Multi-Signature
Multisignature group API.

### Get pending multi-signature transactions
Returns multisig transaction that waiting for your signature.

**Request**
```js
var arkAPI = require("ark-api");
arkAPI.getPendingMultiSignatureTransactions("Public key of account (String)",
                                            function(error, success, response) {
    console.log(response);
});
```

**Response**
```
{
    "success": true,
    "transactions": ['array of transactions to sign']
}
```

### Create multi-signature account
Create a multisignature account.

**Request**
```js
var arkAPI = require("ark-api");
arkAPI.createMultiSignatureAccount("your secret. string. required.",
                                   "request lifetime in hours (1-24). required.",
                                   "minimum signatures needed to approve a tx or a change (1-15). integer. required",
                                   "[array of public keys strings]. add '+' before publicKey to add an account or '-' to remove. required.",
                                   function(error, success, response) {
    console.log(response);
});
```

**Response**
```
{
  "success": true,
  "transactionId": "transaction id"
}
```

### Sign transaction
Sign transaction that wait for your signature.

```js
var arkAPI = require("ark-api");
arkAPI.signTransaction("your secret. string. required.",
                       "public key of your account. string. optional. The parameter is ignored when the value is null.",
                       "id of transaction to sign.",
                       function(error, success, response) {
    console.log(response);
});
```

**Response**
```
{
  "success": true,
  "transactionId": "transaction id"
}
```

### Get accounts of multisignature
Get accounts of multisignature.

```js
var arkAPI = require("ark-api");
arkAPI.getAccountsOfMultisignature("Public key of multi-signature account (String)",
                                   function(error, success, response) {
    console.log(response);
});
```

**Response**
```
{
  "success": true,
  "accounts": "array of accounts"
}
```

## License

This documentation is based on: https://github.com/LiskHQ/lisk-docs/blob/development/APIReference.md

MIT License

Copyright (c) 2016 Ark  
Copyright (c) 2016 Lisk

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
