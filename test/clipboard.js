import Clipboard from '../src/clipboard';
import ClipboardAction from '../src/clipboard-action';

describe('Clipboard', () => {
    before(() => {
        global.button = document.createElement('button');
        global.button.setAttribute('class', 'btn');
        global.button.setAttribute('data-clipboard-text', 'foo');
        document.body.appendChild(global.button);

        global.event = {
            delegateTarget: global.button
        };
    });

    after(() => {
        document.body.innerHTML = '';
    });

    describe('#resolveOptions', function() {
        it('should set action as a function', () => {
            var fn = function() {};
            var clipboard = new Clipboard('.btn', {
                action: fn
            });
            assert.equal(fn, clipboard.action);
        });

        it('should set target as a function', () => {
            var fn = function() {};
            var clipboard = new Clipboard('.btn', {
                target: fn
            });
            assert.equal(fn, clipboard.target);
        });

        it('should set text as a function', () => {
            var fn = function() {};
            var clipboard = new Clipboard('.btn', {
                text: fn
            });
            assert.equal(fn, clipboard.text);
        });
    });

    describe('#initialize', () => {
        it('should create a new instance of ClipboardAction', () => {
            let clipboard = new Clipboard('.btn');

            clipboard.initialize(global.event);
            assert.instanceOf(clipboard.clipboardAction, ClipboardAction);
        });

        it('should throws exception target', done => {
            try {
                var clipboard = new Clipboard('.btn', {
                    target: function() {
                        return null;
                    }
                });
                clipboard.initialize(global.event);
            }
            catch(e) {
                assert.equal(e.message, 'Invalid "target" value, use a valid Element');
                done();
            }
        });
    });
});
