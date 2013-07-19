var fs = require('fs')
  , path = require('path')
  , zlib = require('zlib')
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

module.exports = function(file, overwrite, mode, done) {
  if (!fs.existsSync(file)) {
    throw new Error("File "+ file +" doesn't exist.");
  }
  try {
    var gzOption = getCompressOption(mode)
      , gzip = zlib.createGzip(gzOption)
      , gzFile = file + '.gz'
    ;
    if (overwrite && typeof overwrite === 'string') {
      gzFile = overwrite;
      overwrite = false;
    }

    var filePath = path.resolve(file)
      , gzFilePath = path.resolve(gzFile)
      , inputStream = fs.createReadStream(filePath)
      , outStream = fs.createWriteStream(gzFilePath)
    ;
    inputStream.pipe(gzip).pipe(outStream);
    
    if(overwrite) {
      fs.unlinkSync(filePath);
      fs.renameSync(gzFilePath, filePath);
    } 
  } catch (e) {
    if (!overwrite && fs.existsSync(gzFilePath)) {
      fs.unlinkSync(gzFilePath);
    }
    throw new Error(e);
  }
  if(typeof done == "function") { done(); }
};