class weightedGraph {
    constructor() {
        this.adjacencyList = {};
    }

    //Example: g.addVertex("Tokyo") => {"Tokyo": []}
    addVertex(vtx) {
        if (!this.adjacencyList[vtx]) this.adjacencyList[vtx] = [];
    }

    /*
    * Example: {"Tokyo": [], "Dallas": []} 
    * g.addEdge("Tokyo", "Dallas", "10km") 
    * => {"Tokyo": [{city: "Dallas", distance: 10km}], "Dallas": [{city: "Tokyo", distance: 10km}]}
    */

    addEdge(vtx1, vtx2, weight) {
        //Tutorial Solution
        this.adjacencyList[vtx1].push({node: vtx2, weight});
        this.adjacencyList[vtx2].push({node: vtx1, weight});

        /**
         * My Solution
        this.adjacencyList[vtx1].push({node: vtx2, weight: weight});
        this.adjacencyList[vtx2].push({node: vtx1, weight: weight});
         */
    }

    Dijkstra(srtVtx, endVtx) {
        /**
         * Dijkstra's Pseudo Code
         * 
         * 1. This function should accept a starting and ending vertex
         * 2. Create an object (we'll call it distances), and set each
         *    key to be every vertex in the adjacency list with a value
         *    of infinity, except for the starting vertex which should
         *    have a value of 0
         * 3. After setting a value in the distance object, add each
         *    vertex with a priority of infinity to the priority queue,
         *    except the starting vertex, which should have a priority
         *    of 0 because that's where we begin
         * 4. Create another object called previous and set each key to
         *    be every vertex in the adjacency list with a value of null
         * 5. Start looping as long as there is anything in the priority
         *    queue
         *    -> dequeue a vertex from the priority queue
         *    -> if that vertex is the same as the ending vertex - we are
         *       done
         *    -> Otherwise loop through each value in the adjacency list
         *       at that vertex
         *       -> calculate the distance to that vertex from the starting
         *          vertex
         *       -> if the distance is less than what is currently stored in
         *          our distances object
         *          -> update the distance object with new lower distance
         *          -> update the previous object to contain that vertex
         *          -> enqueue the vertex with the total distance from the
         *             start node 
         */

        /**
         * Tutorial Solution
        */
       const queue = new PriorityQueue();
       const distances = {};
       const previous = {};
       let path = [] //to return at end
       let smallest;

       //build initial states
       for (const vertex in this.adjacencyList) {
        if (vertex === srtVtx) {
            distances[vertex] = 0;
            queue.enqueue(vertex, 0);
        } else {
            distances[vertex] = Infinity;
            queue.enqueue(vertex, Infinity);
        }
        previous[vertex] = null;
       }

       //as long as there is something to visit
       while (queue.values.length) {
            smallest = queue.dequeue().val;

            if (smallest === endVtx) {
                //WE ARE DONE
                //BUILD UP PATH TO RETURN AT END
                while (previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break
            }

            if(smallest || smallest !== Infinity) {
                for (const neighbor in this.adjacencyList[smallest]) {
                    //find the neighboring node
                    let nextNode = this.adjacencyList[smallest][neighbor];

                    //calculate new distance to neighboring node
                    let candidate = distances[smallest] + nextNode.weight;
                    let nextNeighbor = nextNode.node;

                    if (candidate < distances[nextNeighbor]) {
                        //updating new smallest distance to neighbor
                        distances[nextNeighbor] = candidate;

                        //updating previous - How we got to neighbor
                        previous[nextNeighbor] = smallest;

                        //enqueue in priority queue with new priority for nextNeighbor
                        //to help in determining the next shortest node to visit
                        queue.enqueue(nextNeighbor, candidate);
                    }
                }
            }
       }
       return path.concat(smallest).reverse();
    }
}

/**
 * class to provide methods to:
 * 1. sort vertices based on their priority levels
 * 2. return vertex with lowest priority
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

let graph = new weightedGraph();
//console.log(graph);
graph.addVertex("A");
graph.addVertex('B');
graph.addVertex("C");
graph.addVertex('D');
graph.addVertex("E");
graph.addVertex('F');

//add edges between vertices
graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2);
graph.addEdge("C", "F", 4);
graph.addEdge("D", "E", 3);
graph.addEdge("D", "F", 1);
graph.addEdge("E", "F", 1);
//console.log(graph);

console.log(graph.Dijkstra('A', 'E'));
