import ClipboardActionCut from './clipboard-action-cut';
import ClipboardActionCopy from './clipboard-action-copy';

/**
 * Inner class which performs selection from either `text` or `target`
 * properties and then executes copy or cut operations.
 */
class ClipboardActionDefault {
  /**
   * @param {Object} options
   */
  constructor(options) {
    this.resolveOptions(options);
    this.initSelection();
  }

  /**
   * Defines base properties passed from constructor.
   * @param {Object} options
   */
  resolveOptions(options = {}) {
    this.action = options.action;
    this.container = options.container;
    this.emitter = options.emitter;
    this.target = options.target;
    this.text = options.text;
    this.trigger = options.trigger;

    this.selectedText = '';
  }

  /**
   * Decides which selection strategy is going to be applied based
   * on the existence of `text` and `target` properties.
   */
  initSelection() {
    if (this.text) {
      this.selectedText = ClipboardActionCopy(this.text, {
        container: this.container,
      });
    } else if (this.target) {
      if (this.action === 'cut') {
        this.selectedText = ClipboardActionCut(this.target);
      } else if (this.action === 'copy') {
        this.selectedText = ClipboardActionCopy(this.target, {
          container: this.container,
        });
      }
    }

    this.handleResult(Boolean(this.selectedText));
  }

  /**
   * Fires an event based on the copy operation result.
   * @param {Boolean} succeeded
   */
  handleResult(succeeded) {
    this.emitter.emit(succeeded ? 'success' : 'error', {
      action: this.action,
      text: this.selectedText,
      trigger: this.trigger,
      clearSelection: this.clearSelection.bind(this),
    });
  }

  /**
   * Moves focus away from `target` and back to the trigger, removes current selection.
   */
  clearSelection() {
    if (this.trigger) {
      this.trigger.focus();
    }
    document.activeElement.blur();
    window.getSelection().removeAllRanges();
  }

  /**
   * Sets the `action` to be performed which can be either 'copy' or 'cut'.
   * @param {String} action
   */
  set action(action = 'copy') {
    this._action = action;

    if (this._action !== 'copy' && this._action !== 'cut') {
      throw new Error('Invalid "action" value, use either "copy" or "cut"');
    }
  }

  /**
   * Gets the `action` property.
   * @return {String}
   */
  get action() {
    return this._action;
  }

  /**
   * Sets the `target` property using an element
   * that will be have its content copied.
   * @param {Element} target
   */
  set target(target) {
    if (target !== undefined) {
      if (target && typeof target === 'object' && target.nodeType === 1) {
        if (this.action === 'copy' && target.hasAttribute('disabled')) {
          throw new Error(
            'Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute'
          );
        }

        if (
          this.action === 'cut' &&
          (target.hasAttribute('readonly') || target.hasAttribute('disabled'))
        ) {
          throw new Error(
            'Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes'
          );
        }

        this._target = target;
      } else {
        throw new Error('Invalid "target" value, use a valid Element');
      }
    }
  }

  /**
   * Gets the `target` property.
   * @return {String|HTMLElement}
   */
  get target() {
    return this._target;
  }
}

export default ClipboardActionDefault;
