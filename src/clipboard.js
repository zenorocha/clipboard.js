import ClipboardAction from './clipboard-action';
import Delegate from 'delegate-events';
import Emitter from 'tiny-emitter';

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

        if (!document.querySelectorAll(selector).length) {
            throw new Error('No matches were found for the provided selector');
        }

        Delegate.bind(document.body, selector, 'click', (e) => this.initialize(e));
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
            emitter : this
        });
    }
}

export default Clipboard;

global.Clipboard = Clipboard;
