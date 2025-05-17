import { DOMConversionOutput } from 'lexical';
import $createImageNode from './$createImageNode';

export default function $convertImageElement(domNode: Node): null | DOMConversionOutput {
  const img = domNode as HTMLImageElement;
  if (img.src.startsWith('file:///')) {
    return null;
  }
  const { alt, src, width, height } = img;
  const node = $createImageNode({ alt, height, src, width });
  return { node };
}
