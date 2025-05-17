import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { DRAG_DROP_PASTE } from '@lexical/rich-text';
import { $wrapNodeInElement, isMimeType, mergeRegister } from '@lexical/utils';
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_LOW,
  createCommand,
  LexicalCommand,
} from 'lexical';
import { useEffect, useRef } from 'react';
import { $createImageNode } from './$createImageNode';
import ImageNode from './ImageNode';
import ImageInfo from './private/ImageInfo';

export const INSERT_IMAGE_COMMAND: LexicalCommand<ImageInfo> =
  createCommand('INSERT_IMAGE_COMMAND');
export const UPLOAD_IMAGE_COMMAND: LexicalCommand<{}> = createCommand('UPLOAD_IMAGE_COMMAND');

const ACCEPTABLE_IMAGE_TYPES = ['image/', 'image/heic', 'image/heif', 'image/gif', 'image/webp'];

export interface ImagePluginProps {
  upload: (file: File) => Promise<ImageInfo>;
}

export default function ImagePlugin({ upload }: ImagePluginProps) {
  const [editor] = useLexicalComposerContext();

  const uploadRef = useRef(upload);
  uploadRef.current = upload;

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error('ImagePlugin: ImageNode was not registered');
    }

    return mergeRegister(
      // Handle file drop and paste
      editor.registerCommand(
        DRAG_DROP_PASTE,
        (files) => {
          (async () => {
            for (const file of files) {
              if (isMimeType(file, ACCEPTABLE_IMAGE_TYPES)) {
                const { src, width, height, alt } = await uploadRef.current(file);
                editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                  src,
                  width,
                  height,
                  alt,
                });
              }
            }
          })();
          return true;
        },
        COMMAND_PRIORITY_LOW,
      ),

      editor.registerCommand<ImageInfo>(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const imageNode = $createImageNode(payload);
          $insertNodes([imageNode]);
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
          }

          return true;
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    );
  }, [editor, upload]);

  return null;
}
