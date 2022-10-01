/**
 * BIG O OF DOUBLY LINKED LIST
 * Insertion - O(1)
 * Removal - O(1)
 * Searching - O(N)
 * Access - O(N)
 * Technically searching is 0(N/2) but that's still O(N)
 */


'use strict'

class Node {
    constructor (val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor () {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    //add a node to the end of the Doubly Linked List
    push(val) {
        let newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }

        this.length++;
        return this;
    }

    //remove a node from the end of the Doubly Linked List
    pop() {
        if (!this.head) return undefined;

        let poppedNode = this.tail;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = poppedNode.prev;
            this.tail.next = null;
            poppedNode.prev = null;
        }
      
        this.length--;
        return poppedNode;
    }

    //remove a node from the beginning of a doubly linked list
    shift() {
        if (!this.head) return undefined;
        let shiftedNode = this.head;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = shiftedNode.next;
            this.head.prev = null;
            shiftedNode.next = null;
        }
        this.length--;
        return shiftedNode;
    }

    //adding a node to the beginning of the doubly linked List
    unshift(val) {
        let newNode = new Node(val);
        if(this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }

    //finding a node in the list by it's position
    get(index) {
        if ((index < 0) || (index >= this.length)) return null;
        let middle = Math.floor(this.length/2);
        let currentNode, nodeCounter;
        if (index <= middle) {
            currentNode = this.head;
            nodeCounter = 0;
            while(nodeCounter !== index) {
                nodeCounter++;
                currentNode = currentNode.next;
            }
        } else {
            currentNode = this.tail;
            nodeCounter = this.length - 1;
            while (nodeCounter !== index) {
                nodeCounter--;
                currentNode = currentNode.prev;
            }
        }

        return currentNode;
    }

    //set a value of a node at a given index;
    set(index,val) {
        let foundNode = this.get(index);
        if (foundNode !== null) {
            foundNode.val = val;
            return true;
        }
        return false;
    }

    //insert a node at a given position in a doubly Linked List
    insert(index, val) {
        if ((index < 0) || (index > this.length)) return false;
        if (index === 0) return !!this.unshift(val);
        if (index === this.length) return !!this.push(val);

        let newNode = new Node(val);
        let nodeBeforeIndex = this.get(index - 1);
        let nodeAfterIndex = nodeBeforeIndex.next;
        nodeBeforeIndex.next = newNode;
        newNode.prev = nodeBeforeIndex;
        newNode.next =  nodeAfterIndex;
        nodeAfterIndex.prev = newNode;

        this.length++;
        return true;
    }
    
    //remove a node from a given position/index
    remove(index) {
        if ((index < 0) || (index >= this.length)) return undefined;
        if (index === 0) return this.shift();
        if (index === (this.length - 1)) return this.pop();

        let nodeToBeRemoved = this.get(index);
        let nodeBeforeNodeToBeRemoved = nodeToBeRemoved.prev;
        let nodeAfterNodeToBeRemoved = nodeToBeRemoved.next;

        nodeBeforeNodeToBeRemoved.next = nodeAfterNodeToBeRemoved;
        nodeAfterNodeToBeRemoved.prev = nodeBeforeNodeToBeRemoved;
        nodeToBeRemoved.next = null;
        nodeToBeRemoved.prev = null;

        this.length--;
        return nodeToBeRemoved;
    }
}


let list = new DoublyLinkedList();
/*console.log(list);
list.push(99);
list.push(100);
list.push(101);
console.log(list);
list.pop();
console.log(list);
list.push(200);
list.push(300);
console.log(list);
list.shift();
console.log(list);
list.unshift(98);
console.log(list);
console.log(list.get(0));
list.set(0,99);
console.log(list.get(0));
list.set(-1,100);
console.log(list);*/

list.push(100);
list.push(200);
list.push(300);
/*console.log(list);
console.log('---------');
list.remove(0);
console.log(list);
console.log('---------');
list.remove(1);
console.log(list);*/
list.remove(1);
console.log(list);
