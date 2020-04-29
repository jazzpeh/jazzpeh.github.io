import GraphNode from './graphnode';
import Node from './node';

export default class Canvas {
  /**
   * @param {HTMLCanvasElement} element
   */
  constructor(element) {
    this.element = element;

    /**
     * @type {Number}
     */
    this.height = +getComputedStyle(this.element).getPropertyValue("height").slice(0, -2) * window.devicePixelRatio;

    /**
     * @type {Number}
     */
    this.width = +getComputedStyle(this.element).getPropertyValue("width").slice(0, -2) * window.devicePixelRatio;

    this.fixResolution();
  }

  /**
   * Fix low res issue
   */
  fixResolution() {
    this.element.setAttribute('height', this.height);
    this.element.setAttribute('width', this.width);
  }

  /**
   * Draw graph node
   * @param {Node|GraphNode} node
   * @param {Number} options.size
   * @param {string} options.color
   * @param {string} options.fontColor
   * @param {bool} options.ignoreNeighbour
   */
  drawNode(node, { size, color, fontColor, ignoreNeighbour }) {
    size = size || 50;
    color = color || '#fff';
    fontColor = fontColor || '#000';

    let ctx = this.element.getContext('2d');

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(node.coords[0], node.coords[1]);
    ctx.arc(node.coords[0], node.coords[1], size, 0, Math.PI * 2, false);
    ctx.fill();

    if (node.neighbours && !ignoreNeighbour) {
      for (const neighbour of node.neighbours) {
        ctx = this.element.getContext("2d");
        ctx.strokeStyle = color;
        ctx.moveTo(node.coords[0], node.coords[1]);
        ctx.lineTo(neighbour.coords[0], neighbour.coords[1]);
        ctx.stroke();
      }
    }

    ctx = this.element.getContext('2d');
    ctx.font = `${size - 10}px sans-serf`;
    ctx.fillStyle = fontColor;
    ctx.textAlign = 'center';
    ctx.fillText(node.value, node.coords[0], node.coords[1] + 10);
  }
}