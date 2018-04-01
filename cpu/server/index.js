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

      const usage = await getCpuUsage();

      const data = new Data(os, usage, ip);

      micro.send(response, 200, data);
    } catch (error) {
      handleError(micro, response, error);
    }
  });
});

module.exports = server;
