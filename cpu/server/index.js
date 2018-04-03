const micro = require('micro');
const morgan = require('morgan');
const os = require('os');
const ip = require('ip');

const { Data } = require('../models');
const { handleError } = require('../handlers');
const { getCpuUsage, getProduction } = require('../utils');

const production = getProduction();
const LOG_FORMAT = production ? 'combined' : 'dev';

const server = micro((request, response) => {
  // https://github.com/expressjs/morgan#vanilla-http-server
  morgan(LOG_FORMAT)(request, response, async error => {
    try {
      if (error) throw error;

      const { used, free } = await getCpuUsage();

      const { model } = os.cpus()[0];
      const cores = os.cpus().length;
      const meta = {
        hostname: os.hostname(),
        address: ip.address()
      };

      const data = new Data(model, cores, used, free, meta);

      micro.send(response, 200, data);
    } catch (error) {
      handleError(micro, response, error);
    }
  });
});

module.exports = server;
