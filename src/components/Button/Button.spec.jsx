import { render, screen } from '@testing-library/react';
import { Button } from '.';

describe('Button />', () => {
    it('should render the button with the text "load more"', () => {
        render(<Button text='load more' />);

        expect.assertions(1);   // espera que aja uma asserção

        const button =screen.getByRole('button', {name: /load more/i }); //screen.getByRole capturando o botao /load more/i é uma expressao regular que serve para caso eu digitar com letras minusculas, conseguir detectar
        
        expect(button).toBeInTheDocument(); // Espero que esse botao esteja no documento ou seja, houve uma asserção

    })
});