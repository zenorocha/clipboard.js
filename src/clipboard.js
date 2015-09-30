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

        this.resolveOptions(options);

        Delegate.bind(document.body, selector, 'click', (e) => this.initialize(e));
    }

    /**
     * Defines if attributes would be resolved using an internal setter function
     * or a custom function that was passed in the constructor.
     * @param {Object} options
     */
    resolveOptions(options = {}) {
        this.action = (typeof options.action === 'function') ? options.action : this.setAction;
        this.target = (typeof options.target === 'function') ? options.target : this.setTarget;
        this.text   = (typeof options.text   === 'function') ? options.text   : this.setText;
    }

    /**
     * Sets the `action` lookup function.
     * @param {Element} trigger
     */
    setAction(trigger) {
        if (!trigger.hasAttribute(prefix + 'action')) {
            return;
        }

        return trigger.getAttribute(prefix + 'action');
    }

    /**
     * Sets the `target` lookup function.
     * @param {Element} trigger
     */
    setTarget(trigger) {
        if (!trigger.hasAttribute(prefix + 'target')) {
            return;
        }

        let target = trigger.getAttribute(prefix + 'target');
        return document.querySelector(target);
    }

    /**
     * Sets the `text` lookup function.
     * @param {Element} trigger
     */
    setText(trigger) {
        if (!trigger.hasAttribute(prefix + 'text')) {
            return;
        }

        return trigger.getAttribute(prefix + 'text');
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
}

export default Clipboard;
