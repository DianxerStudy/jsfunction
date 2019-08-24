var support = require('./support');
const fs = require('fs');

var map = f => e => e.map(f);

var Container = function(x){
    this.__value = x;
}

Container.of = x => new Container(x);

Container.prototype.map = function(f){
    return Container.of(f(this.__value));
}

var split = pattern => str => str.split(pattern);

//a -> account -> account
var withdraw = amount => ({balance}) =>  balance < amount ? support.Left.of('You broken!') : support.Right.of({balance: balance - amount});
var updateLedgr = account => account;
var remainBalance = ({balance}) => `Your balance is $${balance}`;

//finishTransaction::account account -> account
var finishTransaction = support.compose(remainBalance,updateLedgr);
var endStory = support.compose(console.log,support.either(support.id)(finishTransaction));

var getValue = e => e.__value;
var getStory = support.compose(map(finishTransaction),withdraw(20));
var printStory = support.compose(console.log,map(finishTransaction),withdraw(20));

module.exports = {getStory};