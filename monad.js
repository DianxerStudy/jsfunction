var support = require('./support')
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
        return support.Left.of('The prop is required.');
    }
    if(json[prop]){
        return support.Right.of(json[prop])
    }
    else{
        return support.Left.of(`The ${prop} property does not exist in the provided object` )
    }
}

var join = container => container.__value;

var getAddress = support.compose(join,support.map(safeProp('street')),safeProp('address'));
var getNumber = support.compose(join,support.map(safeProp('number')),getAddress)
var chain = f => obj => obj.map(f).join()
// safeProp('address')(user)
//         .chain(safeProp('street'))
//         .chain(safeProp('number'))
//         .chain(support.log) 
var safePropIO = prop => json => new support.IO(() => support.Maybe.of(json[prop]));

//getfile ::　string -> IO String
var getFile = filename => new support.IO(() => fs.readFileSync(filename))
var userAddressNumber = getFile('./test.json')
                            .map(JSON.parse)
                            .chain(safePropIO('address'))
                            .chain(support.chain(safePropIO('street')))
                            .chain(support.chain(safePropIO('number1')))
                            .map(support.log)
                            .__value()
                            .__value
console.log(userAddressNumber)

                     