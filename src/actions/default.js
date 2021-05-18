import ClipboardActionCut from './cut';
import ClipboardActionCopy from './copy';

/**
 * Inner function which performs selection from either `text` or `target`
 * properties and then executes copy or cut operations.
 * @param {Object} options
 */
const ClipboardActionDefault = (options = {}) => {
  // Defines base properties passed from constructor.
  const { action = 'copy', container, target, text } = options;

  // Sets the `action` to be performed which can be either 'copy' or 'cut'.
  if (action !== 'copy' && action !== 'cut') {
    throw new Error('Invalid "action" value, use either "copy" or "cut"');
  }

  // Sets the `target` property using an element that will be have its content copied.
  if (target !== undefined) {
    if (target && typeof target === 'object' && target.nodeType === 1) {
      if (action === 'copy' && target.hasAttribute('disabled')) {
        throw new Error(
          'Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute'
        );
      }

      if (
        action === 'cut' &&
        (target.hasAttribute('readonly') || target.hasAttribute('disabled'))
      ) {
        throw new Error(
          'Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes'
        );
      }
    } else {
      throw new Error('Invalid "target" value, use a valid Element');
    }
  }

  // Define selection strategy based on `text` property.
  if (text) {
    return ClipboardActionCopy(text, { container });
  }

  // Defines which selection strategy based on `target` property.
  if (target) {
    return action === 'cut'
      ? ClipboardActionCut(target)
      : ClipboardActionCopy(target, { container });
  }
};

export default ClipboardActionDefault;
