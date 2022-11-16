/**
 * BIG O OF ADJACENCY LIST VS ADJACENCY MATRIX APPROACHES
 * TO REPRESENTING GRAPHS
 * 
 *     |V| - number of vertices/nodes
 *     |E| - number of edges
 * 
 * 
 *     OPERATION         ADJACENCY LIST         ADJACENCY MATRIX
 * 1.  Add Vertex           O(1)                    O(|V^2|)
 * 2.  Add Edge             O(1)                    O(1)
 * 3.  Remove Vertex        O(|V| + |E|)            O(|V^2|)
 * 4.  Remove Edge          O(|E|)                  O(1)
 * 5.  Query                O(|V| + |E|)            O(1)
 * 6.  Storage              O(|V| + |E|)            O(|V^2|)
 * 
 * NOTE: This implementation is for an unweighted undirected graph 
 * 
 */

class AdjacencyList {
    constructor () {
        this.adjacencyList = {};
    }

    /**
     * Pseudo Code For Adding a Vertex/Node
     * 
     * 1. Write a method called addVertex, which accepts a name
     *    of a vertex
     * 2. It should add a key to the adjacencyList with the name
     *    of the vertex and set its value to be an empty array
     * 
     * Example: g.addVertex("Tokyo") => {"Tokyo": []}
     */

    addVertex(vtx) {
        this.adjacencyList[vtx] = [];
    }

    /**
     * Pseudo Code For Adding an Edge
     * 
     * 1. This function should accept two vertices, we can call
     *    them vtx1 and vtx2
     * 2. The function should find in the adjacency list the key
     *    of vtx1 and push vtx2 to the array
     * 3. The function should find in the adjacency list the key
     *    of vtx2 and push vtx1 to the array
     * 4. Don't worry about handling errors/invalid vertices
     * 
     * Example: {"Tokyo": [], "Dallas": [], "Aspen": []} 
     * g.addEdge("Tokyo", "Dallas") => {"Tokyo": ["Dallas"], "Dallas": ["Tokyo"], "Aspen": []}
     * 
     */

    addEdge(vtx1,vtx2) {
        this.adjacencyList[vtx1].push(vtx2);
        this.adjacencyList[vtx2].push(vtx1);
    }

    /**
     * Pseudo Code For Removing an Edge
     * 
     * 1. This function should accept two vertices, we can call
     *    them vtx1 and vtx2
     * 2. The function should reassign the key of vtx1 to be an
     *    array that does not contain vtx2
     * 3. The function should reassign the key of vtx2 to be an
     *    array that does not contain vtx1
     * 4. Don't worry about handling errors/invalid vertices
     * 
     * Example: {"Tokyo": ["Dallas"], "Dallas": ["Tokyo", "Aspen"], "Aspen": ["Dallas"]} 
     * g.removeEdge("Tokyo", "Dallas") => {"Tokyo": [], "Dallas": ["Aspen"], "Aspen": ["Dallas"]}
     * 
     */

    removeEdge(vtx1,vtx2) {
        /**
         * Tutorial Solution
         */

        //return a shallow copy of the array in which vtx1 does not exist
        this.adjacencyList[vtx1] = this.adjacencyList[vtx1].filter(vtx => vtx !== vtx2);
            
        //return a shallow copy of the array in which vtx2 does not exist
        this.adjacencyList[vtx2] = this.adjacencyList[vtx2].filter(vtx => vtx !== vtx1);

        /**
         * My Solution
         * 
         * let vtx1Edges = this.adjacencyList[vtx1]; //["Dallas"]
           let vtx2Edges = this.adjacencyList[vtx2]; // ["Tokyo", "Aspen"]

           //find the index of vtx1 in vtx2Edges and index of vtx2 in vtx1Edges
           let vtx1Indx = vtx2Edges.indexOf(vtx1);
           let vtx2Indx = vtx1Edges.indexOf(vtx2);

           //remove vtx1 from vtx2Edges and vtx2 from vtx1Edges
           //and assign the resulting array to our vtx1 and vtx2
           //key values
           vtx1Edges.splice(vtx2Indx,1);
           vtx2Edges.splice(vtx1Indx,1);
           this.adjacencyList[vtx1] = vtx1Edges;
           this.adjacencyList[vtx2] = vtx2Edges; 
         * 
         */
    }

