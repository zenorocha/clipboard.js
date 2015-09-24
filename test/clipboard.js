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

        it('should create a NodeList from selector and store it in a "triggers" property', () => {
            let clipboard = new Clipboard('.btn');
            return assert.instanceOf(clipboard.triggers, NodeList);
        });
    });

    after(() => {
        document.body.innerHTML = '';
    });
});
