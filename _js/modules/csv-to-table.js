export default class CsvToTable {
  /**
   * @param {HTMLElement} element
   */
  constructor(element) {
    /**
     * @type {HTMLElement}
     */
    this.element = element;

    this.init();
  }

  /**
   * initialize
   */
  init() {
    const rows = this.element.textContent.split('\n');
    const data = [];

    for (let i = 0, len = rows.length; i < len; ++i) {
      const tag = i === 0 ? 'th' : 'td';
      data.push(`<tr><${tag}>${rows[i].split(',').join(`</${tag}><td>`)}</${tag}></tr>`);
    }

    const output = `<div class="table-responsive table-csv"><table class="table table-sm table-dark table-striped">${data.join('')}</table></div>`;
    console.log(output);
    this.element.parentElement.insertAdjacentHTML('afterend', output);
  }
}