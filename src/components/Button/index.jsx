import P from 'prop-types';
import './styles.css';
import React from "react";


import { Component } from 'react';

export class Button extends Component {
  render() {
    const { text, onClick, disabled = false } = this.props; // Dentro da Prop ja esta o meu text e onClick, em js utilizando esse tipo de declaração, passando o mesmo nome, eles o recebem automaticamente

    return (
      <button className="button" onClick={onClick} disabled={disabled}>
        {text}
      </button>
    );
  }
}

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  text: P.string.isRequired,
  onClick: P.func.isRequired,
  disabled: P.bool,
}
