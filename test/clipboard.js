import Clipboard from '../src/clipboard';

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
      currentTarget: global.button,
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
      let clipboard = new Clipboard('.btn', {
        action: global.fn,
      });

      assert.equal(global.fn, clipboard.action);
    });

    it('should set target as a function', () => {
      let clipboard = new Clipboard('.btn', {
        target: global.fn,
      });

      assert.equal(global.fn, clipboard.target);
    });

    it('should set text as a function', () => {
      let clipboard = new Clipboard('.btn', {
        text: global.fn,
      });

      assert.equal(global.fn, clipboard.text);
    });

    it('should set container as an object', () => {
      let clipboard = new Clipboard('.btn', {
        container: document.body,
      });

      assert.equal(document.body, clipboard.container);
    });

    it('should set container as body by default', () => {
      let clipboard = new Clipboard('.btn');

      assert.equal(document.body, clipboard.container);
    });
  });

  describe('#listenClick', () => {
    it('should add a click event listener to the passed selector', () => {
      let clipboard = new Clipboard('.btn');
      assert.isObject(clipboard.listener);
    });
  });

  describe('#onClick', () => {
    it('should init when called', (done) => {
      let clipboard = new Clipboard('.btn');

      clipboard.on('success', () => {
        done();
      });

      clipboard.onClick(global.event);
    });

    it("should use an event's currentTarget when not equal to target", (done) => {
      let clipboard = new Clipboard('.btn');
      let bubbledEvent = {
        target: global.span,
        currentTarget: global.button,
      };

      clipboard.on('success', () => {
        done();
      });

      clipboard.onClick(bubbledEvent);
    });

    it('should throw an exception when target is invalid', (done) => {
      try {
        const clipboard = new Clipboard('.btn', {
          target() {
            return null;
          },
        });

        clipboard.onClick(global.event);
      } catch (e) {
        assert.equal(e.message, 'Invalid "target" value, use a valid Element');
        done();
      }
    });
  });

  describe('#static isSupported', () => {
    it('should return the support of the given action', () => {
      assert.equal(Clipboard.isSupported('copy'), true);
      assert.equal(Clipboard.isSupported('cut'), true);
    });

    it('should return the support of the cut and copy actions', () => {
      assert.equal(Clipboard.isSupported(), true);
    });
  });

  describe('#static copy', () => {
    it('should copy in an programatic way based on text', () => {
      assert.equal(Clipboard.copy('lorem'), 'lorem');
    });

    it('should copy in an programatic way based on target', () => {
      assert.equal(Clipboard.copy(document.querySelector('span')), 'bar');
    });
  });

  describe('#static cut', () => {
    it('should cut in an programatic way based on text', () => {
      assert.equal(Clipboard.cut(document.querySelector('span')), 'bar');
    });
  });

  describe('#destroy', () => {
    it('should destroy an existing instance of ClipboardActionDefault', () => {
      let clipboard = new Clipboard('.btn');

      clipboard.onClick(global.event);
      clipboard.destroy();

      assert.equal(clipboard.clipboardAction, null);
    });
  });

  describe('#events', () => {
    it('should fire a success event with certain properties', (done) => {
      let clipboard = new Clipboard('.btn');

      clipboard.on('success', (e) => {
        assert.property(e, 'action');
        assert.equal(e.action, 'copy');
        assert.property(e, 'text');
        assert.property(e, 'trigger');
        assert.property(e, 'clearSelection');

        done();
      });

      clipboard.onClick(global.event);
    });
  });

  describe('#clearSelection', () => {
    it('should remove focus from target and text selection', (done) => {
      let clipboard = new Clipboard('.btn');

      clipboard.on('success', (e) => {
        let selectedElem = document.activeElement;
        let selectedText = window.getSelection().toString();

        e.clearSelection();

        assert.equal(selectedElem, document.body);
        assert.equal(selectedText, '');

        done();
      });

      clipboard.onClick(global.event);
    });
  });
});
