import GraphNode from './graphnode';
import Queue from './queue';

export default class Graph {
  /**
   * @param {Array<GraphNode>} nodeList
   */
  constructor(nodeList) {
    this.nodeList = nodeList;
  }

  /**
   * Perform breadth first search algorithm
   * @param {Function} callback
   */
  bfs(callback) {
    for (const node of this.nodeList) {
      if (node.hasVisited) continue;
      this._bfsVisit(node, callback);
    }
  }

  /**
   * BFS internal method
   * @private
   * @param {GraphNode} node
   * @param {Function} callback
   */
  _bfsVisit(node, callback) {
    const queue = new Queue();
    queue.enqueue(node);
    while(!queue.isEmpty()) {
      const presentNode = queue.dequeue();
      if (presentNode.hasVisited) continue;

      presentNode.hasVisited = true;
      if (typeof callback === 'function') {
        callback(presentNode);
      }

      for (const neighbour of presentNode.neighbours) {
        if (neighbour.hasVisited) continue;
        queue.enqueue(neighbour);
      }
    }
  }

  /**
   * Perform depth first search algorithm
   * @param {Function} callback
   */
  dfs(callback) {
    for (const node of this.nodeList) {
      if (node.hasVisited) continue;
      this._dfsVisit(node, callback);
    }
  }

   /**
   * DFS internal method
   * @private
   * @param {GraphNode} node
   * @param {Function} callback
   */
  _dfsVisit(node, callback) {
    const stack = [];
    stack.push(node);
    while(stack.length > 0) {
      const presentNode = stack.pop();
      if (presentNode.hasVisited) continue;

      presentNode.hasVisited = true;
      if (typeof callback === 'function') {
        callback(presentNode);
      }

      for (const neighbour of presentNode.neighbours) {
        if (neighbour.hasVisited) continue;
        stack.push(neighbour);
      }
    }
  }

  /**
   * Add an undirected edge between 2 nodes
   * @param {Number} i
   * @param {Number} j
   */
  addUndirectedEdge(i, j) {
    const first = this.nodeList[i-1];
    const second = this.nodeList[j-1];
    first.neighbours.push(second);
    second.neighbours.push(first);
  }

  reset() {
    for (const node of this.nodeList) {
      node.hasVisited = false;
    }
  }
}