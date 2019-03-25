var expect  = require('chai').expect;
var request = require('request');

describe('Page status and Content', function(){
  it('Page Content', function(done) {
      request('http://localhost:3000' , function(error, response, body) {
          expect(body).to.equal('Hello World\n');
          done();
      });
  });
  it('Page Status', function(done) {
      request('http://localhost:3000' , function(error, response, body) {
          expect(response.statusCode).to.equal(200);
          done();
      });
  });
});
