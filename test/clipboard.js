import ClipboardJS from '../src/clipboard';
import ClipboardJSAction from '../src/clipboard-action';
import listen from 'good-listener';

describe('ClipboardJS', () => {
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
            global.fn = () => {};
        });

        it('should set action as a function', () => {
            let clipboard = new ClipboardJS('.btn', {
                action: global.fn
            });

            assert.equal(global.fn, clipboard.action);
        });

        it('should set target as a function', () => {
            let clipboard = new ClipboardJS('.btn', {
                target: global.fn
            });

            assert.equal(global.fn, clipboard.target);
        });

        it('should set text as a function', () => {
            let clipboard = new ClipboardJS('.btn', {
                text: global.fn
            });

            assert.equal(global.fn, clipboard.text);
        });

        it('should set container as an object', () => {
            let clipboard = new ClipboardJS('.btn', {
                container: document.body
            });

            assert.equal(document.body, clipboard.container);
        });

        it('should set container as body by default', () => {
            let clipboard = new ClipboardJS('.btn');

            assert.equal(document.body, clipboard.container);
        });
    });

    describe('#listenClick', () => {
        it('should add a click event listener to the passed selector', () => {
            let clipboard = new ClipboardJS('.btn');
            assert.isObject(clipboard.listener);
        });
    });

    describe('#onClick', () => {
        it('should create a new instance of ClipboardJSAction', () => {
            let clipboard = new ClipboardJS('.btn');

            clipboard.onClick(global.event);
            assert.instanceOf(clipboard.clipboardAction, ClipboardJSAction);
        });

        it('should use an event\'s currentTarget when not equal to target', () => {
            let clipboard = new ClipboardJS('.btn');
            let bubbledEvent = { target: global.span, currentTarget: global.button };

            clipboard.onClick(bubbledEvent);
            assert.instanceOf(clipboard.clipboardAction, ClipboardJSAction);
        });

        it('should throw an exception when target is invalid', done => {
            try {
                const clipboard = new ClipboardJS('.btn', {
                    target() {
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

    describe('#static isSupported', () => {
        it('should return the support of the given action', () => {
            assert.equal(ClipboardJS.isSupported('copy'), false);
            assert.equal(ClipboardJS.isSupported('cut'), false);
        });

        it('should return the support of the cut and copy actions', () => {
            assert.equal(ClipboardJS.isSupported(), false);
        });
    });

    describe('#destroy', () => {
        it('should destroy an existing instance of ClipboardJSAction', () => {
            let clipboard = new ClipboardJS('.btn');

            clipboard.onClick(global.event);
            clipboard.destroy();

            assert.equal(clipboard.clipboardAction, null);
        });
    });
});
