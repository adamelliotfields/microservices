const Boom = require('boom');

const handleNotFound = (micro, response) => {
  const { output } = Boom.notFound();
  const { statusCode, payload } = output;

  micro.send(response, statusCode, payload);
};

module.exports = handleNotFound;
