var CustomEvent = require('custom-event');

class Clipboard {

    // Constructor

    constructor(triggers) {
        this._triggers = triggers;
        this.init();
    }

    // Getters & Setters

    get triggers() {
        return document.querySelectorAll(this._triggers);
    }

    set triggers(val) {
        return this._triggers = val;
    }

    // Methods

    init() {
        if (this.triggers.length > 0) {
            [].forEach.call(this.triggers, (trigger) => this.bind(trigger));
        }
        else {
            throw new Error('The provided selector is empty');
        }
    }

    bind(trigger) {
        trigger.addEventListener('click', (e) => this.select(e));
    }

    select(e) {
        let actionAttr = e.currentTarget.getAttribute('data-action') || 'copy';
        let targetAttr = e.currentTarget.getAttribute('data-target');
        let textAttr   = e.currentTarget.getAttribute('data-text');

        if (textAttr) {
            this.selectValue(actionAttr, textAttr, e.currentTarget);
        }
        else if (targetAttr) {
            this.selectTarget(actionAttr, targetAttr, e.currentTarget);
        }
        else {
            throw new Error('Missing "data-target" or "data-text" attribute');
        }

        e.preventDefault();
    }

    selectValue(actionAttr, textAttr, currentTrigger) {
        let fake = document.createElement('input');

        fake.value = textAttr;
        fake.style.opacity = 0;
        fake.style.zIndex = -1;

        document.body.appendChild(fake);

        fake.select();
        this.copy(actionAttr, textAttr, currentTrigger);

        document.body.removeChild(fake);
    }

    selectTarget(actionAttr, targetAttr, currentTrigger) {
        let selectedText = '';
        let target = document.getElementById(targetAttr);

        if (target.nodeName === 'INPUT' || target.nodeName === 'TEXTAREA') {
            target.select();
            selectedText = target.value;
        }
        else {
            let range = document.createRange();
            let selection = window.getSelection();

            range.selectNode(target);
            selection.addRange(range);
            selectedText = selection.toString();
        }

        this.copy(actionAttr, selectedText, currentTrigger);
    }

    copy(actionAttr, selectedText, currentTrigger) {
        let supported = document.queryCommandSupported(actionAttr);

        try {
            let successful = document.execCommand(actionAttr);

            if (!successful) throw new Error('Invalid "data-action" attribute');

            this.dispatchEvent(actionAttr, selectedText, currentTrigger);
            window.getSelection().removeAllRanges();
        }
        catch (err) {
            supported = false;
        }

        if (!supported) this.notSupported(currentTrigger);
    }

    dispatchEvent(actionAttr, selectedText, currentTrigger) {
        let event = new CustomEvent(actionAttr, {
            detail: selectedText
        });

        currentTrigger.dispatchEvent(event);
    }

    notSupported(currentTrigger) {
        let event = new CustomEvent('no-support');
        currentTrigger.dispatchEvent(event);
    }
}

global.Clipboard = Clipboard;
