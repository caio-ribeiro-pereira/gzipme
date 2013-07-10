var fs = require('fs')
  , path = require('path')
  , zlib = require('zlib')
  , exists = 'existsSync' in fs ? fs.existsSync : path.existsSync 
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

function getCompressOption(mode) {
  return OPTS[mode && ('fast' == mode || 'best' == mode) || "best"];
}

module.exports = function(file, overwrite, mode) {
  if (!exists(file)) {
    throw new Error("File "+ file +" doesn't exist.");
  }
  try {
    var gzOption = getCompressOption(mode);
    var gzip = zlib.createGzip(gzOption);
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
  } catch (e) {
    if (!overwrite && exists(gzFilePath)) {
      fs.unlinkSync(gzFilePath);
    }
    throw new Error(e);
  }
  if(overwrite) {
    fs.unlinkSync(filePath);
    fs.renameSync(gzFilePath, filePath);
  }
};