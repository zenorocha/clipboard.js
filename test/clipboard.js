var assert = chai.assert;

describe('Clipboard', () => {
    describe('#constructor', () => {
        it('should throw an error since there was no arguments passed', done => {
            try {
                new Clipboard();
            }
            catch(e) {
                done();
            }
        });

        it('should throw an error since an empty selector has been passed', done => {
            try {
                new Clipboard('#abc');
            }
            catch(e) {
                done();
            }
        });

        it('should create a NodeList and store it in a property', () => {
            let clipboard = new Clipboard('.btn');
            return assert.instanceOf(clipboard.triggers, NodeList);
        });
    });
});
