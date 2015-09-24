var ClipboardAction = require('./clipboard-action');

export default class Clipboard {
    constructor(triggers) {
        this.triggers = document.querySelectorAll(triggers);

        [].forEach.call(this.triggers, (trigger) => this.bind(trigger));
    }

    bind(trigger) {
        trigger.addEventListener('click', (e) => this.initialize(e));
    }

    initialize(e) {
        new ClipboardAction({
            action  : e.currentTarget.getAttribute('data-action'),
            target  : e.currentTarget.getAttribute('data-target'),
            text    : e.currentTarget.getAttribute('data-text'),
            trigger : e.currentTarget
        });
    }

    set triggers(triggers) {
        if (!triggers.length) {
            throw new Error('No matches were found for the provided selector');
        }

        this._triggers = triggers;
    }

    get triggers() {
        return this._triggers;
    }
}

global.Clipboard = Clipboard;
