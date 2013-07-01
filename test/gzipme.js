var fs = require('fs')
  , gzipme = require('../');

describe('gzipme', function(){

  var testfile = __dirname "test.json"
    , testgzfile = testfile + ".gz";

  beforeEach(function(done) {
    var buffer = '{"test": "this is the test.json"}';
    fs.writeFileSync(testfile, buffer);
    done();
  });

  afterEach(function(done) {
    fs.unlinkSync(testfile);
    fs.unlinkSync(testgzfile);
    done();
  });

  it('should compress test.json to test.json.gz', function(done){
    
  });

  it('should compressSync test.json to test.json.gz', function(done){
    
  });

});