const micro = require('micro');
const morgan = require('morgan');
const pretty = require('pretty-ms');
const { DateTime } = require('luxon');
const { EOL, hostname, uptime } = require('os');
const { address } = require('ip');

const isProduction = process.env.NODE_ENV === 'production';

const PORT = process.env.PORT || (isProduction ? 80 : 8080);
const HOST = isProduction ? '0.0.0.0' : 'localhost';
const LOG_FORMAT = isProduction ? 'combined' : 'dev';

// Returns an ISOString of the current local datetime
const getCurrent = () => DateTime.local().toString();
// Returns the UTC offset
const getOffset = () => (DateTime.local().offset / 60).toString() + ':00';
// Returns the pretty-formated system uptime
const getUptime = () => pretty((uptime() * 1000));
// Returns the time zone name
const getZone = () => DateTime.local().zoneName;
// Returns the name and IP address of the host
const getMeta = () => ({
  hostname: hostname(),
  ip: address()
});

// Quit the process after all connections have closed
const shutdown = () => {
  console.warn(`${EOL}Server shutting down...`);
  process.exit(0);
};

const server = micro((request, response) => {
  morgan(LOG_FORMAT)(request, response, error => {
    if (error) console.error(error);

    micro.send(response, 200, {
      current: getCurrent(),
      offset: getOffset(),
      uptime: getUptime(),
      zone: getZone(),
      meta: getMeta()
    });
  });
});

server.listen(PORT, HOST, () => {
  console.info(`Server listening at http://${HOST}:${PORT} ...`);
});

// Handle Ctrl-C
process.on('SIGINT', () => {
  server.close(shutdown);
});

// Docker sends SIGTERM followed by SIGKILL after 10 seconds
process.on('SIGTERM', () => {
  server.close(shutdown);
});
