import ClipboardAction from './clipboard-action';
import Delegate from 'delegate-events';
import Emitter from 'tiny-emitter';

const prefix = 'data-clipboard-';

/**
 * Helper function to retrieve attribute value.
 * @param {String} suffix
 * @param {Element} element
 */
var getAttributeValue = (suffix, element) => {
    let attribute = prefix + suffix;

    if (!element.hasAttribute(attribute)) {
        return;
    }

    return element.getAttribute(attribute);
};

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
        this.delegateClick(selector);
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
    delegateClick(selector) {
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
            action  : this.action(e.delegateTarget),
            target  : this.target(e.delegateTarget),
            text    : this.text(e.delegateTarget),
            trigger : e.delegateTarget,
            emitter : this
        });
    }

    /**
     * Default `action` lookup function.
     * @param {Element} trigger
     */
    setAction(trigger) {
        return getAttributeValue('action', trigger);
    }

    /**
     * Default `target` lookup function.
     * @param {Element} trigger
     */
    setTarget(trigger) {
        let selector = getAttributeValue('target', trigger);

        if ('string' === typeof selector) {
            return document.querySelector(selector);
        }
    }

    /**
     * Defualt `text` lookup function.
     * @param {Element} trigger
     */
    setText(trigger) {
        return getAttributeValue('text', trigger);
    }
}

export default Clipboard;
