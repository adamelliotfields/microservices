/** Data model class. */
class Data {
  /**
   * Constructor.
   * @param {string} arch
   * @param {string} platform
   * @param {string} release
   * @param {string} uptime
   * @param {object} meta
   */
  constructor (arch, platform, release, uptime, meta) {
    this.arch = arch;
    this.platform = platform;
    this.release = release;
    this.uptime = uptime;
    this.meta = meta;
  }
}

module.exports = Data;
