import Node from './node';

export default class GraphNode extends Node {
  /**
   * @param {string} value
   * @param {Array<Array<Number>>} options.coords
   * @param {Array<GraphNode>} options.neighbours
   * @param {bool} options.hasVisited
   */
  constructor(value, { coords, neighbours, hasVisited }) {
    super(value, { coords });

    /**
     * @type {Array<GraphNode>}
     */
    this.neighbours = neighbours || [];

    /**
     * @type {bool}
     */
    this.hasVisited = hasVisited || false;
  }
};