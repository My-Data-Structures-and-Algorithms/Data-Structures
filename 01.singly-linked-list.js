/**
 * Singly Linked List Data Structure
 * good at insertion and deletion of items
 * does not allow random access to data, you
 * need to start from the beginning up to the
 * item you're looking for in order to access
 * it.
 */

/**
 * BIG O OF SINGLY LINKED LIST
 * Insertion - O(1)
 * Removal - it depends ... O(1) or O(N) for removing from the end
 *           of the list
 * Searching - O(N)
 * Access - O(N), array access for a given value takes O(1) because it is indexed
 * 
 */

'use strict';

class Node {
    constructor (val) {
        this.val = val;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor () {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }

    //instance method push for adding new nodes
    //to the end of our list
    push (val) {
        let newNode = new Node(val);

        if (!this.head) {
            this.head = newNode;
            this.tail = this.head //both the head and tail point at the new node
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.length++;
        return this;
    }

    //instance method pop for removing a node
    //at the end of the list
    pop() {
        if(!this.head) return undefined;

        let currentNode = this.head;
        let newNodeTail = this.head; //let newNodeTail = currentNode;

        //traverse through our list and return the second last element
        while(currentNode.next) {
            newNodeTail = currentNode;
            currentNode = currentNode.next;
        }
        
        this.tail = newNodeTail;
        this.tail.next = null;
        this.length--;

        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        
        return currentNode;
    }

    //instance method for removing a new node from the
    //start of the list
    shift() {
        //if length of list is 0, return undefined
        //first we capture the current node with the head property
        //we then set the head property to point to the next node in line
        //we return the shifted node

        if (!this.head) return undefined; //or if (this.length === 0) return undefined;

        let shiftedNode = this.head;
        this.head = shiftedNode.next;
        this.length--;
        if(this.length === 0) {
            this.tail = null;
        }

        return shiftedNode;
    }

    //instance method for adding a node at the beginning of the 
    //list
    unshift(val) {
        let newNode = new Node(val);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }

        this.length++;
        return this;
    }

    //instance method for finding an node by it's position
    get(index) {
        if ((index < 0) || (index >= this.length)) return null;

        //starting from the first node in the list
        //let the nodeCounter be equal to zero
        //compare the value of the node counter to that of index
        //if not equal, increment the counter
        //move to the next node
        //if value of counter is equal to that of the index, return
        //the current node

        let currentNode = this.head;
        let nodeCounter = 0;

        while (nodeCounter !== index) {
            nodeCounter++;
            currentNode = currentNode.next;
        }

        return currentNode;
    }

    //instance method for changing the value of a node
    //at a given position
    set(index, val) {
        //use the get method to find the specific node
        let searchedNode = this.get(index);

        //if node is not found, return false
        if (!searchedNode) {
            return false;
        }

        //if node is found, change its value and return true
        searchedNode.val = val;
        return true;
    }

    //instance method for inserting a new node
    //at a given position
    insert(index, val) {
        //deal with index's that are out of scope
        //of our list
        if (index < 0 || index > this.length) return false;

        //add the new node to the end of the list
        //if index is equal to length of the list
        //using !! coarses the value to boolean
        //Example: !!2 - returns true;
        //         !!0 - returns false;
        // !! of a truthy value returns true and 
        // !! of a falsy value returns false
        if (index === this.length) return !!this.push(val);

        //if the index is equal to zero, add the 
        //new node to the start of our list
        if (index === 0) return !!this.unshift(val);

        let newNode = new Node(val);

        let prevNode = this.get(index - 1);

        let temp = prevNode.next;

        prevNode.next = newNode;

        newNode.next = temp;

        this.length++;
        return true;
    }

    //instance method for removing a new node
    //at a given position
    remove(index) {
        if (index < 0 || index > this.length) return undefined;
        if (index === (this.length - 1)) return this.pop();
        if (index === 0) return this.shift();

        let prevNode = this.get(index - 1);
        let removedNode = prevNode.next;
        prevNode.next = removedNode.next;
        this.length--;
        return removedNode;
    }

    //instance method for reversing our list
    reverse() {
        let currentNode = this.head;

        //swap the head with the tail
        this.head = this.tail;
        this.tail = currentNode;

        let nextNode;
        let prevNode = null;

        //loop through the list to assign our variables
        for (let i = 0; i < this.length; i++) {
            nextNode = currentNode.next;
            currentNode.next = prevNode;
            prevNode = currentNode;
            currentNode = nextNode;            
        }
        return this;
    }

    //instance method to help us print our linked list
    print() {
        let arr = [];
        let current = this.head;
        while(current) {
            arr.push(current.val);
            current = current.next;
        }
        console.log(arr);
    }

}

let list = new SinglyLinkedList();
list.push('HI');
list.push('MY');
list.push('FRIEND');
list.push('ALBERT');
console.log(list);
list.pop();
console.log(list);
list.shift();
console.log(list);
list.unshift('HI');
console.log(list);
console.log(list.get(1));
console.log(list.set(1,'HELLO'));
let searchedValue = list.get(1).val;
console.log(searchedValue);
console.log(list);
console.log(list.insert(0, 'FIRST'));
console.log(list);
console.log(list.insert(list.length, 'LAST'));
console.log(list);
list.insert(2, 'SECOND');
console.log(list);
console.log(list.get(2));
console.log(list.remove(2));
console.log(list);
console.log(list.remove(0));
console.log(list);
console.log(list.get(2));
console.log(list.remove(2));
console.log(list);
list.print();
list.reverse();
list.print();