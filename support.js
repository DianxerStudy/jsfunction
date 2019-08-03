
module.exports =  (() => {
    let map = f => any_functor =>　any_functor.map(f);
    let compose = (...funcs) => arg => funcs.reduceRight((v,f) => f(v),arg);
    let Maybe =  function(x){
        this.__value = x;
    }

    Maybe.of = x => x ? new Maybe(x) : new Maybe(null);
    Maybe.prototype.isNothing = function(){return this.__value == null || this.__value == undefined;}
    Maybe.prototype.map = function(f){return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));}
    Maybe.prototype.join = function(){return this.__value;}

    let Left = function(x){
        this.__value = x;
    }

    Left.of = x => new Left(x);
    Left.prototype.map = function(f){
        return Left.of(this.__value);
    }
    Left.prototype.join = function(){return this.__value;}

    let Right = function(x){
        this.__value = x;
    }

    Right.of = x => new Right(x);
    Right.prototype.map = function(f){
        return Right.of(f(this.__value));
    }
    Right.prototype.join = function(){return this.__value;}

    Right.prototype.chain = function(f) {
        return this.map(f).join();
    }

    let either = f=>g=>e => {
        console.log('e=' , e);
        switch(e.constructor){
            case Left: return f(e.__value);
            case Right: return g(e.__value);
        }
    }
    let id = x=>x

    let IO = function(f){
        this.__value = f;
    }
    
    let log = x => {
        console.log('current value is ',x);
        return x;
    }

    IO.of = function(x){
        return new IO(()=>x);
    }
    
    IO.prototype.map = function(f) {
        return new IO(compose(f,this.__value));
    }
    IO.prototype.join = function(f){
        return this.__value();
    }
    
    IO.prototype.chain = function(f){
        return this.map(f).join();
    }

    let chain = f => m => m.map(f).join()

    return {
        id,
        map,
        compose,
        chain,
        either,
        log,
        Left,
        Right,
        Maybe,
        IO
    }
})()

