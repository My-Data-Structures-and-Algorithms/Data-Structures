/**
 * BIG O OF HASH TABLES
 * 
 * Average Case Scenario: Insertion - O(1), Deletion - O(1), Access - O(1)
 */

//Implementing a hash table using an array
class HashTable {
    //create a new array that will act as a hash table
    constructor(size=53) {
        this.keyMap = new Array(size);
    }

    //hash function to hash key into valid array index
    //i.e _hash("pink") => 0, _hash("cyan") => 3
    //the prime number in our hash function helps spread
    //out the keys more uniformly
    _hash(key) {
        let total = 0;
        let WEIRD_PRIME = 31;
        for (let i = 0; i < Math.min(key.length,100); i++) {
            let char = key[i];

            //value of char in the alphabet, i.e. a -> 1, b -> 2, z -> 26
            let value = char.charCodeAt(0) - 96;
            total = (total * WEIRD_PRIME + value) % this.keyMap.length;             
        }
        return total;
    }

    /**
     * Set Method Pseudocode
     * 
     * 1. Accepts a key and value
     * 2. Hashes the key
     * 3. Stores the key-value pair in the Hash table
     *    array via separate chaining
     *    - separate chaining is a concept were at each index
            of our array, we store values using a more sophiscated
            data structure like an array or linked list
     */

    set(key, value) {
        /** Tutorial Solution  */
        let index = this._hash(key);
        if (!this.keyMap[index]) {
            this.keyMap[index] = [];
        }
        this.keyMap[index].push([key, value]);


        /* My Solution 
        let hshKyVal = this._hash(key);
        
        //if there is no value at the position hshKyVal
        //insert the key and value as an array at the position
        if(this.keyMap[hshKyVal] === undefined) {
            this.keyMap[hshKyVal] = [key, value];
        } else {
            //if there is a value at the position
            //create a new array
            //insert the value at the curr position in the new array
            //insert the new key value pair array into the new array
            //as well 
            //insert the new array at the current position 
            let newValArr = [];
            let currVal = this.keyMap[hshKyVal];
            newValArr.push(currVal);
            newValArr.push([key, value]);
            this.keyMap[hshKyVal] = newValArr;
        }
        return this.keyMap; */
    }

    /**
     * Get Method Pseudocode
     * 
     * 1. Accepts a key
     * 2. Hashes the key
     * 3. Retrieves the key-value pair in the Hash table
     *    array with separate chaining in mind
     */

    get(key) {
        /**
         * Tutorial Solution */ 
        
        let index = this._hash(key);
        if (this.keyMap[index]) {
            for (let i = 0; i < this.keyMap[index].length; i++) {
                if (this.keyMap[index][i][0] === key) {
                    return this.keyMap[index][i][1];
                } 
            }
        }
        return undefined; 

        /* My Solution 
        //hash the given key
        //find the element at the position returned by the hash
        //if the first value of the returned val is an array,
          // search through the returned elements and find the 
          // element at position 0 whose key matches our search key
          // return that element 
          //else return the returned value
        //if the search value is undefined, return undefined

        let hshKyVal = this._hash(key);
        let searchVal = this.keyMap[hshKyVal];

        if (Array.isArray(searchVal[0])) {
            for (let i = 0; i < searchVal.length; i++) {
                let result = searchVal[i];
                if (result[0] === key) {
                    return result[1];
                }
            } 
        } else if (searchVal[0] === key) {
            return searchVal[1];
        }

        return undefined;*/
    } 

    /**
     * Keys Method
     * 
     * -> loops through the hash table array and returns an 
     *    array of keys in the table
     * 
     * Tutorial Example: 
     * => keyMap: [ [ ["orangered", "#ff4500"] ], [ ["pink", "#ff6ab4"], ["cyan", "#00ffff"] ] ]
     * => returns ["orangered","pink"]
     * 
     * My Example:
     * => keyMap: [ ["orangered", "#ff4500"],undefined,[ ["pink", "#ff6ab4"],["cyan", "#00ffff"] ] ]
     * => returns ["orangered","pink", "cyan"]
     */

