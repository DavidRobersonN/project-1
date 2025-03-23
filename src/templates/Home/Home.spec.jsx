import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { describe, it, beforeAll, afterAll, afterEach, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { Home } from '.';

const handlers = [
  http.get('https://jsonplaceholder.typicode.com/posts', async () => {
    return HttpResponse.json(
      [
        {
          userId: 1,
          id: 1,
          title: 'Title 1',
          body: 'Body 1',
        },
        {
          userId: 2,
          id: 2,
          title: 'Title 2',
          body: 'Body 2',
        },
        {
          userId: 3,
          id: 3,
          title: 'Title 3',
          body: 'Body 3',
        },
      ],
      { status: 200 },
    );
  }),

  http.get('https://jsonplaceholder.typicode.com/photos', async () => {
    return HttpResponse.json([{ url: 'test/test1.png' }, { url: 'test/test2.png' }, { url: 'test/test3.png' }], {
      status: 200,
    });
  }),
];

const server = setupServer(...handlers);

describe('Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  it('Should render search, posts and button', async () => {
    render(<Home />);

    expect.assertions(3);

    const noMorePosts = screen.getByText('Não existem posts');
    await waitForElementToBeRemoved(noMorePosts, { timeout: 10000 });

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();

    screen.debug();
  });
});
