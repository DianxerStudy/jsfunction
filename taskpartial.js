var fs = require('fs')
var support = require('./support')

var Task = function(forkFunction){
    this.fork = forkFunction;
}

Task.of = function(content){
    return new Task(
        (reject,resolve) => resolve(content)   //fork function具体做的事情，就是把of里面的内容给处理了
    )
}

Task.prototype.map = function(handleContentFunction){
    return new Task(
        (reject,resolve) =>{
            this.fork(reject,b=>resolve(handleContentFunction(b)))
        }
    )
}

Task.prototype.chain = function _chain(f) {
    var fork = this.fork;
  
    return new Task(function(reject, resolve) {
      return fork(function(a) {
        return reject(a);
      }, function(b) {
        return f(b).fork(reject, resolve);
      });
    });
  };

Task.prototype.join = function(){
    let fork = this.fork;
    return new Task((reject,resolve) => {
        return this.fork(reject,b=>b.fork(reject,resolve))
    }
        
    )
}

//readfile：： string -> Task error string (data from file)
var readfile = filename => new Task((reject,resolve)=> {
    fs.readFile(filename,'utf-8' , (err,data) => err ? reject(err):resolve(data));
})


var printfile = data => new Task((reject,resolve) => {
    console.log('print file', data);
    resolve(data);
});
//string -> JSON -> string
var getProperty = propertyName => jsonObjectRef => jsonObjectRef[propertyName];

var printlog = a => {console.log('current function is printlog',a.fork); return a;}
//提供了map函数的functor是functor
// readfile('./test.json')
//         .map(JSON.parse)
//         .map(getProperty('pass'))
//         .map(printfile)
//         .fork(err=>{console.log('hello',err)}, printlog);        

//提供了chain的函数是monad，

var sendEmail = mailServer => new Task((reject,resolve) =>
    fs.readFile(mailServer,'utf-8',(err,data) => err? reject(err): resolve(data))
)

// readfile('./test.json').chain(sendEmail).fork(console.log,console.log);
//readfile('./mailserver.txt').chain(sendEmail).fork(console.log, console.log);
 readfile('./mailserver.txt').map(sendEmail).join().fork(console.log,console.log)

//console.log(readfile('./mailserver.txt').map(sendEmail).fork.toString())