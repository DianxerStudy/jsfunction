const {id,compose,Maybe,either,Left,Right} = require('./support');
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
var withdraw = amount => ({balance}) =>  balance < amount ? Left.of('You broken!') : Right.of({balance: balance - amount});
var updateLedgr = account => account;
var remainBalance = ({balance}) => `Your balance is $${balance}`;

//finishTransaction::account account -> account
var finishTransaction = compose(remainBalance,updateLedgr);
var endStory = compose(console.log,either(id)(finishTransaction));

var getValue = e => e.__value;
var getStory = compose(console.log,map(finishTransaction),withdraw(20));
getStory({balance: 10});