/***
 * BIG O of STACKS
 * Insertion - O(1)
 * Removal - O(1)
 * Searching - 0(N)
 * Access - 0(N)
 */

//LINKED LIST IMPLEMENTATION OF THE STACK DATASTRUCTURE
//LIFO (LAST IN FIRST OUT) PRINCIPLE
'use strict'

class Node {
    constructor (value) {
        this.val = value;
        this.next = null;
    }
}

class Stack {
    constructor () {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(val) {
        let newNode = new Node(val);

        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            let oldFirstNode = this.head;
            this.head = newNode;
            this.head.next = oldFirstNode;
        }

        return ++this.length;
    }

    //MY IMPLEMENTATION
    /*pop() {
        if (!this.head) return null;
        let tempNode = this.head;
        
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
        }

        this.length--;
        return tempNode.val;
    }*/

    //OTHER IMPLEMENTATION
    pop () {
        if (!this.head) return null;
        let temp = this.head;
        if (this.head === this.tail) {
            this.tail = null;
        }
        this.head = this.head.next;
        this.length--;

        return temp.val;
    }
    
}

let stackOne = new Stack();
//console.log(stackOne);

//for empty stack
//console.log(stackOne.pop());

//for stack with only one element
//stackOne.push('FIRST');
//console.log(stackOne.pop());
//console.log(stackOne);

//for stack with more than one element
stackOne.push('FIRST');
stackOne.push('SECOND');
stackOne.push('THIRD');
console.log(stackOne.pop()); //return THIRD
console.log(stackOne.pop()); //return SECOND
console.log(stackOne.pop()); //return FIRST
console.log(stackOne); //return an empty stack