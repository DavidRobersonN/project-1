import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '.';
import userEvent from '@testing-library/user-event';

describe('Button />', () => {
    it('should render the button with the text "load more"', () => {
        render(<Button text='load more' />);

        expect.assertions(1);   // espera que aja uma asserção

        const button =screen.getByRole('button', {name: /load more/i }); //screen.getByRole capturando o botao /load more/i é uma expressao regular que serve para caso eu digitar com letras minusculas, conseguir detectar
        
        expect(button).toBeInTheDocument(); // Espero que esse botao esteja no documento ou seja, houve uma asserção

    });

    it('should call function on button click', () => { // Deve chamar a  função quando clicar no Botao
        const fn = jest.fn(); // o jest.jn cria uma função aleatoria para utilizar no nosso test
        render(<Button text='load more' onClick={fn} />); // Passando nossa função que foi criada para teste

        const button = screen.getByRole('button', {name: /load more/i }); // Capiturando o botao
        
        userEvent.click(button); // disparando o Botao com userEvent
        fireEvent.click(button); // Disparando o Botao

        expect(fn).toHaveBeenCalledTimes(2);  // passando quantas vezes esperamos que o botao seja chamado
    });

    it('should be desabled when disabled is truue"', () => {
        render(<Button text='load more' disabled={true} />); // Passando disabled como True

        const button =screen.getByRole('button', {name: /load more/i }); //screen.getByRole capturando o botao /load more/i é uma expressao regular que serve para caso eu digitar com letras minusculas, conseguir detectar
        
        expect(button).toBeDisabled(); // Esperamos que o botao esteja desativado
    });
});