// Modules
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const gzipme = require('../index.js');
// Variables
const testPath = `${__dirname}/compress`
  , testFile = `${testPath}/test.json`
  , testOutputFile = `${testPath}/output.json`
  , testGzipFile = `${testFile}.gz`
  , invalidFile = new Object()
  , testFileContent = '{"test": "this is the test.json"}'
;

describe('gzipme', () => {

  beforeEach(done => {
    exec('mkdir -p '+ testPath, () => {
      fs.writeFileSync(testFile, testFileContent);
      done();
    });
  });

  afterEach(done => {
    exec('rm -rf '+ testPath, () => {
      done();
    });
  });

  it('should compress test.json to test.json.gz using null params', (done) => {
    gzipme(testFile, null, null, () => {
      var existGzip  = fs.existsSync(testGzipFile);
      existGzip.should.be.true;
      done();
    });
  });

  it('should compress test.json using best compress mode', (done) => {
    gzipme(testFile, false, 'best', () => {
      var existGzip  = fs.existsSync(testGzipFile);
      existGzip.should.be.true;
      done();
    });
  });

  it('should compress test.json using fast compress mode', (done) => {
    gzipme(testFile, false, 'fast', () => {
      var existGzip  = fs.existsSync(testGzipFile);
      existGzip.should.be.true;
      done();
    });
  });

  it('should compress test.json using invalid for set best compress mode', (done) => {
    gzipme(testFile, false, 'invalid', () => {
      var existGzip  = fs.existsSync(testGzipFile);
      existGzip.should.be.true;
      done();
    });
  });

  it('should compress test.json overwrite to test.json', (done) => {
    gzipme(testFile, true, 'best', () => {
      var existGzip  = fs.existsSync(testGzipFile);
      existGzip.should.be.false;
      done();
    });
  });

  it('should throw error on compress file which does not exist', (done) => {
    (() => {
      gzipme(invalidFile);
    }).should.throwError(`File ${invalidFile} doesn't exist.`);
    done();
  });

  it('should compress test.json to specified output file', (done) => {
    gzipme(testFile, testOutputFile, 'best', () => {
      var existDefault  = fs.existsSync(testGzipFile);
      var existGzip  = fs.existsSync(testOutputFile);
      existDefault.should.be.false;
      existGzip.should.be.true;
      done();
    });
  });
});
