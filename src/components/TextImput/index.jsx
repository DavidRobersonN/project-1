import './styles.css'

export const TextInput = ({handleChange, searchValue}) => {
    return (
        <input
            className='text-input'   // Com esse class name, podemos alterar o css que vai ser carregado na pagina
            onChange={handleChange} 
            value={searchValue}
            type='search'
            placeholder='Type your search'
            />
    );        
}