import ClipboardActionCut from '../../src/actions/cut';

describe('ClipboardActionCut', () => {
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
    it('should select its value', () => {
      const selectedText = ClipboardActionCut(
        document.querySelector('#input'),
        {
          container: document.body,
        }
      );

      assert.equal(selectedText, document.querySelector('#input').value);
    });
  });
});
