const micro = require('micro');
const morgan = require('morgan');
const { EOL, cpus, hostname } = require('os');
const { cpuUsage, cpuFree } = require('os-utils');
const { address } = require('ip');

const isProduction = process.env.NODE_ENV === 'production';

const PORT = process.env.PORT || (isProduction ? 80 : 8080);
const HOST = isProduction ? '0.0.0.0' : 'localhost';
const LOG_FORMAT = isProduction ? 'combined' : 'dev';

// Make cpuUsage and cpuFree return a Promise so they can be awaited
const getCpuUsage = () => (
  new Promise(resolve => {
    cpuUsage(usage => resolve(`${(usage * 100).toFixed(0)}%`));
  })
);

const getCpuFree = () => (
  new Promise(resolve => {
    cpuFree(free => resolve(`${(free * 100).toFixed(0)}%`));
  })
);

// Quit the process after all connections have closed
const shutdown = () => {
  console.warn(`${EOL}Server shutting down...`);
  process.exit(0);
};

const server = micro((request, response) => {
  morgan(LOG_FORMAT)(request, response, async error => {
    if (error) console.error(error);

    const model = cpus()[0]['model'];
    const cores = cpus().length;

    const usage = await getCpuUsage();
    const free = await getCpuFree();

    micro.send(response, 200, {
      model,
      cores,
      usage,
      free,
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
