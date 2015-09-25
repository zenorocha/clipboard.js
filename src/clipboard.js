var ClipboardAction = require('./clipboard-action');
var Delegate = require('dom-delegate').Delegate;

/**
 * Base class which takes a selector, delegates a click event to it,
 * and instantiates a new `ClipboardAction` on each click.
 */
class Clipboard {
    /**
     * Delegates a click event to the passed selector.
     * @param {String} selector
     */
    constructor(selector) {
        this.selector = selector;

        let delegate = new Delegate(document.body);
        delegate.on('click', this.selector, (e) => this.initialize(e));
    }

    /**
     * Defines a new `ClipboardAction` on each click event.
     * @param {Event} e
     */
    initialize(e) {
        new ClipboardAction({
            action  : e.target.getAttribute('data-action'),
            target  : e.target.getAttribute('data-target'),
            text    : e.target.getAttribute('data-text'),
            trigger : e.target
        });
    }
}

export default Clipboard;

global.Clipboard = Clipboard;
