export default class QuickSort {
  /**
   * @param {Array<number>} arr
   * @param {Function} callback
   */
  constructor(arr, callback) {
    /**
     * @type {Array<number>}
     */
    this.arr = [...arr];

    /**
     * @type {Function}
     */
    this.callback = callback;

    this._sort(0, this.arr.length - 1);
  }

  /**
   * Quick sort algorithm
   * @private
   * @param {number} start
   * @param {number} end
   */
  _sort(start, end) {
    if (start >= end) return;
    const pivot = this._partition(start, end);
    if (typeof this.callback === 'function') {
      this.callback([...this.arr], pivot);
    }
    this._sort(start, pivot - 1);
    this._sort(pivot + 1, end);
  }

  /**
   * Parition the array smaller numbers brought
   * to left and bigger numbers brought to right
   * @private
   * @param {number} p
   * @param {number} q
   * @returns {number}
   */
  _partition(p, q) {
    const pivot = q;
    let i = p - 1;
    for (let j = p, len = q; j <= q; ++j) {
      if (this.arr[j] > this.arr[pivot]) continue;
      ++i;
      const temp = this.arr[i];
      this.arr[i] = this.arr[j];
      this.arr[j] = temp;
    }
    return i;
  }
}