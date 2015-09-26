import ClipboardAction from '../src/clipboard-action';

describe('ClipboardAction', () => {
    before(() => {
        global.target = document.createElement('input');
        global.target.setAttribute('id', 'target');
        document.body.appendChild(global.target);

        global.trigger = document.createElement('button');
        global.trigger.setAttribute('class', 'btn');
        document.body.appendChild(global.trigger);
    });

    after(() => {
        document.body.innerHTML = '';
    });

    describe('#constructor', () => {
        it('should throw an error since both "data-text" and "data-target" were passed', (done) => {
            try {
                new ClipboardAction({
                    text: 'foo',
                    target: 'target'
                });
            }
            catch(e) {
                assert.equal(e.message, 'Multiple attributes declared, use either "data-target" or "data-text"');
                done();
            }
        });

        it('should throw an error since neither "data-text" nor "data-target" were passed', (done) => {
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

        it('should throw an error since "data-action" is invalid', (done) => {
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

        it('should throw an error since "data-target" do not match any element', (done) => {
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
});
