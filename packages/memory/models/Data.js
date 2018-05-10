/** Data model class. */
class Data {
  /**
   * Constructor.
   * @param {number} free
   * @param {number} used
   * @param {number} total
   * @param {object} meta
   */
  constructor (free, used, total, meta) {
    this.free = free;
    this.used = used;
    this.total = total;
    this.meta = meta;
  }
}

module.exports = Data;
