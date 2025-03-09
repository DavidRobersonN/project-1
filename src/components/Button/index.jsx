import './styles.css';

import { Component } from "react";

export class Button extends Component {
    render() {
        const { text, onClick, disabled } = this.props; // Dentro da Prop ja esta o meu text e onClick, em js utilizando esse tipo de declaração, passando o mesmo nome, eles o recebem automaticamente

        return (
            <button 
            className='button' 
            onClick={onClick}
            disabled={disabled}
            >
                {text}
            </button>
        );
    }
}