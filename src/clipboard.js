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
     * @param {String} selector
     * @param {Object} options
     */
    constructor(selector, options) {
        super();

        // Defines if attributes would be resolved using internal setter functions
        // or custom functions that were passed in
        this.action = (typeof options.action === 'function') ? options.action : this.getAction;
        this.target = (typeof options.target === 'function') ? options.target : this.getTarget;
        this.text   = (typeof options.text   === 'function') ? options.text   : this.getText;
        Delegate.bind(document.body, selector, 'click', (e) => this.onClick(e));
    }


    /**
     * Defines a new `ClipboardAction` on each click event.
     * @param {Event} e
     */
    onClick(e) {
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
    getAction(trigger) {
        if (!trigger.hasAttribute(prefix + 'action')) {
            return;
        }

        return trigger.getAttribute(prefix + 'action');
    }

    /**
     * Sets the `target` lookup function.
     * @param {Element} trigger
     */
    getTarget(trigger) {
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
    getText(trigger) {
        if (!trigger.hasAttribute(prefix + 'text')) {
            return;
        }

        return trigger.getAttribute(prefix + 'text');
    }
}

export default Clipboard;
