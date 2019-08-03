var syncSupport = require('./support')
var Task = require('data.task')
var fs = require('fs');

var readfile = function(filename){
    return new Task(
        function(reject,resolve){
            fs.readfile(file,'utf-8',(err,data) => err? reject(err) : resolve(data));
        }
    )
}

//readfile.fork(console.log, either(console.log,map(runQuery)));

const user = {
    id : 1,
    name: 'Abert',
    address: {
        street:{
            number: 22,
            name: 'Walnut St'
        }
    }
}

var safeProp = prop => json => {
    if(prop == null || prop == undefined){
        return syncSupport.Left.of('The prop is required.');
    }
    if(json[prop]){
        return syncSupport.Right.of(json[prop])
    }
    else{
        return syncSupport.Left.of(`The ${prop} property does not exist in the provided object` )
    }
}

var join = container => container.__value;

var getAddress = syncSupport.compose(join,syncSupport.map(safeProp('street')),safeProp('address'));
var getNumber = syncSupport.compose(join,syncSupport.map(safeProp('number')),getAddress)
var chain = f => obj => obj.map(f).join()
// safeProp('address')(user)
//         .chain(safeProp('street'))
//         .chain(safeProp('number'))
//         .chain(syncSupport.log) 
var safePropIO = prop => json => new syncSupport.IO(() => syncSupport.Maybe.of(json[prop]));

//getfile ::　string -> IO String
var getFile = filename => new syncSupport.IO(() => fs.readFileSync(filename))
var userAddressNumber = getFile('./test.json')
                            .map(JSON.parse)
                            .chain(safePropIO('address'))
                            .chain(syncSupport.chain(safePropIO('street')))
                            .chain(syncSupport.chain(safePropIO('number1')))
                            .map(syncSupport.log)
                            .__value()
                            .__value
console.log(userAddressNumber)

                     