import select from 'select';

/**
 * Inner class which performs selection from either `text` or `target`
 * properties and then executes copy or cut operations.
 */
class ClipboardAction {
    /**
     * @param {Object} options
     */
    constructor(options) {
        this.resolveOptions(options);
        this.initSelection();
    }

    /**
     * Defines base properties passed from constructor.
     * @param {Object} options
     */
    resolveOptions(options = {}) {
        this.action  = options.action;
        this.emitter = options.emitter;
        this.target  = options.target;
        this.text    = options.text;
        this.trigger = options.trigger;

        this.selectedText = '';
    }

    /**
     * Decides which selection strategy is going to be applied based
     * on the existence of `text` and `target` properties.
     */
    initSelection() {
        if (this.text) {
            this.selectFake();
        }
        else if (this.target) {
            this.selectTarget();
        }
    }

    /**
     * Creates a fake textarea element, sets its value from `text` property,
     * and makes a selection on it.
     */
    selectFake() {
        const isRTL = document.documentElement.getAttribute('dir') == 'rtl';

        this.removeFake();

        // Register a clipboard event callback to inject the clipboard data.
        // This is used instead of adding the data directly into the textarea,
        // as for large inputs it is considerably faster to avoid the long
        // synchronous reflows triggered by selecting the textarea, and instead
        // directly add the data to the clipboard's DataTransfer.
        this.fakeClipboardCallback = event => {
          // In Internet Explorer, we need to use the clipboardData global
          // object instead of event.clipboardData.
          if (event.clipboardData) {
            event.clipboardData.setData('text/plain', this.text);
          }
          else {
            clipboardData.setData('Text', this.text);
          }
          event.preventDefault();
        };
        // Register both cut and copy callbacks to catch all attempts to copy
        // the data with clipboard.
        document.body.addEventListener('cut', this.fakeClipboardCallback);
        document.body.addEventListener('copy', this.fakeClipboardCallback);

        this.fakeHandlerCallback = () => this.removeFake();
        this.fakeHandler = document.body.addEventListener('click', this.fakeHandlerCallback) || true;

        // Safari and Internet Explorer require that there is a valid selection
        // to copy before firing the copy event, so set up a dummy textarea
        // offscreen, and select it.

        this.fakeElem = document.createElement('textarea');
        // Prevent zooming on iOS
        this.fakeElem.style.fontSize = '12pt';
        // Reset box model
        this.fakeElem.style.border = '0';
        this.fakeElem.style.padding = '0';
        this.fakeElem.style.margin = '0';
        // Move element out of screen horizontally
        this.fakeElem.style.position = 'absolute';
        this.fakeElem.style[ isRTL ? 'right' : 'left' ] = '-9999px';
        // Move element to the same position vertically
        let yPosition = window.pageYOffset || document.documentElement.scrollTop;
        this.fakeElem.style.top = `${yPosition}px`;

        this.fakeElem.setAttribute('readonly', '');

        // The dummy text area must have a short, non-empty value to create a
        // valid copy selection.
        this.fakeElem.value = 'a';

        document.body.appendChild(this.fakeElem);
        select(this.fakeElem);

        // The letter 'a' is the actual selection, but any attempts to copy this
        // text will copy the intended text, so we can enhance the truth a bit.
        this.selectedText = this.text;

        // Trigger the 'copy' or 'cut' event, which will add our data to the
        // clipboard.
        this.copyText();
    }

    /**
     * Only removes the fake element after another click event, that way
     * a user can hit `Ctrl+C` to copy because selection still exists.
     */
    removeFake() {
        if (this.fakeHandler) {
            document.body.removeEventListener('click', this.fakeHandlerCallback);
            document.body.removeEventListener('cut', this.fakeClipboardCallback);
            document.body.removeEventListener('copy', this.fakeClipboardCallback);
            this.fakeHandler = null;
            this.fakeHandlerCallback = null;
            this.fakeClipboardCallback = null;
        }

        if (this.fakeElem) {
            document.body.removeChild(this.fakeElem);
            this.fakeElem = null;
        }
    }

    /**
     * Selects the content from element passed on `target` property.
     */
    selectTarget() {
        this.selectedText = select(this.target);
        this.copyText();
    }

    /**
     * Executes the copy operation based on the current selection.
     */
    copyText() {
        let succeeded;

        try {
            succeeded = document.execCommand(this.action);
        }
        catch (err) {
            succeeded = false;
        }

        this.handleResult(succeeded);
    }

    /**
     * Fires an event based on the copy operation result.
     * @param {Boolean} succeeded
     */
    handleResult(succeeded) {
        this.emitter.emit(succeeded ? 'success' : 'error', {
            action: this.action,
            text: this.selectedText,
            trigger: this.trigger,
            clearSelection: this.clearSelection.bind(this)
        });
    }

    /**
     * Removes current selection and focus from `target` element.
     * Also clears the 'copy' or 'cut' listeners which were added, if any.
     */
    clearSelection() {
        if (this.target) {
            this.target.blur();
        }

        this.removeFake();

        window.getSelection().removeAllRanges();
    }

    /**
     * Sets the `action` to be performed which can be either 'copy' or 'cut'.
     * @param {String} action
     */
    set action(action = 'copy') {
        this._action = action;

        if (this._action !== 'copy' && this._action !== 'cut') {
            throw new Error('Invalid "action" value, use either "copy" or "cut"');
        }
    }

    /**
     * Gets the `action` property.
     * @return {String}
     */
    get action() {
        return this._action;
    }

    /**
     * Sets the `target` property using an element
     * that will be have its content copied.
     * @param {Element} target
     */
    set target(target) {
        if (target !== undefined) {
            if (target && typeof target === 'object' && target.nodeType === 1) {
                if (this.action === 'copy' && target.hasAttribute('disabled')) {
                    throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                }

                if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
                    throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                }

                this._target = target;
            }
            else {
                throw new Error('Invalid "target" value, use a valid Element');
            }
        }
    }

    /**
     * Gets the `target` property.
     * @return {String|HTMLElement}
     */
    get target() {
        return this._target;
    }

    /**
     * Destroy lifecycle.
     */
    destroy() {
        this.removeFake();
    }
}

module.exports = ClipboardAction;
