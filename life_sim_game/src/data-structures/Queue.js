class Queue {
  items = [];

  enqueue(data) {
    this.items.push(data);
  } 

  dequeue() {
    return this.items.shift();
  }

  clear() {
    this.items = [];
  }

  peek() {
    return this.items[0]
  }

  getItems() {
    // use the spread operator to clone the array and then return it
    return [...this.items];
  }
}

export default Queue

