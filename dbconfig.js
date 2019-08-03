var support = require('./support')
var Task = require('data.task')
var fs = require('fs')
var pg = require('pg')

//readFile :: String => Task Error String
var readFile = fileName => new Task((reject,result) => fs.readFile(fileName,(err,data) =>err? reject(err):result(data)));

//dbUrl :: config => Either Error URL
var dbUrl = ({uname,pass,host,db}) => {
    console.log(uname,pass,db,host);
    if(uname && pass && host && db){
        return support.Right.of(`db:pg://${uname}:${pass}@${host}5432/${db}`);BOKERUANJIAN 
    }
    return support.Left.of(Error('Invalid configuration!'));
}

var connect = url =>  support.IO.of(url);
//connectDb:: config => Either error (IO DbConnection)
var connectDb = support.compose(support.map(connect),dbUrl);

//JSON.Parse:: String => {}

//getConfig :: String => Task Error (Either Error (IO DbConnection))
var getConfig = support.compose(support.map(support.compose(connectDb,JSON.parse)),readFile)

var testGetConfig = support.compose(support.map(console.log),getConfig);

testGetConfig('./test.json').fork(
    error => console.log(error),
    p => console.log(p)
);