const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const OPTS = {
  best: {
    level: zlib.Z_BEST_COMPRESSION,
    memLevel: zlib.Z_BEST_COMPRESSION,
  },
  fast: {
    level: zlib.Z_BEST_SPEED,
    memLevel: zlib.Z_BEST_SPEED,
  },
};

const ALLOWED_OPTS = Object.keys(OPTS);

const isValidObject = (object) => object && (typeof object === 'object') && !Array.isArray(object);

module.exports = (file = '', params = {}) => (
  new Promise((resolve, reject) => {
    if (!file || typeof file !== 'string') {
      return reject(new Error('File must be a string.'));
    }

    if (!isValidObject(params)) {
      return reject(new Error('Params must be an object.'));
    }

    if (!fs.existsSync(file)) {
      return reject(new Error(`File ${file} doesn't exist.`));
    }

    const overwrite = params.overwrite || false;
    const mode = params.mode || 'best';
    const output = params.output || '';
    if (!ALLOWED_OPTS.includes(mode)) {
      return reject(new Error('Mode not allowed.'));
    }

    const gzFile = output || `${file}.gz`;
    const filePath = path.resolve(file);
    const gzFilePath = path.resolve(gzFile);

    try {
      const gzip = zlib.createGzip(OPTS[mode]);
      const inputStream = fs.createReadStream(filePath);
      const outStream = fs.createWriteStream(gzFilePath);

      inputStream.pipe(gzip).pipe(outStream);
      if (outStream) {
        outStream.on('finish', () => {
          if (overwrite) {
            fs.unlinkSync(filePath);
            fs.renameSync(gzFilePath, filePath);
          }
          return resolve();
        });
        return true;
      }
      return resolve();
    } catch (e) {
      if (!overwrite && fs.existsSync(gzFilePath)) {
        fs.unlinkSync(gzFilePath);
      }
      return reject(e);
    }
  })
);
