const ClipboardAction = require('./clipboard-action');
const delegate = require('delegate-events');
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

        delegate.bind(document.body, selector, 'click', (e) => this.initialize(e));
    }

    /**
     * Defines a new `ClipboardAction` on each click event.
     * @param {Event} e
     */
    initialize(e) {
        if (this.clipboardAction) {
            this.clipboardAction = null;
        }

        this.clipboardAction = new ClipboardAction({
            action  : e.delegateTarget.getAttribute('data-action'),
            target  : e.delegateTarget.getAttribute('data-target'),
            text    : e.delegateTarget.getAttribute('data-text'),
            trigger : e.delegateTarget,
            host    : this
        });
    }
}

export default Clipboard;

global.Clipboard = Clipboard;
