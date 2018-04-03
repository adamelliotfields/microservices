/** Data model class. */
class Data {
  /**
   * Constructor.
   * @param {number} free
   * @param {number} total
   * @param {object} meta
   */
  constructor (free, total, meta) {
    this.free = free;
    this.total = total;
    this.meta = meta;
  }
}

module.exports = Data;
