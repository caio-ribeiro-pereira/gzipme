module.exports = process.env.COVERAGE
  ? require('./lib-cov/gzipme')
  : require('./lib/gzipme');