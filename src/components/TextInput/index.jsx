import P from 'prop-types';
import './styles.css';
import React from 'react';

export const TextInput = ({ searchValue, handleChange }) => {
  // Nosso TextInput precisa receber um valor de busca (searchValue), e uma função no caso handChange
  return (
    <input
      className="text-input" // Com esse class name, podemos alterar o css que vai ser carregado na pagina
      onChange={handleChange}
      value={searchValue}
      type="search"
      placeholder="Type your search"
    />
  );
};

TextInput.propTypes = {
  searchValue: P.string.isRequired,
  handleChange: P.func.isRequired,
};
