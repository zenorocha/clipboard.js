const ClipboardAction = require('./clipboard-action');
const Delegate = require('dom-delegate').Delegate;
const Emitter = require('tiny-emitter');

/**
 * Base class which takes a selector, delegates a click event to it,
 * and instantiates a new `ClipboardAction` on each click.
 */
class Clipboard extends Emitter {
    /**
     * Delegates a click event on the passed selector.
     * @param {String} selector
     */
    constructor(selector) {
        super();

        let delegate = new Delegate(document.body);
        delegate.on('click', selector, (e) => this.initialize(e));
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
            trigger : e.target,
            host    : this
        });
    }
}

export default Clipboard;

global.Clipboard = Clipboard;
