var fs = require('fs')
  , zlib = require('zlib');

const OPTS = {
    level: zlib.Z_BEST_COMPRESSION
  , memLevel: zlib.Z_BEST_COMPRESSION
};

var gzipme = function(args, callback) {
  fs.readFile(args, function(err, data) {
    var tmpPath = "./tmp/" + args;
    var gzPath = "." + args + ".gz";
    
    var inStream = fs.createReadStream(tmpPath);
    var outStream = fs.createWriteStream(dotBuildFilePath);
    inStream.pipe(zlib.createGzip(OPTS)).pipe(outStream);
    callback(gz);
  });
};

module.exports = gzipme;