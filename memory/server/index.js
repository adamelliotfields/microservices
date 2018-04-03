const micro = require('micro');
const morgan = require('morgan');
const os = require('os');
const ip = require('ip');

const { Data } = require('../models');
const { handleError } = require('../handlers');
const { getProduction } = require('../utils');

const production = getProduction();
const LOG_FORMAT = production ? 'combined' : 'dev';

const server = micro((request, response) => {
  morgan(LOG_FORMAT)(request, response, async error => {
    try {
      if (error) throw error;

      // Convert to megabytes from bytes
      // Unfortunately, this includes buffers and cached memory,
      //   so it is not representative of available memory
      const free = parseInt((os.freemem() / (1024 * 1024)).toFixed(0));
      const total = parseInt((os.totalmem() / (1024 * 1024)).toFixed(0));
      const meta = {
        hostname: os.hostname(),
        ip: ip.address()
      };

      const data = new Data(free, total, meta);

      micro.send(response, 200, data);
    } catch (error) {
      handleError(micro, response, error);
    }
  });
});

module.exports = server;
