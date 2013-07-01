var fs = require('fs')
  , zlib = require('zlib');

const OPTS = {
    level: zlib.Z_BEST_COMPRESSION
  , memLevel: zlib.Z_BEST_COMPRESSION
};

exports.compress = function() {

};

exports.compressSync = function() {

};
  /*
  var gzip = zlib.createGzip();
  var fs = require('fs');
  var inp = fs.createReadStream('input.txt');
  var out = fs.createWriteStream('input.txt.gz');

  inp.pipe(gzip).pipe(out);
  */
