class Data {
  constructor (os, usage, ip) {
    this.model = os.cpus()[0]['model'];
    this.cores = os.cpus().length;
    this.used = usage.used;
    this.free = usage.free;
    this.meta = {
      hostname: os.hostname(),
      address: ip.address()
    };
  }
}

module.exports = Data;
