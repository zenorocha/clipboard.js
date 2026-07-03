import select from 'select';
import command from '../common/command';
import createFakeElement from '../common/create-fake-element';

/**
 * Fallback copy using a fake element and `document.execCommand`, used when the
 * async Clipboard API is unavailable (e.g. an insecure context or an older
 * browser).
 * @param {String} value
 * @param {Object} options
 */
const fakeCopyAction = (value, options) => {
  const fakeElement = createFakeElement(value);
  options.container.appendChild(fakeElement);
  select(fakeElement);
  command('copy');
  fakeElement.remove();
};

/**
 * Copy action wrapper. Writes to the clipboard using the async Clipboard API
 * when available, falling back to `document.execCommand` otherwise.
 * @param {String|HTMLElement} target
 * @param {Object} options
 * @return {String}
 */
const ClipboardActionCopy = (
  target,
  options = { container: document.body }
) => {
  let selectedText = '';
  if (typeof target === 'string') {
    selectedText = target;
  } else if (
    target instanceof HTMLInputElement &&
    !['text', 'search', 'url', 'tel', 'password'].includes(target?.type)
  ) {
    // If input type doesn't support `setSelectionRange`. Simulate it. https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
    selectedText = target.value;
  } else {
    selectedText = select(target);
  }

  // Prefer the async Clipboard API, falling back to `execCommand`.
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(selectedText)
      .catch(() => fakeCopyAction(selectedText, options));
  } else {
    fakeCopyAction(selectedText, options);
  }

  return selectedText;
};

export default ClipboardActionCopy;
