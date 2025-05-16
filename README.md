# lexical-image

Minimum image insert functionality for [Lexical](https://lexical.dev/), based on [Lexical Playground](https://playground.lexical.dev/).

## Install

```bash
npm i -S lexical-image
```

## React Usage

```jsx
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { ImagePlugin } from 'lexical-image';

<LexicalComposer
  initialConfig={{
    namespace: 'MyEditor',
    onError: console.error,
  }}
>
  <RichTextPlugin contentEditable={<ContentEditable />} ErrorBoundary={LexicalErrorBoundary} />
  <HistoryPlugin />
  <AutoFocusPlugin />
  <ImagePlugin />
</LexicalComposer>;
```
