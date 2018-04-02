const { cpuUsage } = require('os-utils');

// Return a Promise so it can be awaited
// Takes 1 second to return
const getCpuUsage = () => (
  new Promise(resolve => {
    cpuUsage(usage => resolve({
      used: parseInt((usage * 100).toFixed(0)),
      free: parseInt(((1 - usage) * 100).toFixed(0))
    }));
  })
);

module.exports = getCpuUsage;
