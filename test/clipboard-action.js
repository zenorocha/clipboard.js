import ClipboardAction from '../src/clipboard-action';

describe('ClipboardAction', () => {
    before(() => {
        global.target = document.createElement('input');
        target.setAttribute('id', 'foo');
        document.body.appendChild(global.target);

        global.trigger = document.createElement('button');
        trigger.setAttribute('class', 'btn');
        document.body.appendChild(global.trigger);
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
                    action: 'paste'
                });
            }
            catch(e) {
                done();
            }
        });

        it('should throw an error since "data-target" do not match any element', (done) => {
            try {
                new ClipboardAction({
                    target: 'zzz',
                    trigger: global.trigger
                });
            }
            catch(e) {
                done();
            }
        });
    });

    after(() => {
        document.body.innerHTML = '';
    });
});
