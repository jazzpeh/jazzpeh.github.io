export default class Queue {
  constructor() {
    /**
     * @type {Array<any>}
     */
    this.items = [];
  }

  /**
   * Add item to queue
   * @param {any} item
   */
  enqueue(item) {
    this.items.push(item);
  }

  /**
   * Remove first item from queue
   */
  dequeue() {
    if (this.isEmpty()) return null;
    return this.items.shift();
  }

  /**
   * Check if queue is empty
   */
  isEmpty() {
    return this.items.length == 0;
  }
}