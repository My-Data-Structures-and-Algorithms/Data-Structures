/**
 * class to provide methods to:
 * 1. sort vertices based on their priority levels
 * 2. return vertex with lowest priority
 */
class PriorityQueue {
    constructor() {
        this.values = [];
    }
    
    enqueue(val, priority) {
        this.values.push({val, priority});
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        //this will sort our vertices in ascending order,
        //from smallest to largest
        this.values.sort((a,b) => a.priority - b.priority);
    }
}


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

        /**
         * My Solution
        
        let distances = {}
        let queue = new PriorityQueue();
        let previous = {};
        let path = [];
        let currentVtx;

        //Step 2 of Dijkstra's Pseudo Code
        //console.log(this.adjacencyList);
        let adjLstVertices = Object.keys(this.adjacencyList);
        adjLstVertices.forEach(vtx => {
            if (vtx === srtVtx) {
                distances[vtx] = 0;
            } else {
                distances[vtx] = Infinity;
            }
        });

        //console.log('....Before....');
        //console.log(distances);

        //Step 3 of Dijkstra's Pseudo Code
        for (const vtx in distances) {
            if (distances[vtx] === 0) {
                queue.enqueue(vtx, 0);
            } else {
                queue.enqueue(vtx, distances[vtx]);
            }
        }
        
        //console.log(queue);

        //Step 4 of Dijkstra's Pseudo Code
        for (const vtx in distances) {
            previous[vtx] = null;
        }

        //console.log(previous);

        //Step 5 of Dijkstra's Pseudo Code
        /*
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
         
        while(queue.values.length) {
            //starting with A, this returns the vertex with the shortest distance from the
            //start point eg. {val: "A", priority: 0} => A from the queue
            currentVtx = queue.dequeue().val; //A
            //console.log(currentVtx);

            if (currentVtx === endVtx) { //A === E, NO
                //console.log(currentVtx + ' ' + 'This is our final path');
                while(previous[currentVtx]) {
                    path.push(currentVtx);
                    currentVtx = previous[currentVtx];
                }
                break;
                //console.log(distances);
                //console.log(previous);
                //console.log(queue);
            }

            if (currentVtx || currentVtx !== Infinity) { 
                this.adjacencyList[currentVtx].forEach(neighbor => {
                    //console.log(currentVtx + "'s" + ' ' + 'neighbors ' + neighbor.node);
                    //A's neigbors =>[ { node: 'B', weight: 4 }, { node: 'C', weight: 2 } ],
                    //for neighbor { node: 'B', weight: 4 }
                    //new shortest distance to node B is 
                    //whatever is stored in current shortest distance from A plus weight/distance to 
                    //neighboring node B => distances[A] + B.weight which equates to
                    //new distance = distances[currentVtx] + neighbor.weight
                    //new distance = 0 + 4 = 4
                   
                        //neighbor distance 
                        //=> current shortest distance of currentNode + distance to neighbor
                        let nghborDistFrmStrt = distances[currentVtx] + neighbor.weight;
                        //console.log(nghborDistFrmStrt);
                        //console.log(distances[neighbor.node]);
                        if (nghborDistFrmStrt < distances[neighbor.node]) {
                            distances[neighbor.node] = nghborDistFrmStrt;
                            previous[neighbor.node] = currentVtx;
                            queue.enqueue(neighbor.node, nghborDistFrmStrt);
                            //console.log('....AFTER....')
                            //console.log(distances);
                            //console.log(previous);
                            //console.log(queue);
                        }
                    
                });
            }
        }

        //console.log(path);
        return path.concat(currentVtx).reverse();
        /**
         * 
         * Examples
         *1. adjacencyList => {
         *      A: [{node: "B", weight: 4}, {node: "C", weight: 2}],
         *      B: [{node: "A", weight: 4}, {node: "E", weight: 3}],
         *      C: [{node: "A", weight: 2}, {node: "D", weight: 2}, {node: "F", weight: 4}],
         *      D: [{node: "C", weight: 2}, {node: "E", weight: 3}, {node: "F", weight: 1}],
         *      E: [{node: "B", weight: 3}, {node: "D", weight: 3}, {node: "F", weight: 1}],
         *      F: [{node: "C", weight: 4}, {node: "D", weight: 1}, {node: "E", weight: 1}]
         * }
         * adjacencyList => distances => {
         *      "A": 0,
         *      "B": Infinity,
         *      "C": Infinity,
         *      "D": Infinity,
         *      "E": Infinity,
         *      "F": Infinity
         * }
         * 
         * logic to set each key in adjacencyList as key in distances object with value of 
         * infinity except the start key
         * //return an array with all the keys in the adjacencyList
         * //for each key,
         *   //if the key equal to the start key
         *     //set it's value to 0;
         *   //else
         *     //set every other key's value to infinity
         * 
         * 2. distances => {
         *      "A": 0,
         *      "B": Infinity,
         *      "C": Infinity,
         *      "D": Infinity,
         *      "E": Infinity,
         *      "F": Infinity
         * }
         * 
         * distances => queue => [
         *      {val: "B", priority: Infinity},
         *      {val: "C", priority: Infinity}
         *      {val: "D", priority: Infinity}
         *      {val: "E", priority: Infinity}
         *      {val: "F", priority: Infinity}
         * ]
         * 
         * logic for adding vertices in the distances object
         * into the queue
         * //iterate over the distances object and for each vertex
         *   //if the vertex's value is not equal to 0
         *     //add the vertex and it's value to the priority queue 
         * 
         * 3. adjacencyList => {
         *      A: [{node: "B", weight: 4}, {node: "C", weight: 2}],
         *      B: [{node: "A", weight: 4}, {node: "E", weight: 3}],
         *      C: [{node: "A", weight: 2}, {node: "D", weight: 2}, {node: "F", weight: 4}],
         *      D: [{node: "C", weight: 2}, {node: "E", weight: 3}, {node: "F", weight: 1}],
         *      E: [{node: "B", weight: 3}, {node: "D", weight: 3}, {node: "F", weight: 1}],
         *      F: [{node: "C", weight: 4}, {node: "D", weight: 1}, {node: "E", weight: 1}]
         * }
         * 
         * adjacencyList => previous => {
         *      "A": null,
         *      "B": null,
         *      "C": null,
         *      "D": null,
         *      "E": null,
         *      "F": null
         * }
         * 
         * logic for setting each vertex in distances object to be 
         * a vertex in the previous object with a value of null
         * //Iterate over every vertex in the distances object
         *   //assign it a value of null
         * 
         * queue = [{val: "B", priority: Infinity},{val: "C", priority: Infinity},
         *          {val: "D", priority: Infinity},{val: "E", priority: Infinity},
         *          {val: "F", priority: Infinity}]
         * 
         * 
         * //logic for calculating shortest distance from a given starting point
         * //object with values for shortest distances from a given starting point
         * distances => {
         *      "A": 0,
         *      "B": Infinity,
         *      "C": Infinity,
         *      "D": Infinity,
         *      "E": Infinity,
         *      "F": Infinity
         * }
         * 
         * For B, shortest distance from A => distances["B"];
         */
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

console.log(graph.Dijkstra('F', 'B'));
