const micro = require('micro');
const morgan = require('morgan');
const { EOL, freemem, hostname, platform, totalmem } = require('os');
const { address } = require('ip');
const free = require('free-memory');

const isProduction = process.env.NODE_ENV === 'production';

const PORT = process.env.PORT || (isProduction ? 80 : 8080);
const HOST = isProduction ? '0.0.0.0' : 'localhost';
const LOG_FORMAT = isProduction ? 'combined' : 'dev';

// Make free return a Promise so it can be awaited
const getFreeMemory = () => (
  new Promise((resolve, reject) => {
    free((error, mem) => {
      if (error) reject(error.message);

      // Convert to megabytes from kilobytes
      resolve({
        total: parseInt((mem.mem.total / 1024)),
        used: parseInt((mem.mem.used / 1024)),
        free: parseInt((mem.mem.free / 1024)),
        shared: parseInt((mem.mem.shared / 1024)),
        buffers: parseInt((mem.mem.buffers / 1024)),
        cached: parseInt((mem.mem.cached / 1024)),
        usable: parseInt((mem.mem.usable / 1024))
      });
    });
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

    // If Windows, just use free and total from the OS module
    if (platform() === 'win32') {
      // Convert to megabytes from bytes
      const memory = {
        free: parseInt((freemem() / (1024 * 1024))),
        total: parseInt((totalmem() / (1024 * 1024)))
      };

      micro.send(response, 200, {
        memory,
        meta: {
          hostname: hostname(),
          ip: address()
        }
      });
    // Otherwise, use free-memory
    } else {
      try {
        const memory = await getFreeMemory();

        micro.send(response, 200, {
          memory,
          meta: {
            hostname: hostname(),
            ip: address()
          }
        });
      } catch (error) {
        micro.send(response, 500, {
          error
        });
      }
    }
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
