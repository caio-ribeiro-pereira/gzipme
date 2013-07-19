// Modules
var fs = require('fs')
  , path = require('path')
  , exec = require('child_process').exec
  , gzipme = require('../')
// Variables
  , testPath = __dirname + "/compress"
  , testFile = testPath + "/test.json"
  , testOutputFile = testPath + "/output.json"
  , testGzipFile = testFile + ".gz"
  , invalidFile = new Object()
  , testFileContent = '{"test": "this is the test.json"}'
;

describe('gzipme', function(){

  beforeEach(function(done) {
    exec('mkdir -p '+ testPath, function() {
      fs.writeFileSync(testFile, testFileContent);
      done();
    });
  });

  afterEach(function(done) {
    exec('rm -rf '+ testPath, function() {
      done();
    });
  });

  it('should compress test.json to test.json.gz', function(done){
    gzipme(testFile);
    var existGzip  = fs.existsSync(testGzipFile);
    existGzip.should.be.true;
    done();
  });

  it('should compress test.json using best compress mode', function(done){
    gzipme(testFile, false, "best");
    var existGzip  = fs.existsSync(testGzipFile);
    existGzip.should.be.true;
    done();
  });

  it('should compress test.json using fast compress mode', function(done){
    gzipme(testFile, false, "fast");
    var existGzip  = fs.existsSync(testGzipFile);
    existGzip.should.be.true;
    done();
  });

  it('should compress test.json using invalid compress mode', function(done){
    gzipme(testFile, false, "invalid");
    var existGzip  = fs.existsSync(testGzipFile);
    existGzip.should.be.true;
    done();
  });

  it('should compress test.json to test.json.gz', function(done){
    gzipme(testFile);
    var existGzip  = fs.existsSync(testGzipFile);
    existGzip.should.be.true;
    done();
  });

  it('should compress test.json overwrite to test.json', function(done){
    gzipme(testFile, true);
    var existGzip  = fs.existsSync(testGzipFile);
    existGzip.should.be.false;
    done();
  });

  it('should throw error on compress file which does not exist', function(done){
    (function(){
      gzipme(invalidFile);
    }).should.throwError("File "+invalidFile+" doesn't exist.");
    done();
  });

  it('should compress test.json to specified output file', function(done){
      gzipme(testFile, testOutputFile);
      var existDefault  = fs.existsSync(testGzipFile);
      var existGzip  = fs.existsSync(testOutputFile);
      existDefault.should.be.false;
      existGzip.should.be.true;
      done();
  });
});
