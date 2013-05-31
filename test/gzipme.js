var assert = require("assert")
  , gzipme = require('../');

describe('gzipme', function(){

  var testfile = __dirname + "/test.json";

  beforeEach(function(done){
    var buffer = "{test: 'this is the test.json'}";
    fs.writeFile(testfile, buffer, function (err) {
      done();
    });    
  });

  it('should generate a gzip version of the file test.json', function(){
    var testgzfile = gzipme(testfile);
    assert.equal(false, testgzfile, testfile);
    assert.equal(true, testgzfile, testfile + ".gz");
  });

});