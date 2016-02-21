import select from 'select';

/**
 * Inner class which performs selection from either `text` or `target`
 * properties and then executes copy or cut operations.
 */
export default class ClipboardAction {
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
        if (this.text && this.target) {
            throw new Error('Multiple attributes declared, use either "target" or "text"');
        }
        else if (this.text) {
            this.selectFake();
        }
        else if (this.target) {
            this.selectTarget();
        }
        else {
            throw new Error('Missing required attributes, use either "target" or "text"');
        }
    }

    /**
     * Creates a fake textarea element, sets its value from `text` property,
     * and makes a selection on it.
     */
    selectFake() {
        let isRTL = document.documentElement.getAttribute('dir') == 'rtl';

        this.removeFake();

        this.fakeHandler = document.body.addEventListener('click', () => this.removeFake());

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
        this.fakeElem.style.top = (window.pageYOffset || document.documentElement.scrollTop) + 'px';
        this.fakeElem.setAttribute('readonly', '');
        this.fakeElem.value = this.text;

        document.body.appendChild(this.fakeElem);

        this.selectedText = select(this.fakeElem);
        this.copyText();
    }

    /**
     * Only removes the fake element after another click event, that way
     * a user can hit `Ctrl+C` to copy because selection still exists.
     */
    removeFake() {
        if (this.fakeHandler) {
            document.body.removeEventListener('click');
            this.fakeHandler = null;
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
        if (succeeded) {
            this.emitter.emit('success', {
                action: this.action,
                text: this.selectedText,
                trigger: this.trigger,
                clearSelection: this.clearSelection.bind(this)
            });
        }
        else {
            this.emitter.emit('error', {
                action: this.action,
                trigger: this.trigger,
                clearSelection: this.clearSelection.bind(this)
            });
        }
    }

    /**
     * Removes current selection and focus from `target` element.
     */
    clearSelection() {
        if (this.target) {
            this.target.blur();
        }

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
