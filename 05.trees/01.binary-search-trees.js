/**
 * Trees: data structure with nodes in a parent/child relationship
 * -> Binary Trees: trees where every parent has at most 2 children
 *    -> Binary Search Trees
 *       - this is a type of Binary Tree where
 *         - every node to the left is less than the parent and
 *         - every node to the right is greater than the parent
 * 
 * BIG O NOTATION OF BSTS
 * Insertion - O(logN);
 * Searching - 0(logN);
 * 
 * Note: for a BST that has only one side (left or right), 
 * the Big O will not always be O(log N), it will become
 * O(N)
 *  
 */

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    //instance method for inserting values in our BST
    /* Pseudo Code for inserting a node into a BST
       1. Create a new node
       2. Starting at the root
          a. check if there is a root, if not, the root now becomes
             the new node
          b. If there is a root, check if the value of the new node
             is greater than or less than the value of the root
          c. If greater,
             -> check to see if there is a node to the right
                -> If there is, move to that node and repeat
                   these steps
                -> If there is not, add that node as the right 
                   property
          d. If it is less,
             -> check to see if there is a node to the left
                -> If there is, move to that node and repeat these
                   steps
                -> If there is not, add that node as the left
                   property
    */
    insert(value) {
        /*let newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
            return this;
        } else {
            let currentNode = this.root;
            while (true) {
                if (value === currentNode.value) return undefined;
                if (value > currentNode.value) {
                    if (currentNode.right === null) {
                        currentNode.right = newNode;
                        return this;
                    } else {
                        currentNode = currentNode.right;
                    }
                } else if (value < currentNode.value) {
                    if (currentNode.left === null) {
                        currentNode.left = newNode;
                        return this;
                    } else {
                        currentNode = currentNode.left;
                    }
                }
            }
        }*/

        //Refactoring our insert method we come up with
        let newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
            return this;
        }
        let currentNode = this.root;
        while (true) {
            if (value === currentNode.value) return undefined;
            if (value > currentNode.value) {
                if (currentNode.right === null) {
                    currentNode.right = newNode;
                    return this;
                }
                currentNode = currentNode.right;
            } else {
                if (currentNode.left === null) {
                    currentNode.left = newNode;
                    return this;
                }
                currentNode = currentNode.left;
            }
        }
    } //end of insert method

    /** Pseudo Code for finding a NODE in a BST
     *  1. Starting at the root
     *     -> check if there is a root, if not we're done
     *        searching
     *     -> if there is a root, check if the value of the
     *        new node is the value we are looking for. If we
     *        found it, we're done
     *     -> If not, check to see if the value is greater than
     *        or less than the value of the root
     *     -> If greater,
     *        -> check to see if there is a node to the right
     *           -> if there is, move to that node and repeat 
     *              these steps
     *           -> if there is not, we're done searching
     *     -> If it is less,
     *        -> check to see if there is a node to the left
     *           -> if there is, move to that node and repeat
     *              these steps
     *           -> If there is not, we're done searching
     */
    find(value) {
        //If solution returns the Node with the matching value
        /*if (this.root === null) return false;
        let currentNode = this.root;
        let found = false;
        while (currentNode && !found) {
            if (value > currentNode.value) {
                currentNode = currentNode.right;
            } else if (value < currentNode.value) {
                currentNode = currentNode.left;
            } else {
                found = true;
            }
        }
        if (!found) return undefined;
        return currentNode; */

        //if solution returns true or false based on whether the
        //value has been found or not
        if (this.root === null) return false;
        let currentNode = this.root;
        let found = false;
        while (currentNode && !found) {
            //if (value === currentNode.value) return true;
            if (value > currentNode.value) {
                currentNode = currentNode.right;
            } else if (value < currentNode.value) {
                currentNode = currentNode.left;
            } else {
                return true;
            }
        }
        return false;
    }
}   
    


//inserting values in our BST
let tree = new BinarySearchTree();
console.log(tree.root);
tree.insert(40);
console.log(tree);
console.log(tree.insert(40));
tree.insert(20);
console.log(tree);
tree.insert(55);
console.log(tree);
tree.insert(22);
console.log(tree);
tree.insert(18);
console.log(tree);
tree.insert(57);
console.log(tree);
tree.insert(50);
console.log(tree);    
     

//finding a value
let tree1 = new BinarySearchTree();
console.log(tree1.find(50)); //false
tree1.insert(50);
console.log(tree1.find(50)); //true
tree1.insert(55);
tree1.insert(45);
console.log(tree1);
console.log(tree1.find(55)); //true
console.log(tree1.find(45)); //true
console.log(tree1.find(99)); //false
