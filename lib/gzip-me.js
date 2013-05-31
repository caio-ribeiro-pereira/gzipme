var fs = require('fs')
  , zlib = require('zlib');

var compressor = {
    level: zlib.Z_BEST_COMPRESSION
  , memLevel: zlib.Z_BEST_COMPRESSION
};

var gzipme = function(args) {
  
};

module.exports = gzipme;