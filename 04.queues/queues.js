/***
 * BIG O of QUEUES
 * Insertion - O(1)
 * Removal - O(1)
 * Searching - O(N)
 * Access - O(N)
 */

//LINKED LIST IMPLEMENTATION OF THE QUEUE DATASTRUCTURE
//FIFO (FIRST IN FIRST OUT) PRINCIPLE
//PRECEPT FOR QUEUE IS TO ADD ELEMENT AT THE BE END
//OF OUR LIST AND REMOVE ELEMENT FROM THE BEGINNING OF OUR LIST

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    //adding a node to the end of our queue
    enqueue(val) {
        let newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        return ++this.length;
    }

    //removing a node from the beginning of our queue
    dequeue() {
        if (!this.head) return null;

        let tempNode = this.head;
        if (this.tail === this.head) {
            this.tail = null;
        }
        this.head = this.head.next;
        this.length--;
        return tempNode.val;
    }
}

let q = new Queue();
console.log(q.enqueue("FIRST")); //1
console.log(q.enqueue("SECOND")); //2
console.log(q.enqueue("THIRD")); //3
console.log(q.dequeue()); //FIRST
console.log(q.dequeue()); //SECOND
console.log(q.dequeue()); //THIRD

