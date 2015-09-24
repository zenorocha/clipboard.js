var ClipboardAction = require('./clipboard-action');

/**
 * Base class which takes a selector, binds a click event for
 * each element found, and instantiates a new `ClipboardAction`.
 */
class Clipboard {
    /**
     * Fetches all elements from a selector and
     * calls `bind` method for each element found.
     * @param {String} triggers
     */
    constructor(triggers) {
        this.triggers = document.querySelectorAll(triggers);

        [].forEach.call(this.triggers, (trigger) => this.bind(trigger));
    }

    /**
     * Adds a click event listener for each element.
     */
    bind(trigger) {
        trigger.addEventListener('click', (e) => this.initialize(e));
    }

    /**
     * Defines a new `ClipboardAction` on each click event.
     * @param {Event} e
     */
    initialize(e) {
        new ClipboardAction({
            action  : e.currentTarget.getAttribute('data-action'),
            target  : e.currentTarget.getAttribute('data-target'),
            text    : e.currentTarget.getAttribute('data-text'),
            trigger : e.currentTarget
        });
    }

    /**
     * Sets the `triggers` property if there's at least
     * one match for the provided selector.
     * @param {NodeList} triggers
     */
    set triggers(triggers) {
        if (!triggers.length) {
            throw new Error('No matches were found for the provided selector');
        }

        this._triggers = triggers;
    }

    /**
     * Gets the `triggers` property.
     * @return {NodeList}
     */
    get triggers() {
        return this._triggers;
    }
}

export default Clipboard;

global.Clipboard = Clipboard;
