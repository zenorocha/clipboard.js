import Emitter from 'tiny-emitter';
import listen from 'good-listener';
import ClipboardActionDefault from './actions/default';
import ClipboardActionCut from './actions/cut';
import ClipboardActionCopy from './actions/copy';

/**
 * Helper function to retrieve attribute value.
 * @param {String} suffix
 * @param {Element} element
 */
function getAttributeValue(suffix, element) {
  const attribute = `data-clipboard-${suffix}`;

  if (!element.hasAttribute(attribute)) {
    return;
  }

  return element.getAttribute(attribute);
}

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

    this.resolveOptions(options);
    this.listenClick(trigger);
  }

  /**
   * Defines if attributes would be resolved using internal setter functions
   * or custom functions that were passed in the constructor.
   * @param {Object} options
   */
  resolveOptions(options = {}) {
    this.action =
      typeof options.action === 'function'
        ? options.action
        : this.defaultAction;
    this.target =
      typeof options.target === 'function'
        ? options.target
        : this.defaultTarget;
    this.text =
      typeof options.text === 'function' ? options.text : this.defaultText;
    this.container =
      typeof options.container === 'object' ? options.container : document.body;
  }

  /**
   * Adds a click event listener to the passed trigger.
   * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
   */
  listenClick(trigger) {
    this.listener = listen(trigger, 'click', (e) => this.onClick(e));
  }

  /**
   * Defines a new `ClipboardAction` on each click event.
   * @param {Event} e
   */
  onClick(e) {
    const trigger = e.delegateTarget || e.currentTarget;
    const action = this.action(trigger) || 'copy';
    const text = ClipboardActionDefault({
      action,
      container: this.container,
      target: this.target(trigger),
      text: this.text(trigger),
    });

    // Fires an event based on the copy operation result.
    this.emit(text ? 'success' : 'error', {
      action,
      text,
      trigger,
      clearSelection() {
        if (trigger) {
          trigger.focus();
        }
        document.activeElement.blur();
        window.getSelection().removeAllRanges();
      },
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
    const selector = getAttributeValue('target', trigger);

    if (selector) {
      return document.querySelector(selector);
    }
  }

  /**
   * Allow fire programmatically a copy action
   * @param {String|HTMLElement} target
   * @param {Object} options
   * @returns Text copied.
   */
  static copy(target, options = { container: document.body }) {
    return ClipboardActionCopy(target, options);
  }

  /**
   * Allow fire programmatically a cut action
   * @param {String|HTMLElement} target
   * @returns Text cutted.
   */
  static cut(target) {
    return ClipboardActionCut(target);
  }

  /**
   * Returns the support of the given action, or all actions if no action is
   * given.
   * @param {String} [action]
   */
  static isSupported(action = ['copy', 'cut']) {
    const actions = typeof action === 'string' ? [action] : action;
    let support = !!document.queryCommandSupported;

    actions.forEach((action) => {
      support = support && !!document.queryCommandSupported(action);
    });

    return support;
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
  }
}

export default Clipboard;
