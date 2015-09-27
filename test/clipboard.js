import Clipboard from '../src/clipboard';
import ClipboardAction from '../src/clipboard-action';

describe('Clipboard', () => {
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

    describe('#initialize', () => {
        before(() => {
            global.button = document.createElement('button');
            global.button.setAttribute('class', 'btn');
            global.button.setAttribute('data-text', 'foo');
            document.body.appendChild(global.button);

            global.event = {
                delegateTarget: global.button
            };
        });

        after(() => {
            document.body.innerHTML = '';
        });

        it('should create a new instance of ClipboardAction', () => {
            let clipboard = new Clipboard('.btn');

            clipboard.initialize(global.event);
            assert.instanceOf(clipboard.clipboardAction, ClipboardAction);
        });
    });
});
