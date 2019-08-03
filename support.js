
var support = {
    map : f => any_functor =>　any_functor.map(f),
    compose: (...funcs) => arg => funcs.reduceRight((v,f) => f(v),arg),
    Maybe : function(x){
        this.__value = x;
    },
    Left : function(x){
        this.__value = x;
    },
    Right :  function(x){
        this.__value = x;
    },
    either : f=>g=>e => {
        console.log('e=' , e);
        switch(e.constructor){
            case Left: return f(e.__value);
            case Right: return g(e.__value);
        }
    },
    id : x=>x,
    IO : function(f){
        this.__value = f;
    },
    log: x => {
        console.log('current value is ',x);
        return x;
    }
}

support.Maybe.of = x => x ? new support.Maybe(x) : new support.Maybe(null);

support.Maybe.prototype.isNothing = function(){return this.__value == null || this.__value == undefined;}
support.Maybe.prototype.map = function(f){return this.isNothing() ? support.Maybe.of(null) : support.Maybe.of(f(this.__value));}

support.Left.of = x => new support.Left(x);
support.Left.prototype.map = function(f){
    return support.Left.of(this.__value);
}

support.Right.of = x => new support.Right(x);
support.Right.prototype.map = function(f){
    return support.Right.of(f(this.__value));
}

support.Right.prototype.chain = function(f) {
    this.map(f(this.__value)).__value;
}

support.IO.of = function(x){
    return new support.IO(()=>x);
}

support.IO.prototype.map = function(f) {
    return new support.IO(support.compose(f,this.__value));
}

module.exports = support;