import './styles.css';
// Precisa ser uma classe ou uma função que retorne um metodo render

export const PostCard = ({title, cover, body, id}) => (
  <div className='post'>
      <img src={cover} alt={title} />
      <div className='post-content'>
        <h2>{title} {id}</h2>
        <p>{body}</p>
      </div>
  </div>
)