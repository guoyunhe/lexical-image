# lexical-image

Minimum image insert functionality for [Lexical](https://lexical.dev/), based on [Lexical Playground](https://playground.lexical.dev/).

## Install

```bash
npm i -S lexical @lexical/react @lexical/html lexical-image
```

## Usage

```jsx
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { EditorRefPlugin } from '@lexical/react/LexicalEditorRefPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { $generateHtmlFromNodes } from '@lexical/html';
import { ImageNode, ImagePlugin } from 'lexical-image';

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

function App() {
  const editorRef = React.useRef(null);

  return (
    <LexicalComposer
      initialConfig={{
        namespace: 'MyEditor',
        onError: console.error,
        nodes: [ImageNode],
      }}
    >
      <div style={{ position: 'relative' }}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              style={{ background: '#eee', padding: 10 }}
              placeholder={
                <div
                  style={{
                    pointerEvents: 'none',
                    position: 'absolute',
                    top: 26,
                    left: 10,
                    color: '#999',
                  }}
                >
                  Drop or paste image here...
                </div>
              }
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <EditorRefPlugin editorRef={editorRef} />
        <OnChangePlugin
          onChange={() => {
            editorRef.current.read(() => {
              const html = $generateHtmlFromNodes(editorRef.current);
              console.log(html);
            });
          }}
        />
        <ImagePlugin
          upload={async (file) => {
            // Do NOT use base64 in any real projects!
            const src = await toBase64(file);

            return {
              src,
              width: 100,
              height: 100,
              alt: 'My Image',
            };
          }}
        />
      </div>
    </LexicalComposer>
  );
}

render(<App />);
```