    /**
     * Pseudo Code For Removing a Vertex
     * 
     * 1. This function should accept a vtx to remove
     * 2. The function should loop as long as there are any other
     *    vertices in the adjacency list for that vertex
     * 3. Inside of the loop, call our removeEdge function with 
     *    the vertex we are removing and any values in the adjacency
     *    list for that vertex
     * 4. Delete the key in the adjacency list for that vertex
     * 
     * Example: 
     * 1. {
*              "Tokyo": ["Dallas", "Hong Kong"], 
*              "Dallas": ["Tokyo", "Aspen", "Hong Kong", "Los Angeles"], 
*              "Aspen": ["Dallas"],
*              "Hong Kong": ["Tokyo", "Dallas", "Los Angeles"],
*              "Los Angeles": ["Hong Kong", "Dallas"]
     *     }
     * 2. g.removeVertex("Hong Kong")
     * 3. {
*              "Tokyo": ["Dallas"], 
*              "Dallas": ["Tokyo", "Aspen", "Los Angeles"], 
*              "Aspen": ["Dallas"],
*              "Los Angeles": ["Dallas"]
     *     }
     * 
     */

    removeVertex(vtx) {
        /**
         * Tutorial Solution
         */
        while (this.adjacencyList[vtx].length) {
            const adjacentVtx = this.adjacencyList[vtx].pop();
            this.removeEdge(vtx,adjacentVtx);
        }
        delete(this.adjacencyList[vtx]);

        /**
         * My Solution
         * 
         
        while(this.adjacencyList[vtx].length > 0) {
            this.removeEdge(vtx,this.adjacencyList[vtx][0]);
        }
        delete(this.adjacencyList[vtx]); */
    }

    /**
     * Recursive Depth First Traversal to find all nodes within a given graph
     * 
     * Psuedo Code
     * 1. The function should accept a starting node/vtx
     * 2. Create a list to store the end result, to be returned at the very end
     * 3. Create an object to store visited vertices
     * 4. Create a helper function which accepts a vertex
     *    -> The helper function should return early if vertex is empty
     *    -> The helper function should place the vertex it accepts into the 
     *       visited object and push that vertex into the results array
     *    -> Loop over all of the values in the adjacency List for that vertex
     *    -> If any of those values have not been visited, recursively invoke 
     *       the helper function with that vertex
     * 5. Invoke the helper function with the starting index
     * 6. Return the result array 
     */   
    depthFirstRecursive(start) {
        /**
         * Tutorial Solution
        */
        const results = [];
        const visited = {};
        const adjacencyList = this.adjacencyList;
        (function DFS(vtx) {
            if (!vtx) return null;
            visited[vtx] = true;
            results.push(vtx);
            adjacencyList[vtx].forEach(neighbor => {
                if (!visited[neighbor]) {
                    return DFS(neighbor);
                }
            }); 
        })(start);

        return results;
        /**
        * My Solution
        
        let results = [];
        let visited = {};
        let adjacencyList = this.adjacencyList;

        function DFS(vtx) {
            if (!vtx) return null;
            visited[vtx] = true;
            results.push(vtx);

            for (let i = 0; i < adjacencyList[vtx].length; i++) {
                if (!(adjacencyList[vtx][i] in visited)) {
                    DFS(adjacencyList[vtx][i]);
                } 
            }
        }

        DFS(start);

        return results; */
    }

