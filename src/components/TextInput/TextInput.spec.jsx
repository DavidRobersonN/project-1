import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { TextInput } from '.';

describe('<TextInput />', () => {
  it('should have a value of searchValue', () => {
    const fn = vi.fn();
    render(<TextInput handleChange={fn} searchValue={'testando'} />);

    const input = screen.getByPlaceholderText(/type your search/i);
    expect(input.value).toBe('testando');
  });

  it('should call handleChange function on each key pressed', () => {
    const fn = vi.fn(); // criando uma função aleatoria
    render(<TextInput handleChange={fn} searchValue={'o valor'} />); // passando uma função aleatoria, apenas para test

    const input = screen.getByPlaceholderText(/type your search/i); // Capturndo o que que esta dentro screen.getByPlaceholderText
    const value = 'o valor';

    userEvent.type(input, value); // utilizando uma função da testlibrary para criar o evento de digitar no input, simulando o usuario  (input é o onde vai digitar.. e value é o que vai ser digitado)

    expect(input.value).toBe(value); // comparando se o que esta dentro do input.value que é o que o getByPlaceHolderText capturou é igual ao nosso value
  });
});
