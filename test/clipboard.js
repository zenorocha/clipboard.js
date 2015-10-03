import Clipboard from '../src/clipboard';
import ClipboardAction from '../src/clipboard-action';
import Delegate from 'delegate-events';

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

    describe('_resolveOptions', function() {
        before(() => {
            global.fn = function() {};
        });

        it('should set action as a function', () => {
            let clipboard = new Clipboard('.btn', {
                action: global.fn
            });

            assert.equal(global.fn, clipboard.action);
        });

        it('should set target as a function', () => {
            let clipboard = new Clipboard('.btn', {
                target: global.fn
            });

            assert.equal(global.fn, clipboard.target);
        });

        it('should set text as a function', () => {
            let clipboard = new Clipboard('.btn', {
                text: global.fn
            });

            assert.equal(global.fn, clipboard.text);
        });
    });

    describe('_delegateClick', function() {
        before(() => {
            global.spy = sinon.spy(Delegate, 'bind');
        });

        after(() => {
            global.spy.restore();
        });

        it('should delegate a click event to the passed selector', () => {
            let element = document.body;
            let selector = '.btn';
            let event = 'click';

            let clipboard = new Clipboard(selector);

            assert.ok(global.spy.calledOnce);
            assert.ok(global.spy.calledWith(element, selector, event));
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
