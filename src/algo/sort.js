var support = require('../functional/support')

module.exports = {    
    getRandomIntInclusive: (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
    },

    getRandomArray: length => {
        let getRandomIntInclusive = (min, max) => {Sort
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
        }
        let arr = []
        for(let i=0;i<length;i++){
            arr[i] = getRandomIntInclusive(0,1000)
        }
        return arr;
    },
    
    testSort: arr => {
        let n = arr.length
        for(let i=1; i<n; i++){
            if(arr[i-1]>arr[i]) {
                return true
            }
        }
        return false
    },
    
    
    runMergeSort: arr => {
        let merge = (arr,firstStart,firstEnd,totalEnd)=>{
            let larr = arr.slice(firstStart,firstEnd+1)
            let rarr = arr.slice(firstEnd+1,totalEnd+1)
            let i=0,j=0
            for(let k=firstStart;k<=totalEnd;k++){
                if((i<larr.length && larr[i]< rarr[j]) || j==rarr.length){
                    arr[k] = larr[i]
                    i++
                }else{
                    arr[k] = rarr[j]
                    j++
                }
            }
            return arr;
        }

        let mergeSort = (arr,p,r)=>{
            if(p<r){
                let q = Math.floor((p+r) /2 )
                mergeSort(arr,p,q)
                mergeSort(arr,q+1,r)
                merge(arr,p,q,r)
            }
            return arr
        }
        return mergeSort(arr,0,arr.length-1)
    },
    
    runInsertSort: arr => {        
        let insertToSortedArray = (arr,p) =>{
            let key = arr[p]
            for(let i=p-1;i>=0;i--){
                if(key < arr[i]){
                    arr[i+1] = arr[i]
                    arr[i] = key
                }
                
            }
            return arr
        }
        
        let insertSort = (arr,p) => {
            if(p>=0){
                insertSort(arr,p-1)
                insertToSortedArray(arr,p)
            }
            return arr
        }

        return insertSort(arr,arr.length-1)
    },
    
    bubbleSort: (arr) => {
        let n = arr.length
        let i = 0
        for(let i=1; i<n; i++){
            let j = n-1
            while(j>=i){
                if(arr[j] < arr[j-1]){
                    let key = arr[j-1]
                    arr[j-1] = arr[j]
                    arr[j] = key
                }            
                j--
            }
        }
        return arr
    },

    heapSort: arr => {
        let maxHeapify = (arr,i,heapSize) => {
            let biggestIndex = i
            let left = i*2 + 1
            let right = i*2 + 2
            if(left <= heapSize-1 && arr[left] > arr[biggestIndex]){
                biggestIndex = left
            }
            if(right <= heapSize-1 && arr[right] > arr[biggestIndex]){
                biggestIndex = right
            }
            if(biggestIndex != i){
                let temp = arr[biggestIndex]
                arr[biggestIndex] = arr[i]
                arr[i] = temp
                maxHeapify(arr,biggestIndex,heapSize)
            }
            return arr
        }

        let buildMaxHeap = arr => {
            let n = arr.length
            for(let tn=Math.floor(n/2-1); tn>=0; tn--){
                maxHeapify(arr,tn,n)
            }
            return arr
        }
        
        buildMaxHeap(arr)
        for(let i=arr.length-1; i>=1; i--){
            let temp = arr[i]
            arr[i] = arr[0]
            arr[0] = temp
            maxHeapify(arr,0,i)
        }
        return arr;
    }
}