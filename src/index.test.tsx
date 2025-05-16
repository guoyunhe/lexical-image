import { render, screen } from '@testing-library/react';
import { LexicalImage } from '.';

describe('LexicalImage', () => {
  it('render', async () => {
    render(<LexicalImage>foobar</LexicalImage>);
    await screen.findByText('foobar');
  });
});
