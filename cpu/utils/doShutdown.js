const { EOL } = require('os');

// Quit the process after all connections have closed
const doShutdown = () => {
  console.warn(`${EOL}Server shutting down...`);
  process.exit(0);
};

module.exports = doShutdown;
