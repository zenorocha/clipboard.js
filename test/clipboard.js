import Clipboard from '../src/clipboard';

describe('Clipboard', () => {
    before(() => {
        let button = document.createElement('button');
        button.setAttribute('class', 'btn');
        document.body.appendChild(button);
    });

    describe('#constructor', () => {
        it('should throw an error since there was no arguments passed', done => {
            try {
                new Clipboard();
            }
            catch(e) {
                assert.equal(e.message, 'No matches were found for the provided selector');
                done();
            }
        });

        it('should throw an error since an empty selector has been passed', done => {
            try {
                new Clipboard('#abc');
            }
            catch(e) {
                assert.equal(e.message, 'No matches were found for the provided selector');
                done();
            }
        });
    });

    after(() => {
        document.body.innerHTML = '';
    });
});
