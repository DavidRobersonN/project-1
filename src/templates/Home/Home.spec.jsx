import { render, screen, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  it('Should render search, posts and button', async () => {
    render(<Home />);

    expect.assertions(3); // Esperamos 3 asserções neste teste

    // Passando um tempo para sumir do DOM "Não existem posts"
    const noMorePosts = screen.getByText('Não existem posts');
    await waitForElementToBeRemoved(noMorePosts, { timeout: 10000 });

    const search = screen.getByPlaceholderText(/type your search/i); // Capturando PlaceHolder da Tela
    expect(search).toBeInTheDocument(); //verificando se o conteúdo esta no documento

    const images = screen.getAllByRole('img'); // capturando as imagens da tela
    expect(images).toHaveLength(2); // Esperando a haver a quantidade de 2 unidades

    const button = screen.getByRole('button', { name: /load more posts/i }); // Capturando o botão da tela, com o nome especifico
    expect(button).toBeInTheDocument(); // Verificando se esta no documento
  });
  it('Should render search, posts and button', async () => {
    render(<Home />);

    // expect.assertions(3); // Esperamos 3 asserções neste teste

    // Passando um tempo para sumir do DOM "Não existem posts"
    const noMorePosts = screen.getByText('Não existem posts');
    await waitForElementToBeRemoved(noMorePosts, { timeout: 10000 });

    const search = screen.getByPlaceholderText(/Type your search/i); // Capturando o input PlaceHolder da Tela
    // Esperamos que tenha Tile 1 1 no heading
    expect(screen.getByRole('heading', { name: 'Title 1 1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Title 3 3' })).not.toBeInTheDocument(); // Ao utilizar .not.toBe... Precisa usar queryByRole, pois getByRole lança um erro se o elemento não for encontrado, o que faz o teste falhar antes mesmo de chegar à asserção

    // Utilizando userEvent para simular que ao digitar nossa busca teremos os seguintes resultados
    const user = userEvent.setup();
    await user.type(search, 'Title2');
    await waitFor(() => {
      // Precisei usar await, pois estava tendo problemas com resultados assíncronos
      expect(screen.queryByRole('heading', { name: /Title 1/i })).not.toBeInTheDocument(); // Ao utilizar .not.toBe... Precisa usar queryByRole, pois getByRole lança um erro se o elemento não for encontrado, o que faz o teste falhar antes mesmo de chegar à asserção
    });
  });
});
