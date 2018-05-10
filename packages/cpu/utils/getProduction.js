const { NODE_ENV } = process.env;

const getProduction = () => NODE_ENV === 'production';

module.exports = getProduction;
