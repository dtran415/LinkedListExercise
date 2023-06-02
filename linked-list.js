/** Node: node for a singly linked list. */

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

/** LinkedList: chained together nodes. */

class LinkedList {
    constructor(vals = []) {
        this.head = null;
        this.tail = null;
        this.length = 0;

        for (let val of vals) this.push(val);
    }

    #checkIndex(idx) {
        // if out of bounds throw error
        if (idx < 0 || idx >= this.length)
            throw new Error("Invalid index");
    }

    /** push(val): add new value to end of list. */

    push(val) {
        const node = new Node(val);
        // if no head, this new node is the head and tail
        if (!this.head)
            this.head = node;
        else
            this.tail.next = node;

        this.tail = node;

        this.length++;
    }

    /** unshift(val): add new value to start of list. */

    unshift(val) {
        const node = new Node(val);
        if (!this.head)
            this.tail = node;
        else
            node.next = this.head;

        this.head = node;

        this.length++;
    }

    /** pop(): return & remove last item. */

    pop() {
        return this.removeAt(this.length - 1);
    }

    /** shift(): return & remove first item. */

    shift() {
        return this.removeAt(0);
    }

    /** getAt(idx): get val at idx. */

    getAt(idx) {
        this.#checkIndex(idx);
        
        let curr = this.head;
        for (let i = 0; i < idx; i++) {
            curr = curr.next;
        }

        return curr.val;
    }

    /** setAt(idx, val): set val at idx to val */

    setAt(idx, val) {
        this.#checkIndex(idx);
        let curr = this.head;
        for (let i = 0; i < idx; i++) {
            curr = curr.next;
        }

        curr.val = val;
    }

    /** insertAt(idx, val): add node w/val before idx. */

    insertAt(idx, val) {
        // if out of bounds throw error
        // this.length is valid if adding to the end
        if (idx < 0 || idx > this.length)
            throw new Error("Invalid index");

        this.length++;

        let node = new Node(val);
        let curr = this.head;
        // if inserting at head
        if (idx === 0) {
            this.head = node;

            if (this.length === 1) 
                this.tail = node;
        }

        // if inserting at tail
        let next;
        if (idx === this.length-1) {
            curr = this.tail;
            this.tail = node;
            next = null;
        } else {
            // stop at node before idx
            for (let i = 0; i < idx-1; i++) {
                curr = curr.next;
            }
            next = curr.next;
        }

        curr.next = node;
        node.next = next;
    }

    /** removeAt(idx): return & remove item at idx, */

    removeAt(idx) {
        this.#checkIndex(idx);

        this.length--;
        let curr = this.head;
        // if at head
        if (idx === 0) {
            this.head = this.head.next;
            // if no more values
            if (this.length === 0)
                this.tail = null;

            return curr.val;
        }

        // stop at node before idx
        for (let i = 0; i < idx - 1; i++) {
            curr = curr.next;
        }

        let prev = curr;
        curr = curr.next;
        prev.next = curr.next;

        // if at tail
        if (idx === this.length)
            this.tail = prev;

        return curr.val;

    }

    /** average(): return an average of all values in the list */

    average() {
        if (this.length === 0)
            return 0;

        let curr = this.head;
        let sum = 0;
        let count = 0;

        while (curr) {
            sum += curr.val;
            count++;
            curr = curr.next;
        }

        return sum/count;
    }
}

module.exports = LinkedList;
