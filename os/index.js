const micro = require('micro');
const morgan = require('morgan');
const { EOL, arch, hostname, platform, release } = require('os');
const { address } = require('ip');

const isProduction = process.env.NODE_ENV === 'production';

const PORT = process.env.PORT || (isProduction ? 80 : 8080);
const HOST = isProduction ? '0.0.0.0' : 'localhost';
const LOG_FORMAT = isProduction ? 'combined' : 'dev';

// Quit the process after all connections have closed
const shutdown = () => {
  console.warn(`${EOL}Server shutting down...`);
  process.exit(0);
};

const server = micro((request, response) => {
  morgan(LOG_FORMAT)(request, response, error => {
    if (error) console.error(error);

    micro.send(response, 200, {
      arch: arch(),
      platform: platform(),
      release: release(),
      meta: {
        hostname: hostname(),
        ip: address()
      }
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
