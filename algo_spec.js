var algo = require('./algo')
var support = require('./support')

console.time('merge-sort-2000-loops')
support.Maybe.of(20)
       .map(algo.getRandomArray)
       .map(algo.runMergeSort)
       .map(algo.testSort)
       .map(support.log)
console.timeEnd('merge-sort-2000-loops')

console.time('immutual-2000-loops');
Array.from({length:2000},i=>{
    let len = algo.getRandomIntInclusive(5,30)
    support.Maybe.of(len)
        .map(algo.getRandomArray)
        .map(algo.runInsertSort)
        .map(algo.testSort)
        .map(support.log)
})
console.timeEnd('immutual-2000-loops')


console.time('bubble-2000-loops');
Array.from({length:2000},i=>{
    let len = algo.getRandomIntInclusive(5,100)
    support.Maybe.of(len)
        .map(algo.getRandomArray)
        .map(algo.bubbleSort)
        .map(algo.testSort)
        .map(support.log)
})
console.timeEnd('bubble-2000-loops');

console.time('heap-sort-2000-loops');
Array.from({length:2000},i=>{
    let len = algo.getRandomIntInclusive(5,100)
    support.Maybe.of(5)
        .map(algo.getRandomArray)
        .map(algo.heapSort)
        .map(algo.testSort)
        .map(support.log)
})
console.timeEnd('heap-sort-2000-loops');