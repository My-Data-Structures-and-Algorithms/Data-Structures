/**
 * Binary Heap is similar to a Binary Search Tree
 * MaxBinaryHeap - each parent node is always larger than it's child nodes
 * MinBinaryHeap - each parent node is always smaller than it's child nodes
 * If we have the parent's index (n),
 *    -> the left child index => 2n + 1
 *    -> the right child index => 2n + 2
 * If we have the child's index (n),
 *    -> the parent index => (n-1)/2 floored
 * 
 * Examples
 * -> for MaxBinaryHeap
 *    [41,39,33,18,27,12] -> insert 55 //returns [55,39,41,18,27,12,33]
 *    [55,39,41,18,27,12,33] -> insert 1 //returns [55,39,41,18,27,12,33,1]
 *    [55,39,41,18,27,12,33,1] -> insert 45 //returns [55,45,41,39,27,12,33,1,18]
 *    [55,45,41,39,27,12,33,1,18] -> insert 199 //returns [199,55,41,39,45,12,33,1,18,27] 
 *     
 */

class MaxBinaryHeap {
    constructor() {
        this.values = [];
    }
    
    /** Insertion Pseudo Code
        1. Push the value to be inserted into the values property on the heap
        2. Bubble the value to it's correct spot by
           -> create a variable called index which is the length of the values
              property - 1;
           -> create a variable called parentIdx which is the floor of (index-1)/2
           -> keep looping as long as the values element at the parentIdx is less
              than the values element at the child index
              -> swap the value of the values element at the parentIdx with the 
                 value of the element property at the child index
              -> set the index to be the parentIndex and start over
     */
    insert(value) {
        this.values.push(value);
        this.bubbleUp();
    }

    bubbleUp() { 
        let idx = this.values.length - 1; 
        const element = this.values[idx];
        while(idx > 0) {
            let parentIdx = Math.floor((idx - 1)/2);
            let parent = this.values[parentIdx];
            if (element <= parent) break;
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }

    /** Removing Pseudo Code
     * 1. Swap the first value in the values property with the last one
     * 2. Pop from the values property so you can return the value at the
     *    end
     * 3. Have the new root "sink down" to the correct spot
     *    -> your parent index starts at 0 (the root)
     *    -> find the index of the left child: 2 * index + 1 (make sure it's
     *       not out of bounds)
     *    -> find the index of the right child: 2 * index + 2 (make sure it's
     *       not out of bounds)
     *    -> if the left or right child is greater than the element...swap. If
     *       both the left and right children are larger, swap with the largest
     *       child
     *    -> the child index you swapped to now becomes the new parent index
     *    -> keep looping and swapping until neither child is larger than the 
     *       element
     * 4. Return the old root!
     */

    /**
     * Example: [41,39,33,18,27,12] -> [12,39,33,18,27,41] -> [12,39,33,18,27] -> 
     *          [39,12,33,18,27] -> [39,27,33,18,12]
     */

    extractMax() {
        /**
         * My Solution
        let lstIdx = this.values.length - 1; //0
        let fstValue = this.values[0]; //12
        let lstValue = this.values[lstIdx]; //12

        this.values[0] = lstValue; //[12]
        this.values[lstIdx] = fstValue; //[12]

        let removedVal = this.values.pop(); //12
        if (this.values.length > 0) { //0
            this.mySinkDown();
        } else {
            this.values = [];
        }

        return removedVal;*/


        /** Tutorial Solution */
        const max = this.values[0];
        const end = this.values.pop();
        if(this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        return max;
    }

    /* My SinkDown Solution
    mySinkDown () {
        let fnIdx = this.values.length - 1;
        let parentIdx = 0;
        let parentVal = this.values[0]; //33

        while (parentIdx < fnIdx) { //0<5,2<5
            let leftIdx = (2*parentIdx) + 1; //1, 5
            let rightIdx = (2*parentIdx) + 2; //2, 6
            let leftVal, rightVal, leftSwapVal, rightSwapVal;
            
            if (leftIdx <= fnIdx) {//1<=5, 5<=5
                leftVal = this.values[leftIdx]; //39, 12
                if (leftVal > parentVal) { //39 > 33, 12>33
                    leftSwapVal = leftVal; //39
                }
            }

            if (rightIdx <= fnIdx) { //2<=5,6<=5 
                rightVal = this.values[rightIdx]; //41
                if (rightVal > parentVal) { //41>33
                    rightSwapVal = rightVal; //41
                }
            }

            if (leftSwapVal && rightSwapVal) { //39>41, 12>undefined
                if (leftSwapVal > rightSwapVal) {
                    //swap parent with left value
                    this.values[parentIdx] = leftSwapVal;
                    this.values[leftIdx] = parentVal;
                    parentIdx = leftIdx;
                } else if (rightSwapVal > leftSwapVal) {
                    //swap parent with right value
                    this.values[parentIdx] = rightSwapVal; //[41,39,41,18,27,12]
                    this.values[rightIdx] = parentVal; //[41,39,33,18,27,12]
                    parentIdx = rightIdx; //2
                }  
            } else if (leftSwapVal) {
                //swap parent with left value
                this.values[parentIdx] = leftSwapVal;
                this.values[leftIdx] = parentVal;
                parentIdx = leftIdx;
            } else {
                break;
            }     
        }
    }*/ //end of mySinkDown()

    /** Tutorial Solution */
    sinkDown() {
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while(true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if (leftChild > element) {
                    swap = leftChildIdx;
                }
            }

            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if (
                    ((swap === null) && (rightChild > element)) ||
                    ((swap !== null) && (rightChild > leftChild))
                ) {
                    swap = rightChildIdx;
                }
            }

            if (swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }
}


//inserting into our MaxBinaryHeap ([55,39,41,18,27,12,33])
let maxBinaryHeap = new MaxBinaryHeap();
maxBinaryHeap.insert(55);
maxBinaryHeap.insert(39);
maxBinaryHeap.insert(41);
maxBinaryHeap.insert(18);
maxBinaryHeap.insert(27);
maxBinaryHeap.insert(12);
maxBinaryHeap.insert(33);
console.log(maxBinaryHeap);
console.log(maxBinaryHeap.extractMax());
console.log(maxBinaryHeap.extractMax());
console.log(maxBinaryHeap.extractMax());
console.log(maxBinaryHeap.extractMax());
console.log(maxBinaryHeap.extractMax());
console.log(maxBinaryHeap.extractMax());
console.log(maxBinaryHeap.extractMax());
console.log(maxBinaryHeap.values);

//removing from our MaxBinaryHeap [41,39,33,18,27,12]
//console.log(maxBinaryHeap.extractMax());
//console.log(maxBinaryHeap.values);



