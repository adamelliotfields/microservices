const micro = require('micro');
const morgan = require('morgan');
const os = require('os');
const ip = require('ip');

const { Data } = require('../models');
const { handleError } = require('../handlers');
const { getDiskUsage, getProduction } = require('../utils');

const production = getProduction();
const LOG_FORMAT = production ? 'combined' : 'dev';

const server = micro((request, response) => {
  morgan(LOG_FORMAT)(request, response, async error => {
    try {
      if (error) throw error;

      const { free, used, total } = await getDiskUsage();
      const meta = {
        hostname: os.hostname(),
        ip: ip.address()
      };

      const data = new Data(free, used, total, meta);

      micro.send(response, 200, data);
    } catch (error) {
      handleError(micro, response, error);
    }
  });
});

module.exports = server;
