import ClipboardAction from './clipboard-action';
import Delegate from 'delegate-events';
import event from 'component-event';
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

        this.resolveOptions(options);
        if (typeof selector === 'string') {
            this.delegateClickToSelector(selector);
        } else if (selector !== null && typeof selector === 'object') {
            this.delegateClickToElement(selector);
        } else {
            throw new Error('`selector` should be a CSS selector string or elements itself.');
        }
    }

    /**
     * Defines if attributes would be resolved using internal setter functions
     * or custom functions that were passed in the constructor.
     * @param {Object} options
     */
    resolveOptions(options = {}) {
        this.action = (typeof options.action === 'function') ? options.action : this.setAction;
        this.target = (typeof options.target === 'function') ? options.target : this.setTarget;
        this.text   = (typeof options.text   === 'function') ? options.text   : this.setText;
    }

    /**
     * Delegates a click event on the passed selector.
     * @param {String} selector
     */
    delegateClickToSelector(selector) {
        Delegate.bind(document.body, selector, 'click', (e) => this.initialize(e));
    }

    /**
     * Delegates a click event on the passed element.
     * @param {Object} element
     */
    delegateClickToElement(element) {
        event.bind(document.body, 'click', (e) => {
            e.delegateTarget = element;
            if (e.delegateTarget) {
                (e) => this.initialize(e);
            }
        });
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
}

export default Clipboard;
