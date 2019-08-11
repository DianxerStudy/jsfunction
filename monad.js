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

var getFile1 = filename => new syncSupport.IO(()=>{console.log('get file called');return fs.readFileSync(filename)});
var log1 = x => new syncSupport.IO(()=>{console.log(x);return x})


var compose = (...funcs) => (...args) => {
    let $arg = args
    for(let i= funcs.length; i>0; i--){
        $arg = [funcs[i-1].call(null,...$arg)];
    }
    return $arg[0]
}

var f0 = () => 5
var f1 = (l,r) => l+r;
var f2 = s => s*s;
var f3 = content => console.log('content',content)

var printSqure = compose(f3,f2,f1)
var printFiveSqure = compose(f3,f2,f0)
//printSqure(5,6)
//printFiveSqure();


var Car = function(){
    this.getInformation = function(){
        console.log(`Your have a car named ${this.name} and model is ${this.model}`)
        console.log('current this point is ',this)
    }
    return this;
}

var audi = Car.bind({name:'jack',model:'audi'})
//audi().getInformation();

var add = function(a,b){
    console.log(this.quiz,a+b)
}

add.call({quiz:'elementary school'},4,5);
add.apply({quiz:'elementary school'},[4,5]);