    /**
     * Iterative Depth First Traversal to find all nodes within a given graph
     * 
     * Pseudo Code
     * 1. The function should accept a starting node
     * 2. Create a stack to help us keep track of vertices (use a list/array)
     * 3. Create a list/array to store the end result, to be returned at the very end
     * 4. Create an object to store visited vertices
     * 5. Add the starting vertex to the stack and mark it as visited
     * 6. While the stack has something in it;
     *    -> Pop the next vertex from the stack
     *    -> If that vertex hasn't been visited yet:
     *       -> mark it as visited
     *       -> add it to the result list
     *       -> push all of it's neighbors into the stack
     * 7. Return the result array
     */
    depthFirstIterative(start) {
        /**Tutorial solution */
        const stack = [start];
        const result = [];
        const visited = {};
        let currentVertex;

        visited[start] = true;
        while (stack.length) {
            currentVertex = stack.pop();
            result.push(currentVertex);

            this.adjacencyList[currentVertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    stack.push(neighbor);
                }
            })
        }

        return result;

        /**
         * My Solution
        
        let stack = [];
        let result = [];
        let visited = {};
        let currentVertex;

        stack.push(start);
        //visited[start] = true;

        while(stack.length > 0) {
            currentVertex = stack.pop();
            if(!visited[currentVertex]) {
                visited[currentVertex] = true;
                result.push(currentVertex);
                this.adjacencyList[currentVertex].forEach(neighbor => {
                    stack.push(neighbor);
                });
            }
        }
        return result;
        */
    }

    /**
     * Breadth First Traversal of all Vertices within a graph
     * 
     * Pseudo Code
     * 1. This function should accept a starting vertex
     * 2. Create a queue (you can use an array) and place the
     *    starting vertex in it
     * 3. Create an array to store the nodes visited
     * 4. Mark the starting vertex as visited
     * 5. Loop as long as there is anything in the queue
     * 6. Remove the first vertex from the queue and push it 
     *    into the array that stores nodes visited
     * 7. Loop over each vertex in the adjacency list for the
     *    vertex you are visiting
     * 8. If it is not inside the object that stores nodes visited,
     *    mark it as visited and enqueue that vertex
     * 9. Once you have finished looping, return the array of
     *    visited nodes
     */
    breadthFirstTraversal(start) {
        const queue = [start];
        const result = [];
        const visited = {};
        let currentVertex;

        visited[start] = true;
        
        while(queue.length) {
            currentVertex = queue.shift();
            result.push(currentVertex);
            this.adjacencyList[currentVertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            });

            //to traverse the graph in reverse, we can first
            //reverse the neighboring nodes of a given node
            /*this.adjacencyList[currentVertex].slice().reverse().forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            }) */
        }
        return result;
    }
}

/**
 * Testing adding a Vertex/Node
 * Testing adding an Edge between Vertices/Nodes
 * Testing removing an Edge
 * Testing removing a Vertex
 * 
 *  let graph = new AdjacencyList();
    graph.addVertex("Tokyo");
    graph.addVertex("Dallas");
    graph.addVertex("Aspen");
    graph.addVertex("Hong Kong");
    graph.addVertex("Los Angeles");
    graph.addEdge("Tokyo", "Dallas");
    graph.addEdge("Tokyo", "Hong Kong");
    graph.addEdge("Dallas", "Aspen");
    graph.addEdge("Dallas", "Hong Kong");
    graph.addEdge("Hong Kong", "Los Angeles");
    graph.addEdge("Dallas", "Los Angeles");
    console.log(graph);
    //graph.removeEdge("Tokyo", "Dallas");
    console.log('........................');
    console.log('........................');
    console.log('........................');
    graph.removeVertex('Hong Kong');
    console.log(graph);
 *  
 */

/**Testing Graph Traversal
 * 
 * 
 */
let g = new AdjacencyList();
g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('F');
g.addEdge('A','B');
g.addEdge('A','C');
g.addEdge('B','D');
g.addEdge('C','E');
g.addEdge('D','E');
g.addEdge('D','F');
g.addEdge('E','F');
console.log(g);
console.log('DFS Recursive.........');
console.log(g.depthFirstRecursive('A'));
console.log('.......................');
console.log('DFS Iterative.........');
console.log(g.depthFirstIterative('A'));
console.log('BFS');
console.log(g.breadthFirstTraversal('A'));

