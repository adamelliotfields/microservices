const { cpuUsage } = require('os-utils');

// Return a Promise so it can be awaited
// Takes 1 second to return
const getCpuUsage = () => (
  // TODO: Add reject
  new Promise(resolve => {
    cpuUsage(usage => resolve(parseInt((usage * 100).toFixed(0))));
  })
);

module.exports = getCpuUsage;
