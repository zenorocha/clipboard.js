import ClipboardAction from './clipboard-action';
import Delegate from 'delegate-events';
import Emitter from 'tiny-emitter';

const prefix = 'data-clipboard-';

/**
 * Base class which takes a selector, delegates a click event to it,
 * and instantiates a new `ClipboardAction` on each click.
 */
class Clipboard extends Emitter {

    /**
     * Delegates a click event on the passed selector.
     * @param {String} selector
     * @param {Object} options
     */
    constructor(selector, options) {
        super();

        if (!document.querySelectorAll(selector).length) {
            throw new Error('No matches were found for the provided selector');
        }

        this.resolveOptions(options);

        Delegate.bind(document.body, selector, 'click', (e) => this.initialize(e));
    }

    /**
     * Resolves contructor options.
     * @param {Object} options
     */
    resolveOptions(options) {
        options = options || {};
        this.action = (typeof options.action === 'function') ? options.action : this.setAction;
        this.target = (typeof options.target === 'function') ? options.target : this.setTarget;
        this.text = (typeof options.text === 'function') ? options.text : this.setText;
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
            action  : this.action(e.delegateTarget),
            target  : this.target(e.delegateTarget),
            text    : this.text(e.delegateTarget),
            trigger : e.delegateTarget,
            emitter : this
        });
    }

    /**
     * Sets the `action` lookup function.
     * @param {Element} trigger
     */
    setAction(trigger) {
        return trigger.getAttribute(prefix + 'action');
    }

    /**
     * Sets the `target` lookup function.
     * @param {Element} trigger
     */
    setTarget(trigger) {
        let target = trigger.getAttribute(prefix + 'target');
        if (target) {
            return document.querySelector(target);
        }
    }

    /**
     * Sets the `text` lookup function.
     * @param {Element} trigger
     */
    setText(trigger) {
        return trigger.getAttribute(prefix + 'text');
    }
}

export default Clipboard;

global.Clipboard = Clipboard;
