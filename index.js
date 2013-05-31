module.exports = process.env.COVERAGE
  ? require('./lib-cov/gzip-me')
  : require('./lib/gzip-me');