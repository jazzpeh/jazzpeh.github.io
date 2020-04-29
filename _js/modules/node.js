export default class Node {
  /**
   * @param {string} value
   * @param {Array<Array<Number>>} options.coords
   */
  constructor(value, { coords }) {
    this.value = value;

     /**
     * @type {Array<Array<Number>>}
     */
    this.coords = coords || [];
  }
}