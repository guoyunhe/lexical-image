import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import c from 'classnames';
import { NodeKey } from 'lexical';
import './ImageComponent.css';

export interface ImageComponentProps
  extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  nodeKey: NodeKey;
}

export default function ImageComponent({ nodeKey, className, ...props }: ImageComponentProps) {
  const [isSelected, setSelected] = useLexicalNodeSelection(nodeKey);
  return (
    <img
      className={c(
        'lexical-image-component',
        isSelected && 'lexical-image-component-selected',
        className,
      )}
      onClick={() => {
        setSelected(true);
      }}
      {...props}
    />
  );
}
