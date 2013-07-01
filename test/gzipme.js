var fs = require('fs')
  , exec = require('child_process').exec
  , gzipme = require('../');

describe('gzipme', function(){

  var testPath = __dirname + "/compress"
    , testFile = testPath + "/test.json"
    , testGzipFile = testFile + ".gz"
    , invalidFile = new Object()
    , testFileContent = '{"test": "this is the test.json"}'
  ;

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
    var files = fs.readdirSync(testPath);
    var stat  = fs.statSync(testGzipFile);
    
    files.should.have.lengthOf(2);  
    stat.isFile().should.be.true;
    done();
  });

  it('should compress test.json overwrite to test.json', function(done){
    gzipme(testFile, true);
    var files = fs.readdirSync(testPath);
    var stat  = fs.statSync(testFile);
    
    files.should.have.lengthOf(1);  
    stat.isFile().should.be.true;
    done();
  });

  it('should throw error on compress invalid file', function(done){
    (function(){
      gzipme(invalidFile);
    }).should.throwError(/^Invalid file.*/);
    done();
  });

});