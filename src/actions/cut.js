import select from 'select';
import command from '../common/command';

/**
 * Cut action wrapper. Writes the selected text to the clipboard using the async
 * Clipboard API when available (emulating "cut" by clearing the editable
 * source), falling back to `document.execCommand('cut')` otherwise.
 * @param {String|HTMLElement} target
 * @return {String}
 */
const ClipboardActionCut = (target) => {
  const selectedText = select(target);

  // Prefer the async Clipboard API, falling back to `execCommand`.
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(selectedText)
      .then(() => {
        // The Clipboard API has no "cut", so remove the copied text from the
        // editable source to emulate it.
        if ('value' in target) {
          // eslint-disable-next-line no-param-reassign
          target.value = '';
        }
      })
      .catch(() => command('cut'));
  } else {
    command('cut');
  }

  return selectedText;
};

export default ClipboardActionCut;
