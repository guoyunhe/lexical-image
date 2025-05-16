import { LexicalNode } from 'lexical';
import ImageNode from './ImageNode';

export function $isImageNode(node: LexicalNode | null | undefined): boolean {
  return node instanceof ImageNode;
}
