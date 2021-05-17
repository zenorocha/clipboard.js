import select from 'select';
import command from '../common/command';

/**
 * Cut action wrapper.
 * @param {String|HTMLElement} target
 * @return {String}
 */
const ClipboardActionCut = (target) => {
  const selectedText = select(target);
  command('cut');
  return selectedText;
};

export default ClipboardActionCut;
