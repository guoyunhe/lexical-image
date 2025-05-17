import { createCommand, LexicalCommand } from 'lexical';
import ImageInfo from './private/ImageInfo';

const INSERT_IMAGE_COMMAND: LexicalCommand<ImageInfo> = createCommand('INSERT_IMAGE_COMMAND');

export default INSERT_IMAGE_COMMAND;
