import ClipboardActionDefault from '../../src/actions/default';

describe('ClipboardActionDefault', () => {
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

  describe('#resolveOptions', () => {
    it('should set base properties', () => {
      const selectedText = ClipboardActionDefault({
        container: document.body,
        text: 'foo',
      });

      assert.equal(selectedText, 'foo');
    });
  });

  describe('#set action', () => {
    it('should throw an error since "action" is invalid', (done) => {
      try {
        let clip = ClipboardActionDefault({
          text: 'foo',
          action: 'paste',
        });
      } catch (e) {
        assert.equal(
          e.message,
          'Invalid "action" value, use either "copy" or "cut"'
        );
        done();
      }
    });
  });

  describe('#set target', () => {
    it('should throw an error since "target" do not match any element', (done) => {
      try {
        let clip = ClipboardActionDefault({
          target: document.querySelector('#foo'),
        });
      } catch (e) {
        assert.equal(e.message, 'Invalid "target" value, use a valid Element');
        done();
      }
    });
  });

  describe('#selectedText', () => {
    it('should select text from editable element', () => {
      const selectedText = ClipboardActionDefault({
        container: document.body,
        target: document.querySelector('#input'),
      });

      assert.equal(selectedText, 'abc');
    });

    it('should select text from non-editable element', () => {
      const selectedText = ClipboardActionDefault({
        container: document.body,
        target: document.querySelector('#paragraph'),
      });

      assert.equal(selectedText, 'abc');
    });
  });
});
