import select from 'select';
import command from '../common/command';
import createFakeElement from '../common/create-fake-element';

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
    const fakeElement = createFakeElement(target);
    options.container.appendChild(fakeElement);
    selectedText = select(fakeElement);
    command('copy');
    fakeElement.remove();
  } else {
    selectedText = select(target);
    command('copy');
  }
  return selectedText;
};

export default ClipboardActionCopy;
