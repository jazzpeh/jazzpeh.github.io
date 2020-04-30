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
    this.dpi = window.devicePixelRatio;

    /**
     * @type {CanvasRenderingContext2D|undefined}
     */
    this.ctx;

    this.fixResolution();
  }

  /**
   * Fix low res issue
   */
  fixResolution() {
    const sizes = this.element.getBoundingClientRect();

    this.element.width = sizes.width * this.dpi;
    this.element.height = sizes.height * this.dpi;

    this.ctx = this.element.getContext('2d');
    this.ctx.scale(this.dpi, this.dpi);
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
    if (!this.ctx) return;

    size = (size || 20);
    color = color || '#fff';
    fontColor = fontColor || '#000';

    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.moveTo(node.coords[0], node.coords[1]);
    this.ctx.arc(node.coords[0], node.coords[1], size, 0, Math.PI * 2, false);
    this.ctx.fill();

    if (node.neighbours && !ignoreNeighbour) {
      for (const neighbour of node.neighbours) {
        this.ctx.strokeStyle = color;
        this.ctx.moveTo(node.coords[0], node.coords[1]);
        this.ctx.lineTo(neighbour.coords[0], neighbour.coords[1]);
        this.ctx.stroke();
      }
    }

    this.ctx.font = `${size - 5}px sans-serf`;
    this.ctx.fillStyle = fontColor;
    this.ctx.textAlign = 'center';
    this.ctx.fillText(node.value, node.coords[0], node.coords[1] + 5);
  }
}