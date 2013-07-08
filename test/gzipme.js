var fs = require('fs')
  , path = require('path')
  , exec = require('child_process').exec
  , gzipme = require('../')
  , existsSync = 'existsSync' in fs ? fs.existsSync : path.existsSync 
;

describe('gzipme', function(){

  var testPath = __dirname + "/compress"
    , testFile = testPath + "/test.json"
    , testOutputFile = testPath + "/output.json"
    , testGzipFile = testFile + ".gz"
    , invalidFile = new Object()
    , testFileContent = '{"test": "this is the test.json"}'
  ;

  beforeEach(function(done) {
    setTimeout(function() {
      exec('mkdir -p '+ testPath, function() {
        fs.writeFileSync(testFile, testFileContent);
        done();
      });
    }, 50);
  });

  afterEach(function(done) {
    setTimeout(function() {
      exec('rm -rf '+ testPath, function() {
        done();
      });
    }, 50);
  });

  it('should compress test.json to test.json.gz', function(done){
    gzipme(testFile);
    var existGzip  = existsSync(testGzipFile);
    existGzip.should.be.true;
    done();
  });

  it('should compress test.json using best compress mode', function(done){
    gzipme(testFile, false, "best");
    var existGzip  = existsSync(testGzipFile);
    existGzip.should.be.true;
    done();
  });

  it('should compress test.json using fast compress mode', function(done){
    gzipme(testFile, false, "fast");
    var existGzip  = existsSync(testGzipFile);
    existGzip.should.be.true;
    done();
  });

  it('should compress test.json using invalid compress mode', function(done){
    gzipme(testFile, false, "invalid");
    var existGzip  = existsSync(testGzipFile);
    existGzip.should.be.true;
    done();
  });

  it('should compress test.json to test.json.gz', function(done){
    gzipme(testFile);
    var existGzip  = existsSync(testGzipFile);
    existGzip.should.be.true;
    done();
  });

  it('should compress test.json overwrite to test.json', function(done){
    gzipme(testFile, true);
    var existGzip  = existsSync(testGzipFile);
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
      var existDefault  = existsSync(testGzipFile);
      var existGzip  = existsSync(testOutputFile);
      existDefault.should.be.false;
      existGzip.should.be.true;
      done();
  });
});
