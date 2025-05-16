import { $applyNodeReplacement } from 'lexical';
import ImageInfo from './ImageInfo';
import ImageNode from './ImageNode';

export function $createImageNode({ alt, height, src, width }: ImageInfo): ImageNode {
  return $applyNodeReplacement(new ImageNode(src, width, height, alt));
}
