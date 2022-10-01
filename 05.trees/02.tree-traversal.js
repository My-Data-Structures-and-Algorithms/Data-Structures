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

    insert(value) {
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
    }
    
    //Breadth First Search
    /* BFS Pseudo Code
       1. Create a queue (this can be an array) and a variable
          to store the values of nodes that have been visited
       2. Place the root node in the queue
       3. Loop as long as there is anything in the queue
          a. Dequeue a node from the queue and push the value
             of the node into the variable that stores the 
             nodes
          b. If there is a left property on the node dequeued
             - add it to the queue
          c. If there is a right property on the node dequeued
             - add it to the queue
       4. Return the variable that stores the values 
    */
    BFS() {
        let queue = [];
        let visitedNode = [];
        let dequedNode;
        queue.push(this.root);
        while (queue.length > 0) // while(queue.length){}
        {
            dequedNode = queue.shift();
            visitedNode.push(dequedNode.value);
            if (dequedNode.left) queue.push(dequedNode.left);
            if (dequedNode.right) queue.push(dequedNode.right);
        }
        return visitedNode;
    }

    //Depth First Search - PreOrder
    /** Psuedo Code for DFS - PreOrder
     * 1. Create a variable to store the values of nodes visited
     * 2. Store the root of the BST in a variable called current
     * 3. Write a helper function which accepts a node
     *    a. Push the value of the node to the variable that stores
     *       the values
     *    b. If the node has a left property, call the helper 
     *       function with the left property on the node
     *    c. If the node has a right property, call the helper 
     *       function with the right property on the node
     * 4. Invoke the helper function with the current variable
     * 5. Return the array of Values
     */
    DFSPreOrder() {
        let visited = [];
        let current = this.root;

        function traverse(node) {
            visited.push(node.value);
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
        }
        traverse(current);
        return visited;
    }

    //Depth First Search - PostOrder
    /** Psuedo Code for DFS - PostOrder
     * 1. Create a variable to store the values of nodes visited
     * 2. Store the root of the BST in a variable called current
     * 3. Write a helper function which accepts a node
     *    a. If the node has a left property, call the helper 
     *       function with the left property on the node
     *    b. If the node has a right property, call the helper 
     *       function with the right property on the node
     *    c. Push the value of the node to the variable that stores
     *       the values
     * 4. Invoke the helper function with the current variable
     * 5. Return the array of Values
     */
     DFSPostOrder() {
        let visited = [];
        let current = this.root;

        function traverse(node) {
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
            visited.push(node.value);
        }
        traverse(current);
        return visited;
    }

    //Depth First Search - InOrder
    /** Psuedo Code for DFS - InOrder
     * 1. Create a variable to store the values of nodes visited
     * 2. Store the root of the BST in a variable called current
     * 3. Write a helper function which accepts a node
     *    a. If the node has a left property, call the helper 
     *       function with the left property on the node
     *    b. Push the value of the node to the variable that stores
     *       the values
     *    c. If the node has a right property, call the helper 
     *       function with the right property on the node
     *    
     * 4. Invoke the helper function with the current variable
     * 5. Return the array of Values
     */
     DFSInOrder() {
        let visited = [];
        let current = this.root;

        function traverse(node) {
            if (node.left) traverse(node.left);
            visited.push(node.value);
            if (node.right) traverse(node.right);
        }
        traverse(current);
        return visited;
    }
}


//Breadth First Search
let tree = new BinarySearchTree();
tree.insert(10);
tree.insert(6);
tree.insert(3);
tree.insert(8);
tree.insert(15);
tree.insert(20);
console.log(tree);
console.log(tree.BFS()); //[10,6,15,3,8,20]
console.log(tree.DFSPreOrder()); //[10,6,3,8,15,20]
console.log(tree.DFSPostOrder()); //[3,8,6,20,15,10]
console.log(tree.DFSInOrder()); //[3,6,8,10,15,20]
