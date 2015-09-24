var CustomEvent = require('custom-event');

export default class ClipboardAction {
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

    clearSelection() {
        if (this.target) {
            this.target.blur();
        }

        window.getSelection().removeAllRanges();
    }

    fireEvent(type, detail) {
        let event = new CustomEvent(type, {
            detail: detail
        });

        this.trigger.dispatchEvent(event);
    }

    set action(action) {
        this._action = action || 'copy';

        if (this._action !== 'copy' && this._action !== 'cut') {
            throw new Error('Invalid "data-action" value, use either "copy" or "cut"');
        }
    }

    get action() {
        return this._action;
    }

    set target(target) {
        if (target) {
            this._target = document.getElementById(target);

            if (!this._target) {
                throw new Error('Invalid "data-target" selector, use a value that matches an ID');
            }
        }
    }

    get target() {
        return this._target;
    }
}
