var fs = require('fs')
  , zlib = require('zlib');

var compressor = {
    level: zlib.Z_BEST_COMPRESSION
  , memLevel: zlib.Z_BEST_COMPRESSION
};

var gzipme = function(args, callback) {
  fs.readFile(args, function(err, data) {
    var gz = args + ".gz";
    fs.writeFile(gz, data, function(err) {
      callback(gz);
    });
  });
};

module.exports = gzipme;