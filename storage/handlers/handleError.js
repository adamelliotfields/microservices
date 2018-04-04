const { boomify } = require('boom');

/**
 * Handles any caught errors by sending an Error object and 500 status code.
 * @param {*} micro
 * @param {*} response
 * @param {Error} error
 */
const handleError = (micro, response, error) => {
  // `boomify` wraps the Error object in a Boom object
  // Note that Boom objects with a 500 code will send a generic error message,
  //   as you probably don't want detailed errors sent to the client
  const { output } = boomify(error, { statusCode: 500 });
  const { statusCode, payload } = output;

  // Caught errors are not logged by default
  console.error(error.message);

  micro.send(response, statusCode, payload);
};

module.exports = handleError;
