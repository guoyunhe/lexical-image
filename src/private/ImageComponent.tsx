import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import c from 'classnames';
import { NodeKey } from 'lexical';
import './ImageComponent.css';

export interface ImageComponentProps
  extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  nodeKey: NodeKey;
}

export default function ImageComponent({
  nodeKey,
  className,
  width,
  height,
  ...props
}: ImageComponentProps) {
  const [isSelected, setSelected] = useLexicalNodeSelection(nodeKey);

  return (
    <img
      className={c(
        'lexical-image-component',
        isSelected && 'lexical-image-component-selected',
        className,
      )}
      onClick={(e) => {
        e.stopPropagation();
        setSelected(true);
      }}
      width={width || undefined}
      height={height || undefined}
      {...props}
    />
  );
}
