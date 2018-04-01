class Data {
  constructor (os, usage, ip) {
    this.model = os.cpus()[0]['model'];
    this.cores = os.cpus().length;
    this.usage_pct = usage;
    this.free_pct = 100 - usage;
    this.meta = {
      hostname: os.hostname(),
      address: ip.address()
    };
  }
}

module.exports = Data;
