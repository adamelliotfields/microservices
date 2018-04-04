const { EOL } = require('os');

/**
 * Prints to stdout and ends the process with a zero exit code.
 */
const handleShutdown = () => {
  console.warn(`${EOL}Server shutting down...`);
  process.exit(0);
};

module.exports = handleShutdown;
