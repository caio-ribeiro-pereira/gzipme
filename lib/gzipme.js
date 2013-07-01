var fs = require('fs')
  , zlib = require('zlib');

const OPTS = {
    level: zlib.Z_BEST_COMPRESSION
  , memLevel: zlib.Z_BEST_COMPRESSION
};

module.exports = function(file, overwrite) {
  var gzip = zlib.createGzip(OPTS);
  try {
    var inputStream = fs.createReadStream(file);
    var gzFile = file + '.gz';
    var outStream = fs.createWriteStream(gzFile);
    inputStream.pipe(gzip).pipe(outStream);
    if(overwrite) {
      fs.unlinkSync(file);
      fs.renameSync(gzFile, file);
    }
  } catch (e) {
    throw new Error('Invalid file.');
  }
};