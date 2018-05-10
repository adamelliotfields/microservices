const { NODE_ENV } = process.env;

/**
 * Gets whether the production environment variable has been set.
 * @returns {boolean}
 */
const getProduction = () => NODE_ENV === 'production';

module.exports = getProduction;
