/** Data model class. */
class Data {
  /**
   * Constructor.
   * @param {string} model
   * @param {number} cores
   * @param {number} used
   * @param {number} free
   * @param {object} meta
   */
  constructor (model, cores, used, free, meta) {
    this.model = model;
    this.cores = cores;
    this.used = used;
    this.free = free;
    this.meta = meta;
  }
}

module.exports = Data;
