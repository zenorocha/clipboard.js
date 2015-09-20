var CustomEvent = require('custom-event');

class Clipboard {
    constructor(triggers) {
        this.triggers = document.querySelectorAll(triggers);

        if (!this.triggers.length) {
            throw new Error('No matches were found for the provided selector');
        }

        [].forEach.call(this.triggers, (trigger) => this.bind(trigger));
    }

    bind(trigger) {
        trigger.addEventListener('click', (e) => this.validate(e));
    }

    validate(e) {
        let trigger = e.currentTarget;
        let action  = trigger.getAttribute('data-action') || 'copy';
        let target  = trigger.getAttribute('data-target');
        let text    = trigger.getAttribute('data-text');

        if (action !== 'copy' && action !== 'cut') {
            throw new Error('Invalid "data-action" value, use either "copy" or "cut"');
        }

        if (!target && !text) {
            throw new Error('Missing required attributes, use either "data-target" or "data-text"');
        }

        if (target) {
            target = document.getElementById(target);
            if (!target) throw new Error('Invalid "data-target" selector, use a value that matches an ID');
        }

        new ClipboardAction(action, target, text, trigger);
    }
}

class ClipboardAction {
    constructor(action, target, text, trigger) {
        this.action  = action;
        this.target  = target;
        this.text    = text;
        this.trigger = trigger;

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

        fake.style.opacity = 0;
        fake.style.zIndex = -1;
        fake.value = this.text;
        this.selectedText = this.text;

        document.body.appendChild(fake);

        fake.select();
        this.copy();

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

            range.selectNode(this.target);
            selection.addRange(range);
            this.selectedText = selection.toString();
        }

        this.copy();
    }

    copy() {
        let supported = document.queryCommandSupported(this.action);

        try {
            document.execCommand(this.action);

            this.fireEventDetails();
            window.getSelection().removeAllRanges();
        }
        catch (err) {
            supported = false;
        }

        if (!supported) this.fireNoSupport();
    }

    fireEventDetails() {
        let event = new CustomEvent(this.action, {
            detail: this.selectedText
        });

        this.trigger.dispatchEvent(event);
    }

    fireNoSupport() {
        let event = new CustomEvent('no-support');
        this.trigger.dispatchEvent(event);
    }
}

global.Clipboard = Clipboard;
