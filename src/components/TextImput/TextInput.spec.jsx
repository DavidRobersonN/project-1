import { render, screen } from '@testing-library/react';
import React from "react";


import { TextInput } from '.';
import userEvent from '@testing-library/user-event';

describe('<TextInput />', () => {
  it('should have a value of searchValue', () => {
    const fn = jest.fn();

    render(<TextInput handleChange={fn} searchValue={'testando'} />);
    const input = screen.getByPlaceholderText(/type your search/i);

    expect(input.value).toBe("testando");
  });

  it('should call handleChange function on each key pressed', () => {
    const fn = jest.fn(); // criando uma função aleatoria
    render(<TextInput handleChange={fn} searchValue={'o valor'} />); // passando uma função aleatoria, apenas para test

    const input = screen.getByPlaceholderText(/type your search/i);
    const value = 'o valor';

    userEvent.type(input, value); // utilizando uma função da testlibrary para criar o evento de digitar no input, simulando o usuario

    expect(input.value).toBe(value); // verificando se o valor do input é o mesmo que digitamos

    expect(fn).toHaveBeenCalledTimes(value.length); // verificando se a quantidade de teclas que digitamos, foi a mesma quantidade de vezes que a função foi chamada
  });
});
