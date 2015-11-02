import ClipboardAction from './clipboard-action';
import Emitter from 'tiny-emitter';
import listen from 'good-listener';

/**
 * Base class which takes one or more elements, adds event listeners to them,
 * and instantiates a new `ClipboardAction` on each click.
 */
class Clipboard extends Emitter {
    /**
     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
     * @param {Object} options
     */
    constructor(trigger, options) {
        super();
        this.defaultTriggerEvent = 'click';
        this.resolveOptions(options);
        this.listenEvent(trigger);
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
        this.triggerEvent  = (typeof options.triggerEvent  === 'string')   ? options.triggerEvent  : this.defaultTriggerEvent;
    }

    /**
     * Adds a event listener to the passed trigger.
     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
     */
    listenEvent(trigger) {
        this.listener = listen(trigger, this.triggerEvent, (e) => this.handleEvent(e));
    }

    /**
     * Defines a new `ClipboardAction` on each trigger event.
     * @param {Event} e
     */
    handleEvent(e) {
        if (this.clipboardAction) {
            this.clipboardAction = null;
        }

        this.clipboardAction = new ClipboardAction({
            action  : this.action(e.target),
            target  : this.target(e.target),
            text    : this.text(e.target),
            trigger : e.target,
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
        this.listener.destroy();

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
