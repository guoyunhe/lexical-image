import { LexicalNode } from 'lexical';
import ImageNode from './ImageNode';

export default function $isImageNode(node: LexicalNode | null | undefined): boolean {
  return node instanceof ImageNode;
}
