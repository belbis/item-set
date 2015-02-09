/**
 * based on https://github.com/alanshaw/nodeunit-lcov-coveralls-example
 */
module.exports = process.env.ITEMSET_COV
  ? require('./src-cov/set')
  : require('./src/set');