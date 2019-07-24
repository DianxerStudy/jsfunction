var compose = (...funcs) => arg => funcs.reduceRight((v,f) => f(v),arg);

var Maybe = function(x){
    this.__value = x;
}

Maybe.of = x => new Maybe(x);

Maybe.prototype.isNothing = function(){return this.__value == null || this.__value == undefined;}
Maybe.prototype.map = function(f){return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));}

var Left = function(x){
    this.__value = x;
}

Left.of = x => new Left(x);
Left.prototype.map = function(f){
    return Left.of(this.__value);
}

var Right = function(x){
    this.__value = x;
}

Right.of = x => new Right(x);
Right.prototype.map = function(f){
    return Right.of(f(this.__value));
}

var either = f=>g=>e => {
    console.log('e=' , e);
    switch(e.constructor){
        case Left: return f(e.__value);
        case Right: return g(e.__value);
    }
};

var id = x=>x;

module.exports = {id,compose,Maybe,either,Left,Right};