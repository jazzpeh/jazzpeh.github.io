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

    this.init();
  }

  /**
   * Initialises
   */
  init() {
    this.fixResolution();
    this.attachEvents();
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
   * Attach events
   */
  attachEvents() {
    window.addEventListener('resize', this.fixResolution.bind(this));
  }

  /**
   * Draw graph node
   * @param {Node|GraphNode} node
   * @param {Number} options.size
   * @param {string} options.color
   * @param {string} options.fontColor
   * @param {string} options.lineColor
   * @param {bool} options.ignoreNeighbour
   */
  drawNode(node, { size, color, fontColor, lineColor, ignoreNeighbour }) {
    if (!this.ctx) return;

    size = (size || 20);
    color = color || '#fff';
    fontColor = fontColor || '#000';
    lineColor = lineColor || '#fff';

    if (node.neighbours && !ignoreNeighbour) {
      for (const neighbour of node.neighbours) {
        this.ctx.strokeStyle = lineColor;

        let startX = node.coords[0];
        let startY = node.coords[1];
        let endX = neighbour.coords[0];
        let endY = neighbour.coords[1];

        if (startX === endX) {
          endY += size;
        } else if (startY === endY) {
          endX += size;
        } else {
          if (endX > startX) {
            startX += size;
          } else {
            endX += size;
          }

          if (endY > startY) {
            startY += size/2;
          } else {
            endY += size/2;
          }
        }


        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
      }
    }

    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.arc(node.coords[0], node.coords[1], size, 0, Math.PI * 2, false);
    this.ctx.fill();

    this.ctx.font = `${size - 5}px sans-serf`;
    this.ctx.fillStyle = fontColor;
    this.ctx.textAlign = 'center';
    this.ctx.fillText(node.value, node.coords[0], node.coords[1] + 5);
  }

  /**
   * Draw graph nodes
   * @param {Array<Node>|Array<GraphNode>} nodes
   * @param {Number} options.size
   * @param {Array<string>} options.colors
   * @param {Array<string>} options.fontColors
   * @param {bool} options.ignoreNeighbour
   */
  drawNodes(nodes, { size, colors, fontColors, ignoreNeighbour }) {
    nodes.forEach((n, i) => {
      let color = '';
      if (colors && i < colors.length - 1) {
        color = colors[i];
      }

      let fontColor = '';
      if (fontColors && i < fontColors.length - 1) {
        fontColor = fontColors[i];
      }

      this.drawNode(n, { size, color, fontColors, ignoreNeighbour });
    });
  }
}