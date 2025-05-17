import { $applyNodeReplacement } from 'lexical';
import ImageNode from './ImageNode';
import ImageInfo from './private/ImageInfo';

export default function $createImageNode({ alt, height, src, width }: ImageInfo): ImageNode {
  return $applyNodeReplacement(new ImageNode(src, width, height, alt));
}
