const micro = require('micro');
const morgan = require('morgan');
const os = require('os');
const pretty = require('pretty-ms');
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

      const arch = os.arch();
      const platform = os.platform();
      const release = os.release();
      // Convert seconds to milliseconds so pretty-ms can convert it
      const uptime = pretty((os.uptime() * 1000));
      const meta = {
        hostname: os.hostname(),
        ip: ip.address()
      };

      const data = new Data(arch, platform, release, uptime, meta);

      micro.send(response, 200, data);
    } catch (error) {
      handleError(micro, response, error);
    }
  });
});

module.exports = server;
