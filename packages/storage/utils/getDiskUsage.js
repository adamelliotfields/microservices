const disk = require('diskusage');
const { platform } = require('os');

// Get root file system path for Windows or macOS/Linux
const path = platform() === 'win32' ? 'c:' : '/';

/**
 * Gets system disk usage.
 * @returns {Promise}
 */
const getDiskUsage = () => (
  new Promise((resolve, reject) => {
    disk.check(path, (error, usage) => {
      if (error) return reject(error);

      const free = parseInt((usage.free / (1024 * 1024)).toFixed(0));
      const total = parseInt((usage.total / (1024 * 1024)).toFixed(0));
      const used = total - free;

      return resolve({ free, used, total });
    });
  })
);

module.exports = getDiskUsage;
