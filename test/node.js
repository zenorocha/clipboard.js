var assert = require('chai').assert;
var browserify = require('browserify');

describe('Node', function() {
    it('should import the lib in a commonjs env without babel', function(done) {
        browserify('./dist/clipboard.js').bundle(function(err) {
            assert.equal(err, null);
            done();
        });
    });
});
