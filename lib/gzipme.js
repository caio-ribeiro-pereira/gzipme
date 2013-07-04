var fs = require('fs')
  , zlib = require('zlib');

const OPTS = {
    level: zlib.Z_BEST_COMPRESSION
  , memLevel: zlib.Z_BEST_COMPRESSION
};

module.exports = function(file, overwrite) {
  if (!fs.existsSync(file)) {
    throw new Error("File "+ file +" doesn't exist.");
  }
  try {
    var gzip = zlib.createGzip(OPTS);
    var gzFile = file + '.gz';
    if (overwrite && typeof overwrite === 'string') {
      gzFile = overwrite;
      overwrite = false;
    }
    var inputStream = fs.createReadStream(file);
    var outStream = fs.createWriteStream(gzFile);
    inputStream.pipe(gzip).pipe(outStream);
    if(overwrite) {
      fs.unlinkSync(file);
      fs.renameSync(gzFile, file);
    }
  } catch (e) {
    if (!overwrite && fs.existsSync(gzFile)) {
      fs.unlinkSync(gzFile);
    }
    throw new Error('Invalid file.');
  }
};
