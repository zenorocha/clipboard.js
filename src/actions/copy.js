import select from 'select';
import command from '../common/command';
import createFakeElement from '../common/create-fake-element';

/**
 * Create fake copy action wrapper using a fake element.
 * @param {String} target
 * @param {Object} options
 * @return {String}
 */
const fakeCopyAction = (value, options) => {
  const fakeElement = createFakeElement(value);
  options.container.appendChild(fakeElement);
  const selectedText = select(fakeElement);
  command('copy');
  fakeElement.remove();

  return selectedText;
};

/**
 * Copy action wrapper.
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
    selectedText = fakeCopyAction(target, options);
  } else if (
    target instanceof HTMLInputElement &&
    !['text', 'search', 'url', 'tel', 'password'].includes(target?.type)
  ) {
    // If input type doesn't support `setSelectionRange`. Simulate it. https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
    selectedText = fakeCopyAction(target.value, options);
  } else {
    selectedText = select(target);
    command('copy');
  }
  return selectedText;
};

export default ClipboardActionCopy;
