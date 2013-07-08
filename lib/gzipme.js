var fs = require('fs')
  , path = require('path')
  , zlib = require('zlib')
  , existsSync = 'existsSync' in fs ? fs.existsSync : path.existsSync 
;

const OPTS = {
  "best" : {
      level: zlib.Z_BEST_COMPRESSION
    , memLevel: zlib.Z_BEST_COMPRESSION
  },
  "fast" : {
      level: zlib.Z_BEST_SPEED
    , memLevel: zlib.Z_BEST_SPEED
  }
};

module.exports = function(file, overwrite, compress_mode) {
  if (!existsSync(file)) {
    throw new Error("File "+ file +" doesn't exist.");
  }
  try {
    compress_mode = compress_mode || "best";
    var gzip = zlib.createGzip(OPTS[compress_mode]);
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
    if (!overwrite && existsSync(gzFile)) {
      fs.unlinkSync(gzFile);
    }
    throw new Error("The "+ file +" is invalid.");
  }
};
