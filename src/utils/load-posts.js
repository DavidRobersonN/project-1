export const loadPosts = async () => {
    const postResponse = fetch('https://jsonplaceholder.typicode.com/posts');       // Pegando os dados externos
    const photoResponse = fetch('https://jsonplaceholder.typicode.com/photos');       // Pegando os dados externos

    const [posts, photos] = await Promise.all([postResponse, photoResponse]);        // Criando a promise dos dados que serao recebidos

    const postsJson = await posts.json();          // Convertendo para Json
    const photosJson = await photos.json();          // Convertendo para Json

    const postAndPhotos = postsJson.map((post, index) => {   // Mapeando os dados para que cada post, pegue no array das fotos, a foto com o indice correspondente ao post
      return { ...post, cover: photosJson[index].url }
    });
    return postAndPhotos;    // retornando os dados obtidos
}