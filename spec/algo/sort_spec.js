var algo = require('../../src/algo/sort')
var support = require('../../src/functional/support')
var assert = require('assert')

var min = 0;
var max = 100;
var maxfast = 100
var count = 100

console.time('merge-sort-2000-loops')
describe('Algo-Sort',() =>{
    describe('merge-sort-2000-loops',()=>{
        it('All the arrays are sorted correctly via merge sort',()=>{
            let result = true
            Array.from({length:count},i=>{
                let len = algo.getRandomIntInclusive(min,max)
                let value = support.Maybe.of(len)
                   .map(algo.getRandomArray)
                   .map(algo.runMergeSort)
                   .map(algo.testSort)
                   .__value
                result = result && value
            })
            assert.equal(result,false)
        })
    })
})
console.timeEnd('merge-sort-2000-loops')

console.time('insert-sort-2000-loops');
describe('Algo-Sort',() =>{
    describe('merge-sort-2000-loops',()=>{
        it('All the arrays are sorted correctly via insert sort',()=>{
            let result = true
            Array.from({length:count},i=>{
                let len = algo.getRandomIntInclusive(min,max)
                let value = support.Maybe.of(len)
                    .map(algo.getRandomArray)
                    .map(algo.runInsertSort)
                    .map(algo.testSort)
                   .__value
                result = result && value
            })
            assert.equal(result,false)
        })
    })
})
console.timeEnd('insert-sort-2000-loops')


console.time('bubble-sort-2000-loops');
describe('Algo-Sort',() =>{
    describe('merge-sort-2000-loops',()=>{
        it('All the arrays are sorted correctly via bubble sort',()=>{
            let result = true
            Array.from({length:count},i=>{
                let len = algo.getRandomIntInclusive(min,max)
                let value = support.Maybe.of(len)
                    .map(algo.getRandomArray)
                    .map(algo.bubbleSort)
                    .map(algo.testSort)
                   .__value
                result = result && value
            })
            assert.equal(result,false)
        })
    })
})

console.timeEnd('bubble-sort-2000-loops');

console.time('heap-sort-2000-loops');
describe('Algo-Sort',() =>{
    describe('merge-sort-2000-loops',()=>{
        it('All the arrays are sorted correctly via heap sort',()=>{
            let result = true
            Array.from({length:count},i=>{
                let len = algo.getRandomIntInclusive(min,maxfast)
                let value = support.Maybe.of(len)
                    .map(algo.getRandomArray)
                    .map(algo.heapSort)
                    .map(algo.testSort)
                   .__value
                result = result && value
            })
            assert.equal(result,false)
        })
    })
})
console.timeEnd('heap-sort-2000-loops');


console.time('fast-sort-2000-loops');
describe('Algo-Sort',() =>{
    describe('merge-sort-2000-loops',()=>{
        it('All the arrays are sorted correctly via fast sort',()=>{
            let result = true
            Array.from({length:count},i=>{
                let len = algo.getRandomIntInclusive(min,maxfast)
                let value = support.Maybe.of(len)
                    .map(algo.getRandomArray)
                    .map(algo.fastSort)
                    .map(algo.testSort)
                   .__value
                result = result && value
            })
            assert.equal(result,false)
        })
    })
})
console.timeEnd('fast-sort-2000-loops');