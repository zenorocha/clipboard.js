import ClipboardAction from './clipboard-action';
import Delegate from 'delegate-events';
import Emitter from 'tiny-emitter';

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
        this.action = (typeof options.action === 'function') ? options.action : this.defaultAction;
        this.target = (typeof options.target === 'function') ? options.target : this.defaultTarget;
        this.text   = (typeof options.text   === 'function') ? options.text   : this.defaultText;
    }

    /**
     * Delegates a click event on the passed selector.
     * @param {String} selector
     */
    delegateClick(selector) {
        this.binding = Delegate.bind(document.body, selector, 'click', (e) => this.onClick(e));
    }

    /**
     * Undelegates a click event on body.
     * @param {String} selector
     */
    undelegateClick() {
        Delegate.unbind(document.body, 'click', this.binding);
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
     * Default `action` lookup function.
     * @param {Element} trigger
     */
    defaultAction(trigger) {
        return getAttributeValue('action', trigger);
    }

    /**
     * Default `target` lookup function.
     * @param {Element} trigger
     */
    defaultTarget(trigger) {
        let selector = getAttributeValue('target', trigger);

        if (selector) {
            return document.querySelector(selector);
        }
    }

    /**
     * Default `text` lookup function.
     * @param {Element} trigger
     */
    defaultText(trigger) {
        return getAttributeValue('text', trigger);
    }

    /**
     * Destroy lifecycle.
     */
    destroy() {
        this.undelegateClick();

        if (this.clipboardAction) {
            this.clipboardAction.destroy();
            this.clipboardAction = null;
        }
    }
}


/**
 * Helper function to retrieve attribute value.
 * @param {String} suffix
 * @param {Element} element
 */
function getAttributeValue(suffix, element) {
    let attribute = `data-clipboard-${suffix}`;

    if (!element.hasAttribute(attribute)) {
        return;
    }

    return element.getAttribute(attribute);
}

export default Clipboard;
