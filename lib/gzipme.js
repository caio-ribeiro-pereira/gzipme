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

module.exports = function(file, overwrite, mode) {
  if (!existsSync(file)) {
    throw new Error("File "+ file +" doesn't exist.");
  }
  try {
    mode = mode && ('fast' == mode || 'best' == mode) || "best";
    var gzip = zlib.createGzip(OPTS[mode]);
    var gzFile = file + '.gz';
    if (overwrite && typeof overwrite === 'string') {
      gzFile = overwrite;
      overwrite = false;
    }
    var filePath = path.resolve(file);
    var gzFilePath = path.resolve(gzFile);
    var inputStream = fs.createReadStream(filePath);
    var outStream = fs.createWriteStream(gzFilePath);
    inputStream.pipe(gzip).pipe(outStream);
    if(overwrite) {
      fs.unlinkSync(filePath);
      fs.renameSync(gzFilePath, filePath);
    }
  } catch (e) {
    if (!overwrite && existsSync(gzFilePath)) {
      fs.unlinkSync(gzFilePath);
    }
    throw new Error("The "+ file +" is invalid.");
  }
};
