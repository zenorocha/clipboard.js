import Clipboard from './src/clipboard';
import ClipboardAction from './src/clipboard-action';
import DelegateEvents from 'delegate-events';
import TinyEmitter from 'tiny-emitter';

// expose bundled libraries
Clipboard.ClipboardAction = ClipboardAction;
Clipboard.DelegateEvents = DelegateEvents;
Clipboard.TinyEmitter = TinyEmitter;

export default Clipboard;
