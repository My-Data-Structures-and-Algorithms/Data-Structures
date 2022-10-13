/**
 * BIG O OF BINARY HEAPS
 * Time Complexity -> Insertion - O(log N), Removal - O(log N)
 */

/**
 * Priority Queue Implementation Using a Heap
 * 
 * Pseudo Code
 * 1. Write a Min Binary Heap - lower number means higher priority
 * 2. Each node has a val and a priority. Use the priority to build
 *    the heap
 * 3. Enqueue: method accepts a value and a priority, makes a new
 *    node, and puts it in the right spot based off of its priority
 * 4. Dequeue: method removes root element, returns it, and rearranges
 *    heap using the priority
 */
class Node {
    constructor (val, priority) {
        this.val = val;
        this.priority = priority;
    }
}

class PriorityQueue {
    constructor() {
        this.values = [];
    }
    
    /**Enqueue method
     * 1. accepts a value and a priority
     * 2. makes a new node
     * 3. puts new node in the right spot
     *    based off of it's priority
     */
    enqueue(val, priority) {
        let newNode = new Node(val, priority);
        this.values.push(newNode);
        this.bubbleUp();
    }

    bubbleUp() { 
        let nodeIdx = this.values.length - 1; 
        const node = this.values[nodeIdx];
        while(nodeIdx > 0) {
            let parentNodeIdx = Math.floor((nodeIdx - 1)/2);
            let parentNode = this.values[parentNodeIdx];
            if (node.priority >= parentNode.priority) break;
            this.values[parentNodeIdx] = node;
            this.values[nodeIdx] = parentNode;
            nodeIdx = parentNodeIdx;
        }
    }

    /** Dequeue method 
     * 1. removes root element
     * 2. returns it
     * 3. rearranges heap using the priority
     
     */
   
    dequeue() {
        const hstPriNode = this.values[0];
        const lstPriNode = this.values.pop();
        if(this.values.length > 0) {
            this.values[0] = lstPriNode;
            this.sinkDown();
        }
        return hstPriNode;
    }

    sinkDown() {
        let nodeIdx = 0;
        const length = this.values.length;
        const node = this.values[0];
        while(true) {
            let leftChildIdx = 2 * nodeIdx + 1;
            let rightChildIdx = 2 * nodeIdx + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if (leftChild.priority < node.priority) {
                    swap = leftChildIdx;
                }
            }

            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if (
                    ((swap === null) && (rightChild.priority < node.priority)) ||
                    ((swap !== null) && (rightChild.priority < leftChild.priority))
                ) {
                    swap = rightChildIdx;
                }
            }

            if (swap === null) break;
            this.values[nodeIdx] = this.values[swap];
            this.values[swap] = node;
            nodeIdx = swap;
        }
    }
}


//Note: LOW NUMBERS REPRESENT A HIGH PRIORITY
let ER = new PriorityQueue();
ER.enqueue("common cold", 5);
ER.enqueue("gunshot wound", 1);
ER.enqueue("high fever", 4);
ER.enqueue("broken arm", 2);
ER.enqueue("glass in foot", 3);
console.log(ER);
ER.dequeue();
console.log(ER);
ER.dequeue()
console.log(ER);




