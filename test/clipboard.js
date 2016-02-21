import Clipboard from '../src/clipboard';
import ClipboardAction from '../src/clipboard-action';
import listen from 'good-listener';

describe('Clipboard', () => {
    before(() => {
        global.button = document.createElement('button');
        global.button.setAttribute('class', 'btn');
        global.button.setAttribute('data-clipboard-text', 'foo');
        document.body.appendChild(global.button);

        global.span = document.createElement('span');
        global.span.innerHTML = 'bar';

        global.button.appendChild(span);

        global.event = {
            target: global.button,
            currentTarget: global.button
        };
    });

    after(() => {
        document.body.innerHTML = '';
    });

    describe('#resolveOptions', () => {
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

    describe('#listenClick', () => {
        it('should add a click event listener to the passed selector', () => {
            let clipboard = new Clipboard('.btn');
            assert.isObject(clipboard.listener);
        });
    });

    describe('#onClick', () => {
        it('should create a new instance of ClipboardAction', () => {
            let clipboard = new Clipboard('.btn');

            clipboard.onClick(global.event);
            assert.instanceOf(clipboard.clipboardAction, ClipboardAction);
        });

        it('should use an event\'s currentTarget when not equal to target', () => {
            let clipboard = new Clipboard('.btn');
            let bubbledEvent = { target: global.span, currentTarget: global.button };

            clipboard.onClick(bubbledEvent);
            assert.instanceOf(clipboard.clipboardAction, ClipboardAction);
        });

        it('should throw an exception when target is invalid', done => {
            try {
                var clipboard = new Clipboard('.btn', {
                    target: function() {
                        return null;
                    }
                });

                clipboard.onClick(global.event);
            }
            catch(e) {
                assert.equal(e.message, 'Invalid "target" value, use a valid Element');
                done();
            }
        });
    });

    describe('#destroy', () => {
        it('should destroy an existing instance of ClipboardAction', () => {
            let clipboard = new Clipboard('.btn');

            clipboard.onClick(global.event);
            clipboard.destroy();

            assert.equal(clipboard.clipboardAction, null);
        });
    });
});
