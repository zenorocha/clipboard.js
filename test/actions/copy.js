import ClipboardActionCopy from '../../src/actions/copy';

describe('ClipboardActionCopy', () => {
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

  describe('#selectText', () => {
    it('should select its value based on input target', () => {
      const selectedText = ClipboardActionCopy(
        document.querySelector('#input'),
        {
          container: document.body,
        }
      );

      assert.equal(selectedText, document.querySelector('#input').value);
    });

    it('should select its value based on element target', () => {
      const selectedText = ClipboardActionCopy(
        document.querySelector('#paragraph'),
        {
          container: document.body,
        }
      );

      assert.equal(
        selectedText,
        document.querySelector('#paragraph').textContent
      );
    });

    it('should select its value based on text', () => {
      const text = 'abc';
      const selectedText = ClipboardActionCopy(text, {
        container: document.body,
      });

      assert.equal(selectedText, text);
    });
  });
});
