import {
  DecoratorNode,
  DOMConversionMap,
  DOMExportOutput,
  EditorConfig,
  LexicalUpdateJSON,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from 'lexical';
import { JSX } from 'react';
import $convertImageElement from './$convertImageElement';
import $createImageNode from './$createImageNode';
import ImageComponent from './private/ImageComponent';
import ImageInfo from './private/ImageInfo';

export type SerializedImageNode = Spread<ImageInfo, SerializedLexicalNode>;

export default class ImageNode extends DecoratorNode<JSX.Element> {
  static getType(): string {
    return 'image';
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__width, node.__height, node.__alt, node.__key);
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { alt, height, width, src } = serializedNode;
    return $createImageNode({
      src,
      width,
      height,
      alt,
    }).updateFromJSON(serializedNode);
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: () => ({
        conversion: $convertImageElement,
        priority: 0,
      }),
    };
  }

  constructor(
    public __src: string,
    public __width?: number,
    public __height?: number,
    public __alt?: string,
    __key?: NodeKey,
  ) {
    super(__key);
  }

  updateFromJSON(serializedNode: LexicalUpdateJSON<SerializedImageNode>): this {
    const node = super.updateFromJSON(serializedNode);
    return node;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('img');
    element.src = this.__src;
    if (this.__width) {
      element.width = this.__width;
    }
    if (this.__height) {
      element.height = this.__height;
    }
    if (this.__alt) {
      element.alt = this.__alt;
    }
    return { element };
  }

  exportJSON(): SerializedImageNode {
    return {
      ...super.exportJSON(),
      alt: this.__alt,
      height: this.__height,
      src: this.__src,
      width: this.__width,
    };
  }

  setWidthAndHeight(width?: number, height?: number): void {
    const writable = this.getWritable();
    writable.__width = width;
    writable.__height = height;
  }

  // View

  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement('span');
    const { theme } = config;
    const className = theme.image;
    if (className !== undefined) {
      span.className = className;
    }
    return span;
  }

  updateDOM(): false {
    return false;
  }

  decorate(): JSX.Element {
    return (
      <ImageComponent
        src={this.__src}
        alt={this.__alt}
        width={this.__width}
        height={this.__height}
        nodeKey={this.__key}
      />
    );
  }
}
