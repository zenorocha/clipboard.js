var CustomEvent = require('custom-event');

/**
 * Inner class which performs selection and copy operations.
 */
class ClipboardAction {
    /**
     * Initializes selection from either `text` or `target` property.
     * @param {Object} options
     */
    constructor(options) {
        this.action  = options.action;
        this.target  = options.target;
        this.text    = options.text;
        this.trigger = options.trigger;

        this.selectedText = '';

        if (this.text) {
            this.selectValue();
        }
        else if (this.target) {
            this.selectTarget();
        }
    }

    /**
     * Selects the content from value passed on `text` property.
     */
    selectValue() {
        let fake = document.createElement('input');

        fake.style.position = 'absolute';
        fake.style.left = '-9999px';
        fake.value = this.text;
        this.selectedText = this.text;

        document.body.appendChild(fake);

        fake.select();
        this.copyText();

        document.body.removeChild(fake);
    }

    /**
     * Selects the content from element passed on `target` property.
     */
    selectTarget() {
        if (this.target.nodeName === 'INPUT' || this.target.nodeName === 'TEXTAREA') {
            this.target.select();
            this.selectedText = this.target.value;
        }
        else {
            let range = document.createRange();
            let selection = window.getSelection();

            range.selectNodeContents(this.target);
            selection.addRange(range);
            this.selectedText = selection.toString();
        }

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
            this.fireEvent('success', {
                action: this.action,
                text: this.selectedText,
                clearSelection: this.clearSelection.bind(this)
            });
        }
        else {
            this.fireEvent('error', {
                action: this.action,
                clearSelection: this.clearSelection.bind(this)
            });
        }
    }

    /**
     * Emits a custom event into the `trigger` element.
     * @param {String} type
     * @param {*} detail
     */
    fireEvent(type, detail) {
        let event = new CustomEvent(type, {
            detail: detail
        });

        this.trigger.dispatchEvent(event);
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
    set action(action) {
        this._action = action || 'copy';

        if (this._action !== 'copy' && this._action !== 'cut') {
            throw new Error('Invalid "data-action" value, use either "copy" or "cut"');
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
     * Sets the `target` property using the ID of an element
     * that will be have its content copied.
     * @param {String} target
     */
    set target(target) {
        if (target) {
            this._target = document.getElementById(target);

            if (!this._target) {
                throw new Error('Invalid "data-target" selector, use a value that matches an ID');
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
}

export default ClipboardAction;
