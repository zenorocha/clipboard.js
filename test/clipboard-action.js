import Clipboard from '../src/clipboard-action';
import ClipboardAction from '../src/clipboard-action';
import Emitter from 'tiny-emitter';

describe('ClipboardAction', () => {
    before(() => {
        global.input = document.createElement('input');
        global.input.setAttribute('id', 'input');
        global.input.setAttribute('value', 'abc');
        document.body.appendChild(global.input);

        global.paragraph = document.createElement('p');
        global.paragraph.setAttribute('id', 'paragraph');
        global.paragraph.textContent = 'abc';
        document.body.appendChild(global.paragraph);
    });

    after(() => {
        document.body.innerHTML = '';
    });

    describe('#constructor', () => {
        it('should throw an error since both "data-text" and "data-target" were passed', done => {
            try {
                new ClipboardAction({
                    text: 'foo',
                    target: 'input'
                });
            }
            catch(e) {
                assert.equal(e.message, 'Multiple attributes declared, use either "data-target" or "data-text"');
                done();
            }
        });

        it('should throw an error since neither "data-text" nor "data-target" were passed', done => {
            try {
                new ClipboardAction({
                    action: ''
                });
            }
            catch(e) {
                assert.equal(e.message, 'Missing required attributes, use either "data-target" or "data-text"');
                done();
            }
        });
    });

    describe('#set action', () => {
        it('should throw an error since "data-action" is invalid', done => {
            try {
                new ClipboardAction({
                    text: 'foo',
                    action: 'paste'
                });
            }
            catch(e) {
                assert.equal(e.message, 'Invalid "data-action" value, use either "copy" or "cut"');
                done();
            }
        });
    });

    describe('#set target', () => {
        it('should throw an error since "data-target" do not match any element', done => {
            try {
                new ClipboardAction({
                    target: 'foo'
                });
            }
            catch(e) {
                assert.equal(e.message, 'Invalid "data-target" selector, use a value that matches an ID');
                done();
            }
        });
    });

    describe('#selectText', () => {
        it('should create a fake element and select its value', () => {
            let clip = new ClipboardAction({
                emitter: new Emitter(),
                text: 'blah'
            });

            assert.equal(clip.selectedText, clip.fakeElem.value);
        });
    });

    describe('#removeFake', () => {
        it('should remove a temporary fake element', () => {
            let clip = new ClipboardAction({
                emitter: new Emitter(),
                text: 'blah'
            });

            clip.removeFake();

            assert.equal(clip.fakeElem, null);
        });
    });

    describe('#selectTarget', () => {
        it('should select text from editable element', () => {
            let clip = new ClipboardAction({
                emitter: new Emitter(),
                target: 'input'
            });

            assert.equal(clip.selectedText, clip.target.value);
        });

        it('should select text from non-editable element', () => {
            let clip = new ClipboardAction({
                emitter: new Emitter(),
                target: 'paragraph'
            });

            assert.equal(clip.selectedText, clip.target.textContent);
        });
    });

    describe('#copyText', () => {
        before(() => {
            global.stub = sinon.stub(document, 'execCommand');
        });

        after(() => {
            global.stub.restore();
        });

        it('should fire a success event on browsers that support copy command', done => {
            global.stub.returns(true);

            let emitter = new Emitter()

            emitter.on('success', () => {
                done();
            });

            let clip = new ClipboardAction({
                emitter: emitter,
                target: 'input'
            });
        });

        it('should fire an error event on browsers that support copy command', done => {
            global.stub.returns(false);

            let emitter = new Emitter()

            emitter.on('error', () => {
                done();
            });

            let clip = new ClipboardAction({
                emitter: emitter,
                target: 'input'
            });
        });
    });

    describe('#handleResult', () => {
        it('should fire a success event with certain properties', done => {
            let clip = new ClipboardAction({
                emitter: new Emitter(),
                target: 'input'
            });

            clip.emitter.on('success', (e) => {
                assert.property(e, 'action');
                assert.property(e, 'text');
                assert.property(e, 'trigger');
                assert.property(e, 'clearSelection');

                done();
            });

            clip.handleResult(true);
        });

        it('should fire a error event with certain properties', done => {
            let clip = new ClipboardAction({
                emitter: new Emitter(),
                target: 'input'
            });

            clip.emitter.on('error', (e) => {
                assert.property(e, 'action');
                assert.property(e, 'trigger');
                assert.property(e, 'clearSelection');

                done();
            });

            clip.handleResult(false);
        });
    });

    describe('#clearSelection', () => {
        it('should remove focus from target and text selection', () => {
            let clip = new ClipboardAction({
                emitter: new Emitter(),
                target: 'input'
            });

            clip.clearSelection();

            let selectedElem = document.activeElement;
            let selectedText = window.getSelection().toString();

            assert.equal(selectedElem, document.body);
            assert.equal(selectedText, '');
        });
    });
});
