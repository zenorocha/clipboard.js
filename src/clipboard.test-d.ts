import { expectType } from 'tsd';
import Clipboard from './clipboard';

expectType<Clipboard>(new Clipboard('.btn'));