    keys() {
        /** Tutorial Solution */
        let keysArr = [];
        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    if (!keysArr.includes(this.keyMap[i][j][0])) {
                        keysArr.push(this.keyMap[i][j][0]);
                    }
                }
            }            
        }
        return keysArr;

        /*
        //My Solution
        //1. create a new array to hold our keys
        //2. loop through the keyMap aray
        //   -> if there exists an element at our current position
        //      -> if current element's first element is not an array, 
        //         -> push the first element into our new array 
        //      -> else loop through the current element and 
        //         push each new element's first element into our new array 
        //3. return the new array

        if (this.keyMap.length > 0) {
            let mapKeys = [];
            for (let i = 0; i < this.keyMap.length; i++) {
                if (this.keyMap[i]) {
                    if (!Array.isArray(this.keyMap[i][0])) {
                        mapKeys.push(this.keyMap[i][0]);
                    } else {
                        for (let j = 0; j < this.keyMap[i].length; j++) {
                            if (!mapKeys.includes(this.keyMap[i][j][0])) {
                                mapKeys.push(this.keyMap[i][j][0]);
                            }                       
                        }
                    }
                }
            }
            return mapKeys;
        }
        return undefined;*/     
    }

    /**
     * Values Method
     * 
     * -> loops through the hash table array and returns an 
     *    array of values in the table
     * 
     * Tutorial Example: 
     * => [[["orangered", "#ff4500"]],[["pink", "#ff6ab4"], ["cyan", "#00ffff"]]]
     * => returns ["#ff4500","#ff6ab4","#00ffff"]
     * 
     * My Example:
     * Note: do not return values that are similar
     * => [ ["orangered", "#ff4500"],undefined,[ ["pink", "#ff6ab4"],["cyan", "#00ffff"] ] ]
     * => returns ["#ff4500","#ff6ab4","#00ffff"]
     */

    values() {
        /** Tutorial Solution */
        let valuesArr = [];
        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    if (!valuesArr.includes(this.keyMap[i][j][1])) {
                        valuesArr.push(this.keyMap[i][j][1]);
                    }
                }
            }            
        }
        return valuesArr;

        /*
        //My Solution
        //1. create a new array to hold our values
        //2. loop through the keyMap aray
        //   -> if there exists an element at our current position
        //      -> if current element's first element is not an array,
        //          -> if second element doesn't exist in our array 
        //          -> push the second element into our new array 
        //      -> else loop through the current element and 
        //         push each new element's second element into our new array 
        //3. return the new array

        if (this.keyMap.length > 0) {
            let mapValues = [];
            for (let i = 0; i < this.keyMap.length; i++) {
                if (this.keyMap[i]) {
                    if (!Array.isArray(this.keyMap[i][0])) {
                        if (!mapValues.includes(this.keyMap[i][1])) {
                            mapValues.push(this.keyMap[i][1]);
                        }
                    } else {
                        for (let j = 0; j < this.keyMap[i].length; j++) {
                            if (!mapValues.includes(this.keyMap[i][j][1])) {
                                mapValues.push(this.keyMap[i][j][1]);
                            }                       
                        }
                    }
                }
            }
            return mapValues;
        }
        return undefined;*/
    }

}

/*let hashTable = new HashTable(13);
console.log(hashTable);
console.log(hashTable._hash('orangered'));
console.log(hashTable._hash('pink'));
console.log(hashTable._hash('cyan'));
console.log(hashTable._hash('yellow'));
hashTable.set("orangered", "#ff4500");
console.log(hashTable);
hashTable.set("pink", "#ff6ab4"); 
console.log(hashTable);
hashTable.set("cyan", "#00ffff");
console.log(hashTable);
console.log(hashTable.get(0));
console.log(hashTable.get('yellow'));
console.log(hashTable.get('orangered'));
console.log(hashTable.get('pink'));
console.log(hashTable.get('cyan'));
console.log(hashTable.keys());*/

let hashTable = new HashTable(13);
hashTable.set("orangered", "#ff4500");
console.log(hashTable);
hashTable.set("pink", "#ff6ab4");
console.log(hashTable);
hashTable.set("cyan", "#00ffff");
console.log(hashTable);
hashTable.set("cyan", "#00ffff");
console.log(hashTable.keys());
console.log(hashTable.values());
