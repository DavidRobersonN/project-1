// Precisa ser uma classe ou uma função que retorne um metodo render

export const PostCard = ({title, cover, body}) => {
    return (
        <div className='post'>
            <img src={cover} alt={title} />
            <div className='post-content'>
              <h1>{title}</h1>
              <p>{body}</p>
            </div>
          </div>
    );
}