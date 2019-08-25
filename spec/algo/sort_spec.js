var algo = require('../../src/algo/sort')
var support = require('../../src/functional/support')

var min = 0;
var max = 1000;
var maxfast = 10000
var count = 10000

console.time('merge-sort-2000-loops')
Array.from({length:count},i=>{
    let len = algo.getRandomIntInclusive(min,max)
    support.Maybe.of(len)
       .map(algo.getRandomArray)
       .map(algo.runMergeSort)
       .map(algo.testSort)
       .map(support.log)
})
console.timeEnd('merge-sort-2000-loops')

console.time('insert-sort-2000-loops');
Array.from({length:count},i=>{
    let len = algo.getRandomIntInclusive(min,max)
    support.Maybe.of(len)
        .map(algo.getRandomArray)
        .map(algo.runInsertSort)
        .map(algo.testSort)
        .map(support.log)
})
console.timeEnd('insert-sort-2000-loops')


console.time('bubble-sort-2000-loops');
Array.from({length:count},i=>{
    let len = algo.getRandomIntInclusive(min,max)
    support.Maybe.of(len)
        .map(algo.getRandomArray)
        .map(algo.bubbleSort)
        .map(algo.testSort)
        .map(support.log)
})
console.timeEnd('bubble-sort-2000-loops');

console.time('heap-sort-2000-loops');
Array.from({length:count},i=>{
    let len = algo.getRandomIntInclusive(min,maxfast)
    support.Maybe.of(len)
        .map(algo.getRandomArray)
        .map(algo.heapSort)
        .map(algo.testSort)
        .map(support.log)
})
console.timeEnd('heap-sort-2000-loops');


console.time('fast-sort-2000-loops');
Array.from({length:count},i=>{
    let len = algo.getRandomIntInclusive(min,maxfast)
    support.Maybe.of(len)
        .map(algo.getRandomArray)
        //.map(support.log)
        .map(algo.fastSort)
        .map(algo.testSort)
        .map(support.log)
})
console.timeEnd('fast-sort-2000-loops');