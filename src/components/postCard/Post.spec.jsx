import { render, screen } from '@testing-library/react';
import { postCardPropsMock } from './mock';
import { PostCard } from '.';
const props = postCardPropsMock;
import React from 'react';

describe('<POstCard />', () => {
  it('should render PostCard correctly', () => {
    render(<PostCard {...props} />);

    expect(screen.getByRole('img', { name: /title 1/i })).toHaveAttribute(
      'src',
      'img/img.png',
    );
    expect(
      screen.getByRole('heading', { name: /title 1/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('body 1')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<PostCard {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
