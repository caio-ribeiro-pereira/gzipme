const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const OPTS = {
  best : {
      level: zlib.Z_BEST_COMPRESSION
    , memLevel: zlib.Z_BEST_COMPRESSION
  },
  fast : {
      level: zlib.Z_BEST_SPEED
    , memLevel: zlib.Z_BEST_SPEED
  }
};

module.exports = function(file, overwrite = false, mode = 'best', done = function() {}) {

  // check file existence
  if (!fs.existsSync(file)) {
    throw new Error(`File ${file} doesn't exist.`);
  }

  // real destination
  let gzFile = `${file}.gz`;
  if (overwrite && typeof overwrite === 'string') {
    gzFile = overwrite;
    overwrite = false;
  }

  // now the file paths
  const filePath = path.resolve(file)
    , gzFilePath = path.resolve(gzFile)
  ;

  try {
    let optMode = mode === 'fast' ? 'fast' : 'best'
      , gzOption = OPTS[optMode]
      , gzip = zlib.createGzip(gzOption)
    ;

    const inputStream = fs.createReadStream(filePath)
      , outStream = fs.createWriteStream(gzFilePath)
    ;
    inputStream.pipe(gzip).pipe(outStream);

    if (overwrite) {
      fs.unlinkSync(filePath);
      fs.renameSync(gzFilePath, filePath);
    }
    if (outStream && typeof done === 'function') {
      outStream.on('finish', done);
    } else {
      done();
    }
  } catch (e) {
    if (!overwrite && fs.existsSync(gzFilePath)) {
      fs.unlinkSync(gzFilePath);
    }
    throw new Error(e);
  }
};
