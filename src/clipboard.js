var CustomEvent = require('custom-event');

class Clipboard {

    constructor(triggers) {
        this.triggers = document.querySelectorAll(triggers);
        this.init();
    }

    init() {
        if (this.triggers.length === 0) {
            throw new Error('The provided selector is empty');
        }

        [].forEach.call(this.triggers, (trigger) => this.bind(trigger));
    }

    bind(trigger) {
        trigger.addEventListener('click', function(e) {
            let action = e.currentTarget.getAttribute('data-action');
            let target = e.currentTarget.getAttribute('data-target');
            let text   = e.currentTarget.getAttribute('data-text');

            if (!action === 'copy' || !action === 'cut') {
                throw new Error('Invalid "data-action" attribute');
            }
            else if (!target && !text) {
                throw new Error('Missing "data-target" or "data-text" attribute');
            }

            new ClipboardAction({
                action  : action,
                target  : target,
                text    : text,
                trigger : e.currentTarget
            });
        });
    }
}

class ClipboardAction {
    constructor(options) {
        this.action  = options.action || 'copy';
        this.target  = document.getElementById(options.target);
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
